export type ProductCategory = 
  | 'Weight Management'
  | 'Recovery & Repair'
  | 'Growth Hormone & Longevity'
  | 'Cosmetic & Peptides'
  | 'Cognitive & Neuro'
  | 'Cellular Research';

export interface Product {
  id: string;
  sku: string;
  name: string;
  spec: string; // e.g. "5mg*10vials"
  price: number; // in USD
  category: ProductCategory;
  purity: string; // e.g. "99.4%"
  casNumber?: string;
  sequence?: string;
  molecularFormula?: string;
  molecularWeight?: string;
  description: string;
  appearance?: string;
  storage?: string;
  inStock: boolean;
  leadTime?: string;
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
  id: string; // e.g. "Q-0IC5LUL2"
  createdAt: string;
  customer: QuoteCustomer;
  items: CartItem[];
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  shippingFee: number;
  includeTax: boolean;
  taxRate: number; // e.g. 5%
  notes: string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
  status: 'Draft' | 'Sent' | 'Approved' | 'Archived';
}

export interface COARecord {
  id: string;
  batchNumber: string; // e.g. "LL-2025-0814"
  productName: string;
  sku: string;
  spec: string;
  purity: string; // e.g. "99.62%"
  testMethod: string; // "HPLC / Mass Spec"
  testedDate: string; // "2025-08-14"
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
