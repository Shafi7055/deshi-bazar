"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/product-card";

export function CategoryProducts({ products }) {
  const [sortOrder, setSortOrder] = useState("default");
  function handleSortChange(value) {
    if (
      value === "default" ||
      value === "price-ascending" ||
      value === "price-descending"
    ) {
      setSortOrder(value);
    }
  }

  const sortedProducts = useMemo(() => {
    if (sortOrder === "default") return products;
    return [...products].sort((left, right) =>
      sortOrder === "price-ascending"
        ? left.today - right.today
        : right.today - left.today,
    );
  }, [products, sortOrder]);

  return (
    <>
      <div className="category-listing__tools">
        <span>{products.length}টি পণ্য পাওয়া গেছে</span>
        <label className="sort-control">
          <span>সাজান:</span>
          <span className="sort-control__select">
            <select
              aria-label="পণ্যের দাম অনুযায়ী সাজান"
              onChange={(event) => handleSortChange(event.target.value)}
              value={sortOrder}
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-ascending">দাম: কম থেকে বেশি</option>
              <option value="price-descending">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </span>
        </label>
      </div>
      <div className="product-grid">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
