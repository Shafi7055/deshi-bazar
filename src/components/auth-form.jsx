"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle, LockKeyhole, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function getSafeCallback(value) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export function AuthForm({ mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialProvider, setSocialProvider] = useState(null);
  const isSignIn = mode === "signin";
  const callbackURL = getSafeCallback(searchParams.get("callbackURL"));

  useEffect(() => {
    if (isSignIn && searchParams.get("protected") === "1") {
      toast("এই পৃষ্ঠাটি দেখতে আগে সাইন ইন করুন।", { icon: "🔐" });
    } else if (isSignIn && searchParams.get("registered") === "1") {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন।");
    }
  }, [isSignIn, searchParams]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "").trim();

    if (!email || !password || (!isSignIn && !name)) {
      toast.error("সব প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = isSignIn
        ? await authClient.signIn.email({ email, password, callbackURL })
        : await authClient.signUp.email({
            name,
            email,
            password,
            callbackURL: "/",
          });

      if (result.error) {
        toast.error(result.error.message || "অনুরোধটি সম্পন্ন করা যায়নি।");
        return;
      }

      if (isSignIn) {
        toast.success("স্বাগতম! আপনি সাইন ইন করেছেন।");
        router.replace(callbackURL);
      } else {
        const signOutResult = await authClient.signOut();
        if (signOutResult.error) {
          toast.error("অ্যাকাউন্ট তৈরি হয়েছে, তবে সাইন আউট করা যায়নি।");
          router.replace("/");
          router.refresh();
          return;
        }
        toast.success("আপনার অ্যাকাউন্ট তৈরি হয়েছে।");
        router.replace("/signin?registered=1");
      }
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "অনুরোধটি সম্পন্ন করা যায়নি।",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSocialSignIn(provider) {
    setSocialProvider(provider);
    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: isSignIn ? callbackURL : "/",
      });
      if (result.error) {
        toast.error(result.error.message || `${provider} দিয়ে সাইন ইন করা যায়নি।`);
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `${provider} দিয়ে সাইন ইন করা যায়নি।`,
      );
    } finally {
      setSocialProvider(null);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-card__brand" aria-hidden="true">🛒</div>
        <span className="section-kicker">{isSignIn ? "আবার স্বাগতম" : "আমাদের সঙ্গে যোগ দিন"}</span>
        <h1>{isSignIn ? "সাইন ইন করুন" : "নতুন অ্যাকাউন্ট তৈরি করুন"}</h1>
        <p className="auth-card__intro">
          {isSignIn
            ? "আপনার বাজারদরের বিস্তারিত দেখতে অ্যাকাউন্টে প্রবেশ করুন।"
            : "বাজার দর-এর সঙ্গে প্রতিদিনের বাজার থাকুক আরও সহজ।"}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isSignIn && (
            <label className="form-field">
              <span>আপনার নাম</span>
              <span className="form-field__control">
                <UserRound size={17} aria-hidden="true" />
                <input
                  autoComplete="name"
                  maxLength={80}
                  name="name"
                  placeholder="যেমন: নুসরাত জাহান"
                  required
                />
              </span>
            </label>
          )}
          <label className="form-field">
            <span>ইমেইল</span>
            <span className="form-field__control">
              <Mail size={17} aria-hidden="true" />
              <input
                autoComplete="email"
                name="email"
                placeholder="আপনার ইমেইল"
                required
                type="email"
              />
            </span>
          </label>
          <label className="form-field">
            <span>পাসওয়ার্ড</span>
            <span className="form-field__control">
              <LockKeyhole size={17} aria-hidden="true" />
              <input
                autoComplete={isSignIn ? "current-password" : "new-password"}
                minLength={8}
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                type="password"
              />
            </span>
          </label>
          <button
            className="button button--primary auth-submit"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting && <LoaderCircle className="spin" size={17} aria-hidden="true" />}
            {isSignIn ? "সাইন ইন" : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="auth-divider"><span>অথবা</span></div>
        <div className="social-buttons">
          <button
            className="button button--outline social-button"
            disabled={socialProvider !== null}
            onClick={() => handleSocialSignIn("google")}
            type="button"
          >
            {socialProvider === "google" ? (
              <LoaderCircle className="spin" size={16} aria-hidden="true" />
            ) : (
              <span className="google-mark" aria-hidden="true">G</span>
            )}
            Google
          </button>
          <button
            className="button button--outline social-button"
            disabled={socialProvider !== null}
            onClick={() => handleSocialSignIn("github")}
            type="button"
          >
            {socialProvider === "github" ? (
              <LoaderCircle className="spin" size={16} aria-hidden="true" />
            ) : (
              <span className="github-mark" aria-hidden="true">GH</span>
            )}
            GitHub
          </button>
        </div>
        <p className="auth-card__switch">
          {isSignIn ? "নতুন এখানে? " : "আগে থেকেই অ্যাকাউন্ট আছে? "}
          <Link href={isSignIn ? "/signup" : "/signin"}>
            {isSignIn ? "সাইন আপ করুন" : "সাইন ইন করুন"}
          </Link>
        </p>
      </div>
    </section>
  );
}
