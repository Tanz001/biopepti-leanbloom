export type ProductCategory = string;

export interface ProductVariantOption {
  id: string;
  strength: string; // e.g. "5mg/vial*10 vials"
  price: number;
  stock: 'in_stock' | 'low' | 'out_of_stock' | string;
  sku?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  /** Joined strengths for search/display summary */
  spec: string;
  /** Lowest variant price (for sorting / card default) */
  price: number;
  priceMin: number;
  priceMax: number;
  category: ProductCategory;
  purity: string;
  casNumber?: string;
  sequence?: string;
  molecularFormula?: string;
  molecularWeight?: string;
  description: string;
  appearance?: string;
  storage?: string;
  inStock: boolean;
  leadTime?: string;
  buyLink?: string;
  image?: string;
  featured?: boolean;
  variants: ProductVariantOption[];
}

export interface ProductGroup {
  name: string;
  category: ProductCategory;
  description: string;
  variants: Product[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

export interface QuoteCustomer {
  companyName: string;
  contactName: string;
  email: string;
  phoneWhatsapp: string;
  shippingCountry: string;
  shippingAddress: string;
  taxOrVatId?: string;
}

export interface SavedQuote {
  id: string;
  createdAt: string;
  customer: QuoteCustomer;
  items: CartItem[];
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  shippingFee: number;
  includeTax: boolean;
  taxRate: number;
  notes: string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
  status: 'Draft' | 'Sent' | 'Approved' | 'Archived';
}

export interface COARecord {
  id: string;
  batchNumber: string;
  productName: string;
  sku: string;
  spec: string;
  purity: string;
  testMethod: string;
  testedDate: string;
  manufactureDate: string;
  expiryDate: string;
  analyst: string;
  appearance: string;
  solubility: string;
  status: 'Verified' | 'Pending Review';
  pdfFilename: string;
  retentionTime?: string;
}

export interface OEMInquiry {
  fullName: string;
  companyName: string;
  email: string;
  phoneWhatsapp: string;
  productInterest: string;
  estimatedQuantity: string;
  packagingPreference: string;
  customFormulation: boolean;
  message: string;
}

/** Build a cart/quote line from a product + chosen strength. */
export function productWithVariant(
  product: Product,
  variant: ProductVariantOption
): Product {
  return {
    ...product,
    id: `${product.id}__${variant.id}`,
    sku: variant.sku || product.sku,
    spec: variant.strength,
    price: variant.price,
    priceMin: variant.price,
    priceMax: variant.price,
    inStock: variant.stock !== 'out_of_stock',
    variants: [variant],
  };
}

export function formatProductPrice(product: Product): string {
  if (product.priceMin === product.priceMax) {
    return `$${product.priceMin.toFixed(2)}`;
  }
  return `$${product.priceMin.toFixed(2)} – $${product.priceMax.toFixed(2)}`;
}
