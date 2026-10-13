import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "সাইন আপ" };

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="section page-container"><div className="skeleton" /></div>}>
      <AuthForm mode="signup" />
    </Suspense>
  );
}
