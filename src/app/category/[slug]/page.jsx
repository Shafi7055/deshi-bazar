import { notFound } from "next/navigation";
import { CategoryProducts } from "@/components/category-products";
import { getCategories, getProducts } from "@/lib/products";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  return { title: category ? `${category.nameBn} এর দাম` : "বিভাগ" };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const products = await getProducts(slug);
  if (products.length === 0) notFound();

  return (
    <section className="section page-container category-page">
      <div className="category-page__intro">
        <span className="category-page__icon" aria-hidden="true">{category.icon}</span>
        <div>
          <span className="section-kicker">বাজারের বিভাগ</span>
          <h1>{category.nameBn}</h1>
          <p>আজকের বাজারে {category.nameBn} বিভাগের সব পণ্যের হালনাগাদ দাম।</p>
        </div>
      </div>
      <CategoryProducts products={products} />
    </section>
  );
}
