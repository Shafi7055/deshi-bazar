import { getCategories, getProducts } from "@/lib/products";
import { AppToaster } from "@/components/app-toaster";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: {
    default: "বাজার দর — আজকের বাজারদর",
    template: "%s | বাজার দর",
  },
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন।",
};

export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <html lang="bn">
      <body>
        <SiteHeader categories={categories} products={products} />
        <main className="site-main">{children}</main>
        <SiteFooter />
        <AppToaster />
      </body>
    </html>
  );
}
