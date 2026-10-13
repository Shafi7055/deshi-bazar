import { cache } from "react";

const primaryApi =
  process.env.BAZARDOR_API_URL ?? "https://api.api-store.workers.dev/api/bazardor";
const fallbackApi =
  process.env.BAZARDOR_API_FALLBACK_URL ?? "https://api.abcz.workers.dev/api/bazardor";

async function fetchApi(path) {
  const failures = [];

  for (const baseUrl of [primaryApi, fallbackApi]) {
    try {
      const response = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
      if (response.ok) return await response.json();
      failures.push(`${baseUrl}${path}: HTTP ${response.status}`);
    } catch (error) {
      failures.push(
        `${baseUrl}${path}: ${error instanceof Error ? error.message : "Request failed"}`,
      );
    }
  }

  throw new Error(`Unable to load Bazar Dor data. ${failures.join("; ")}`);
}

export const getProducts = cache((category) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchApi(`/products${query}`);
});

export const getProductBySlug = cache(async (slug) => {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
});

export const getCategories = cache(() => {
  return fetchApi("/categories");
});
