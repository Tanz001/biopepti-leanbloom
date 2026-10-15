import React, { useEffect, useState } from 'react';
import { Product, ProductVariantOption, productWithVariant } from '../../types';
import { useCart } from '../../context/CartContext';
import { VialGraphic } from '../ui/VialGraphic';
import { X, Plus, Check, ExternalLink } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  relatedProducts?: Product[];
  onSelectProduct?: (prod: Product) => void;
}

/** Show pack size as entered, or expand plain "5mg" → "5mg/vial*10 vials". */
function formatPackSize(strength: string): string {
  const value = (strength || '').trim();
  if (!value) return value;
  if (/\/vial|\*/i.test(value)) return value;
  if (/^\d+(\.\d+)?\s*mg$/i.test(value)) {
    return `${value.replace(/\s+/g, '')}/vial*10 vials`;
  }
  return value;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantOption | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product?.variants?.length) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
    setAdded(false);
  }, [product]);

  if (!product || !selectedVariant) return null;

  const selectedSize = formatPackSize(selectedVariant.strength);

  const handleAdd = () => {
    addItem(
      productWithVariant(product, {
        ...selectedVariant,
        strength: selectedSize,
      }),
      1
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (!product.buyLink) return;
    window.open(product.buyLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#002050]/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E2E8EE] overflow-hidden z-10 max-h-[90vh] flex flex-col">
        <div className="px-5 sm:px-6 py-4 border-b border-[#E2E8EE] flex items-center justify-between bg-[#F4F8FA]">
          <div className="min-w-0">
            <p className="font-mono-code text-[11px] font-bold text-[#5B6B73]">{product.sku}</p>
            <h3 className="font-sora font-bold text-lg text-[#002050] truncate">{product.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-black hover:bg-slate-200/60 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            <div className="w-full aspect-square max-h-64 rounded-2xl bg-gradient-to-b from-[#E6F7F5] to-[#F4F8FA] flex items-center justify-center border border-[#E2E8EE] p-4 overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <VialGraphic size={140} label="BIOPEPTI" sublabel={product.sku} />
              )}
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5B6B73]">
                  {product.category}
                </p>
                {product.description && (
                  <p className="text-sm text-[#5B6B73] mt-2 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-[#002050] mb-2">Select size</p>
                <div className="space-y-2">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant.id === variant.id;
                    const packSize = formatPackSize(variant.strength);
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#00B8AA] bg-[#E6F7F5] ring-1 ring-[#00B8AA]/30'
                            : 'border-[#E2E8EE] bg-white hover:border-[#00B8AA]/50'
                        }`}
                      >
                        <span className="font-mono-code text-sm font-semibold text-[#002050] break-all">
                          {packSize}
                        </span>
                        <span className="font-mono-code text-sm font-bold text-[#002050] shrink-0">
                          ${variant.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-1 border-t border-[#E2E8EE]">
                <p className="text-[11px] uppercase tracking-wider text-[#5B6B73] font-semibold">
                  Selected size
                </p>
                <p className="font-mono-code text-base font-semibold text-[#002050] mt-1 break-all">
                  {selectedSize}
                </p>
                <p className="font-mono-code font-bold text-2xl text-[#002050] mt-1">
                  ${selectedVariant.price.toFixed(2)}
                </p>
              </div>

              {product.buyLink ? (
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 px-6 rounded-full font-sora font-semibold text-sm flex items-center justify-center gap-2 bg-[#00B8AA] hover:bg-[#00a396] text-white transition-all shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  Buy Now
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  className={`w-full py-3 px-6 rounded-full font-sora font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                    added
                      ? 'bg-[#16A34A] text-white'
                      : 'bg-[#002050] hover:bg-[#001538] text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Quote
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-[#5EC8E8]" />
                      Add to Quote — ${selectedVariant.price.toFixed(2)}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
