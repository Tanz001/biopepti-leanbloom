import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import type { Product, ProductGroup } from '../types';
import { fetchPublicCatalog, groupStorefrontProducts } from '../lib/catalogApi';

interface CatalogContextType {
  products: Product[];
  categories: string[];
  groupedProducts: ProductGroup[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPublicCatalog();
      setProducts(data.products);
      setCategories(data.categories);
    } catch (err: any) {
      setError(err?.message || 'Could not load products');
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const groupedProducts = useMemo(() => groupStorefrontProducts(products), [products]);

  return (
    <CatalogContext.Provider
      value={{ products, categories, groupedProducts, loading, error, refresh }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = (): CatalogContextType => {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
};
