import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "সাইন ইন" };

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="section page-container"><div className="skeleton" /></div>}>
      <AuthForm mode="signin" />
    </Suspense>
  );
}
