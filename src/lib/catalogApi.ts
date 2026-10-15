import type { Product, ProductCategory, ProductGroup, ProductVariantOption } from '../types';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '');

export function resolveMediaUrl(path?: string | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

interface ApiVariant {
  id: string;
  strength: string;
  price: number;
  stock: string;
  sku?: string;
}

interface ApiProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  description?: string;
  purity?: number;
  image?: string | null;
  buyLink?: string;
  featured?: boolean;
  variants: ApiVariant[];
}

/** One storefront product per admin product — variants stay nested. */
export function mapApiProductsToStorefront(apiProducts: ApiProduct[]): Product[] {
  return apiProducts.map((p) => {
    const variants: ProductVariantOption[] =
      p.variants && p.variants.length > 0
        ? p.variants.map((v) => ({
            id: v.id,
            strength: v.strength,
            price: Number(v.price) || 0,
            stock: v.stock,
            sku: v.sku,
          }))
        : [
            {
              id: `${p.id}-default`,
              strength: 'Standard',
              price: 0,
              stock: 'in_stock',
              sku: p.sku,
            },
          ];

    const prices = variants.map((v) => v.price);
    const priceMin = Math.min(...prices);
    const priceMax = Math.max(...prices);

    return {
      id: p.id,
      sku: p.sku,
      name: p.name,
      spec: variants.map((v) => v.strength).join(', '),
      price: priceMin,
      priceMin,
      priceMax,
      category: p.category as ProductCategory,
      purity: p.purity != null ? `${p.purity}%` : '≥99%',
      description: p.description || '',
      inStock: variants.some((v) => v.stock !== 'out_of_stock'),
      buyLink: p.buyLink || undefined,
      image: resolveMediaUrl(p.image) || undefined,
      featured: Boolean(p.featured),
      variants,
    };
  });
}

export function groupStorefrontProducts(products: Product[]): ProductGroup[] {
  const map = new Map<string, Product[]>();
  products.forEach((p) => {
    const key = p.name;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  });
  return Array.from(map.entries()).map(([name, variants]) => ({
    name,
    category: variants[0].category,
    description: variants[0].description,
    variants,
  }));
}

/** Flatten to one row per strength (pricing table / quote picker). */
export function flattenVariantsForList(products: Product[]): Product[] {
  const rows: Product[] = [];
  for (const p of products) {
    for (const v of p.variants) {
      rows.push({
        ...p,
        id: `${p.id}__${v.id}`,
        sku: v.sku || p.sku,
        spec: v.strength,
        price: v.price,
        priceMin: v.price,
        priceMax: v.price,
        inStock: v.stock !== 'out_of_stock',
        variants: [v],
      });
    }
  }
  return rows;
}

export async function fetchPublicCatalog(): Promise<{
  products: Product[];
  categories: string[];
}> {
  const res = await fetch(`${API_BASE}/api/public/products`);
  if (!res.ok) {
    throw new Error('Failed to load catalog from API');
  }
  const data = await res.json();
  const apiProducts: ApiProduct[] = data.products || [];
  const products = mapApiProductsToStorefront(apiProducts);
  const categories =
    data.categories?.length > 0
      ? data.categories
      : [...new Set(products.map((p) => p.category))].sort();

  return { products, categories };
}
