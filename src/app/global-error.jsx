"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="bn">
      <body>
        <section className="status-page page-container">
          <span className="status-page__icon" aria-hidden="true">⚠️</span>
          <span className="section-kicker">একটু সমস্যা হয়েছে</span>
          <h1>বাজারদরের তথ্য লোড করা যায়নি</h1>
          <p>সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</p>
          <button className="button button--primary" onClick={reset} type="button">
            আবার চেষ্টা করুন
          </button>
        </section>
      </body>
    </html>
  );
}
