"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  formatPrice,
  getBanglaDate,
  getChangeLabel,
  getUnitLabel,
} from "@/lib/format";

export function SiteHeader({ categories, products }) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  async function handleSignOut() {
    const result = await authClient.signOut();
    if (result.error) {
      toast.error(result.error.message ?? "সাইন আউট করা যায়নি");
      return;
    }
    toast.success("আপনি সাইন আউট করেছেন");
  }

  return (
    <header className="site-header">
      <div className="site-header__main page-container">
        <Link href="/" className="brand" aria-label="বাজার দর হোম">
          <span className="brand__mark" aria-hidden="true">
            🛒
          </span>
          <span>
            <strong>বাজার দর</strong>
            <small>{getBanglaDate()}</small>
          </span>
        </Link>

        <nav className="category-nav" aria-label="পণ্যের বিভাগ">
          <Link
            href="/"
            className={`category-nav__link${pathname === "/" ? " category-nav__link--active" : ""}`}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            সব পণ্য
          </Link>
          {categories.map((category) => (
            <Link
              className={`category-nav__link${pathname === `/category/${category.slug}` ? " category-nav__link--active" : ""}`}
              href={`/category/${category.slug}`}
              key={category.slug}
              aria-current={pathname === `/category/${category.slug}` ? "page" : undefined}
            >
              <span aria-hidden="true">{category.icon}</span> {category.nameBn}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          {session?.user ? (
            <>
              <Link className="profile-link" href="/profile">
                <UserRound size={16} aria-hidden="true" />
                <span>{session.user.name || "আমার প্রোফাইল"}</span>
              </Link>
              <button
                className="button button--outline button--compact"
                onClick={handleSignOut}
                type="button"
              >
                <LogOut size={15} aria-hidden="true" />
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link className="header-signin" href="/signin">
                সাইন ইন
              </Link>
              <Link className="button button--primary button--compact" href="/signup">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="ticker" aria-label="আজকের বাজারদর">
        <div className="ticker__label">বাজারদর</div>
        <div className="ticker__viewport">
          <div className="ticker__track">
            {[...products, ...products].map((product, index) => (
              <span
                className="ticker__item"
                key={`${product.slug}-${index}`}
                aria-hidden={index >= products.length}
              >
                <span aria-hidden="true">{product.image}</span>
                <span>{product.nameBn}</span>
                <strong>{formatPrice(product.today)}</strong>
                <span>{getUnitLabel(product.unit)}</span>
                <span
                  className={`ticker__change ticker__change--${product.change.dir}`}
                >
                  {getChangeLabel(product.change.dir, product.change.pct)}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
