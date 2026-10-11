import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  totalItems: number;
  totalUnits: number;
  subtotal: number;
  estimatedShipping: number;
  estimatedTotal: number;
  copyQuoteToClipboard: () => void;
  openWhatsAppQuote: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'biopepti_quote_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable
    }
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    showToast(
      'Added to Quote Cart',
      `${product.name} (${product.spec}) × ${quantity}`,
      'success'
    );
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.length;
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  // Tiered or base wholesale shipping estimate
  const estimatedShipping = subtotal === 0 ? 0 : subtotal > 1500 ? 0 : 35;
  const estimatedTotal = subtotal + estimatedShipping;

  const generateQuoteText = () => {
    const lines = [
      `*BIOPEPTI — WHOLESALE INQUIRY*`,
      `Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`,
      `Total Line Items: ${totalItems} | Total Packs: ${totalUnits}`,
      `---------------------------------`,
      ...items.map(
        (it, idx) =>
          `${idx + 1}. [${it.product.sku}] ${it.product.name} (${it.product.spec}) - Qty: ${it.quantity} × $${it.product.price} = $${it.quantity * it.product.price}`
      ),
      `---------------------------------`,
      `Subtotal: $${subtotal.toLocaleString()}`,
      `Est. Shipping: ${estimatedShipping === 0 ? 'FREE (Orders > $1,500)' : `$${estimatedShipping}`}`,
      `Est. Total: $${estimatedTotal.toLocaleString()} USD`,
      `\nPlease advise bulk tiers, dispatch timeline and international air courier options.`
    ];
    return lines.join('\n');
  };

  const copyQuoteToClipboard = async () => {
    if (items.length === 0) {
      showToast('Cart is Empty', 'Add products before generating a quote.', 'warning');
      return;
    }
    try {
      const text = generateQuoteText();
      await navigator.clipboard.writeText(text);
      showToast('Quote Copied!', 'Wholesale line-item specification copied to clipboard.', 'success');
    } catch {
      showToast('Notice', 'Unable to copy to clipboard automatically.', 'error');
    }
  };

  const openWhatsAppQuote = () => {
    if (items.length === 0) {
      showToast('Cart is Empty', 'Add items before sending via WhatsApp.', 'warning');
      return;
    }
    const text = generateQuoteText();
    // Default sales desk number
    const phone = '85294582103'; 
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isDrawerOpen,
        setIsDrawerOpen,
        totalItems,
        totalUnits,
        subtotal,
        estimatedShipping,
        estimatedTotal,
        copyQuoteToClipboard,
        openWhatsAppQuote
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
