"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function UpdateProfileForm({ currentName }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setIsSaving(true);
    try {
      const result = await authClient.updateUser({ name: trimmedName });
      if (result.error) {
        toast.error(result.error.message || "তথ্য আপডেট করা যায়নি।");
        return;
      }
      toast.success("আপনার তথ্য আপডেট হয়েছে।");
      router.replace("/profile");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "তথ্য আপডেট করা যায়নি।");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="profile-edit-card auth-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>নাম</span>
        <input
          autoComplete="name"
          maxLength={80}
          onChange={(event) => setName(event.target.value)}
          required
          value={name}
        />
      </label>
      <button className="button button--primary" disabled={isSaving} type="submit">
        {isSaving && <LoaderCircle className="spin" size={16} aria-hidden="true" />}
        তথ্য আপডেট করুন
      </button>
    </form>
  );
}
