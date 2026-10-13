import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, UserRound } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";

export const metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?protected=1&callbackURL=%2Fprofile");

  return (
    <section className="section page-container profile-page">
      <span className="section-kicker">আপনার অ্যাকাউন্ট</span>
      <h1>আমার প্রোফাইল</h1>
      <div className="profile-card">
        <span className="profile-card__avatar" aria-hidden="true">
          {session.user.name?.slice(0, 1) || <UserRound size={25} />}
        </span>
        <div>
          <span className="profile-card__label">নাম</span>
          <strong>{session.user.name}</strong>
        </div>
        <div>
          <span className="profile-card__label">ইমেইল</span>
          <strong>{session.user.email}</strong>
        </div>
        <Link className="button button--primary" href="/profile/update">
          তথ্য পরিবর্তন <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
