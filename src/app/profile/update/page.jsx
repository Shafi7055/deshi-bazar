import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UpdateProfileForm } from "@/components/update-profile-form";

export const metadata = { title: "প্রোফাইল আপডেট" };

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?protected=1&callbackURL=%2Fprofile%2Fupdate");

  return (
    <section className="section page-container profile-page">
      <span className="section-kicker">অ্যাকাউন্ট সেটিংস</span>
      <h1>তথ্য আপডেট করুন</h1>
      <UpdateProfileForm currentName={session.user.name ?? ""} />
    </section>
  );
}
