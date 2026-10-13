import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((left, right) => right.change.pct - left.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((left, right) => right.change.pct - left.change.pct)
    .slice(0, 6);

  return (
    <>
      <section className="hero page-container">
        <div className="hero__copy">
          <span className="eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            প্রতিদিনের বাজার, এখন হাতের মুঠোয়
          </span>
          <h1>
            বাজারের সঠিক দাম,
            <br />
            <span>সিদ্ধান্ত হোক সহজ।</span>
          </h1>
          <p>
            চাল, ডাল, মাছ, সবজি থেকে নিত্যপ্রয়োজনীয় সব পণ্যের আজকের দর জানুন
            এক জায়গায় — নিশ্চিন্তে করুন আপনার বাজার।
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#সব-পণ্য">
              আজকের দর দেখুন <ArrowRight size={17} aria-hidden="true" />
            </a>
            <span className="hero__note">ঢাকাসহ দেশের ৬৪ জেলার বাজারদর</span>
          </div>
          <div className="hero__trust">
            <span className="hero__avatars" aria-hidden="true">
              <i>👩🏽</i>
              <i>👨🏽</i>
              <i>👩🏻</i>
            </span>
            <span>
              <strong>বিশ্বস্ত তথ্য</strong>
              <small>প্রতিদিন আপডেট হয়</small>
            </span>
          </div>
        </div>

        <div
          className="hero-art"
          role="img"
          aria-label="তাজা বাজারের পণ্যের ছবি"
        >
          <div className="hero-art__sun" />
          <div className="hero-art__label">
            <span>আজকের বাজার</span>
            <strong>এক নজরে, নিশ্চিন্তে</strong>
          </div>
          <span
            className="hero-art__produce hero-art__produce--rice"
            aria-hidden="true"
          >
            🍚
          </span>
          <span
            className="hero-art__produce hero-art__produce--greens"
            aria-hidden="true"
          >
            🥬
          </span>
          <span
            className="hero-art__produce hero-art__produce--fish"
            aria-hidden="true"
          >
            🐟
          </span>
          <span
            className="hero-art__produce hero-art__produce--tomato"
            aria-hidden="true"
          >
            🍅
          </span>
          <div className="hero-art__price">
            <span>স্বচ্ছ বাজারদর</span>
            <strong>🌾 🥚 🧅</strong>
            <small>আপনার হাতের মুঠোয়</small>
          </div>
          <div className="hero-art__stamp">
            ভালো বাজার
            <br />
            সবার অধিকার
          </div>
        </div>
      </section>

      <section
        className="market-strip page-container"
        aria-label="বাজারের তথ্য"
      >
        <div>
          <span className="market-strip__icon">🧺</span>
          <span>
            <strong>{products.length}+</strong>
            <small>নিত্যপণ্য</small>
          </span>
        </div>
        <div>
          <span className="market-strip__icon">📍</span>
          <span>
            <strong>৬৪ জেলা</strong>
            <small>সারাদেশের বাজার</small>
          </span>
        </div>
        <div>
          <span className="market-strip__icon">🔄</span>
          <span>
            <strong>প্রতিদিন</strong>
            <small>দামের হালনাগাদ</small>
          </span>
        </div>
        <div className="market-strip__promise">
          আপনার পরিবারের সাশ্রয়ের সঙ্গী
        </div>
      </section>

      <section
        className="section page-container"
        aria-labelledby="risers-heading"
      >
        <div className="section-heading">
          <div>
            <span className="section-kicker">দামের পরিবর্তন</span>
            <h2 id="risers-heading">
              <ArrowUpRight
                className="section-heading__up"
                aria-hidden="true"
              />
              আজ দাম বেড়েছে
            </h2>
            <p>গতকালের তুলনায় যেসব পণ্যের দাম বেড়েছে</p>
          </div>
        </div>
        {risers.length > 0 ? (
          <div className="product-grid product-grid--compact">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="empty-note">আজ কোনো পণ্যের দাম বাড়েনি।</p>
        )}
      </section>

      <section className="section section--tinted">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">আপনার সাশ্রয়</span>
              <h2>
                <ArrowDownRight
                  className="section-heading__down"
                  aria-hidden="true"
                />
                আজ দাম কমেছে
              </h2>
              <p>আজকের বাজারে যেসব পণ্যের দামে স্বস্তি</p>
            </div>
          </div>
          {fallers.length > 0 ? (
            <div className="product-grid product-grid--compact">
              {fallers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="empty-note">আজ কোনো পণ্যের দাম কমেনি।</p>
          )}
        </div>
      </section>

      <section className="section page-container" id="সব-পণ্য">
        <div className="section-heading section-heading--all">
          <div>
            <span className="section-kicker">সবকিছু এক জায়গায়</span>
            <h2>সব পণ্য</h2>
            <p>আজকের হালনাগাদ দামে আপনার প্রয়োজনীয় সব পণ্য</p>
          </div>
          <span className="section-count">{products.length}টি পণ্য</span>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="all-products-note">
          <span>💡</span> দামগুলো আনুমানিক এবং বাজারভেদে ভিন্ন হতে পারে।
          <Link href="/signin">
            বাজারের বিস্তারিত দেখুন <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
