import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { formatPrice, getChangeLabel, getUnitLabel } from "@/lib/format";

export function ProductCard({ product }) {
  const direction =
    product.change.dir === "up"
      ? "up"
      : product.change.dir === "down"
        ? "down"
        : "flat";
  const ChangeIcon =
    direction === "up"
      ? ArrowUpRight
      : direction === "down"
        ? ArrowDownRight
        : Minus;

  return (
    <Link
      className="product-card group"
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn}, ${formatPrice(product.today)} — বিস্তারিত`}
    >
      <div className="product-card__top">
        <span className="product-card__emoji" aria-hidden="true">
          {product.image}
        </span>
        <span className={`change-badge change-badge--${direction}`}>
          <ChangeIcon size={14} strokeWidth={2.5} aria-hidden="true" />
          {getChangeLabel(direction, product.change.pct)}
        </span>
      </div>
      <div className="product-card__copy">
        <span className="product-card__category">{product.categoryNameBn}</span>
        <h3>{product.nameBn}</h3>
        <p>{getUnitLabel(product.unit)}</p>
      </div>
      <div className="product-card__price">
        <span>আজকের দাম</span>
        <strong>{formatPrice(product.today)}</strong>
      </div>
    </Link>
  );
}
