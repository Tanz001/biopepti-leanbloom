import type { Product, ProductCategory, ProductGroup } from '../types';

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

/** Flatten admin products + variants into storefront Product rows. */
export function mapApiProductsToStorefront(apiProducts: ApiProduct[]): Product[] {
  const items: Product[] = [];

  for (const p of apiProducts) {
    const variants =
      p.variants && p.variants.length > 0
        ? p.variants
        : [
            {
              id: `${p.id}-default`,
              strength: 'Standard',
              price: 0,
              stock: 'in_stock',
              sku: p.sku,
            },
          ];

    for (const v of variants) {
      items.push({
        id: `${p.id}__${v.id}`,
        sku: v.sku || `${p.sku}-${v.strength}`.replace(/\s+/g, ''),
        name: p.name,
        spec: v.strength,
        price: Number(v.price) || 0,
        category: p.category as ProductCategory,
        purity: p.purity != null ? `${p.purity}%` : '≥99%',
        description: p.description || '',
        inStock: v.stock !== 'out_of_stock',
        buyLink: p.buyLink || undefined,
        image: resolveMediaUrl(p.image) || undefined,
        featured: Boolean(p.featured),
        parentId: p.id,
      });
    }
  }

  return items;
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
