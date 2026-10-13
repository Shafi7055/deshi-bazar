import Link from "next/link";

export default function NotFound() {
  return (
    <section className="status-page page-container">
      <span className="status-page__icon" aria-hidden="true">🧺</span>
      <span className="section-kicker">পাতাটি খুঁজে পাওয়া যায়নি</span>
      <h1>এই ঠিকানায় কিছু নেই</h1>
      <p>লিংকটি হয়তো বদলে গেছে, অথবা পণ্যটি আর পাওয়া যাচ্ছে না।</p>
      <Link className="button button--primary" href="/">হোম পেজে ফিরে যান</Link>
    </section>
  );
}
