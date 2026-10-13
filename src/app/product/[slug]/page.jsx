import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { formatPrice, getProductSummary, getUnitLabel } from "@/lib/format";
import { getProductBySlug } from "@/lib/products";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.nameBn} এর বাজারদর` : "পণ্য" };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?protected=1&callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const summary = getProductSummary(product);

  return (
    <section className="product-detail page-container">
      <Link className="back-link" href="/#সব-পণ্য">
        <ArrowLeft size={16} aria-hidden="true" /> সব পণ্যে ফিরে যান
      </Link>

      <div className="product-detail__summary">
        <div className="product-detail__identity">
          <span className="product-detail__emoji" aria-hidden="true">{product.image}</span>
          <div>
            <div className="tag-row">
              <span className="category-tag">{product.categoryIcon} {product.categoryNameBn}</span>
              <span className="category-tag">{getUnitLabel(product.unit)}</span>
            </div>
            <h1>{product.nameBn}</h1>
            <p>
              আজকের বাজারে {product.nameBn} এর গড় দাম {formatPrice(product.today)}।
              বাজারভেদে দামের পার্থক্য দেখে নিন।
            </p>
          </div>
        </div>
        <div className="price-summary-grid">
          <div className="price-summary-card">
            <span>সর্বনিম্ন দাম</span><strong>{formatPrice(summary.minimum)}</strong>
          </div>
          <div className="price-summary-card">
            <span>সর্বোচ্চ দাম</span><strong>{formatPrice(summary.maximum)}</strong>
          </div>
          <div className="price-summary-card price-summary-card--highlight">
            <span>গড় বাজারদর</span><strong>{formatPrice(summary.average)}</strong>
          </div>
        </div>
      </div>

      <div className="market-table-section">
        <div className="market-table-heading">
          <div>
            <span className="section-kicker">বিভিন্ন বাজারের তুলনা</span>
            <h2><MapPin size={21} aria-hidden="true" /> বাজারভিত্তিক আজকের দাম</h2>
          </div>
          <span className="section-count">{product.markets.length}টি বাজার</span>
        </div>

        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th scope="col">বাজার</th>
                <th scope="col">বিভাগ</th>
                <th scope="col">সর্বনিম্ন</th>
                <th scope="col">সর্বোচ্চ</th>
                <th scope="col">গড় দাম</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((market) => (
                <tr key={`${market.market}-${market.division}`}>
                  <td>{market.market}</td>
                  <td>{market.division}</td>
                  <td>{formatPrice(market.min)}</td>
                  <td>{formatPrice(market.max)}</td>
                  <td>{formatPrice(Math.round((market.min + market.max) / 2))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="price-disclaimer">
        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হতে পারে।
      </p>
    </section>
  );
}
