import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { VialGraphic } from '../ui/VialGraphic';
import { X, Plus, Minus, Check, ShieldCheck, FileText, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  relatedProducts?: Product[];
  onSelectProduct?: (prod: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  relatedProducts = [],
  onSelectProduct
}) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Pricing tiers calculation
  const basePrice = product.price;
  const tiers = [
    { label: 'Standard Wholesale (1–9 packs)', discount: '0%', unitPrice: basePrice },
    { label: 'Tier 1 Bulk (10–49 packs)', discount: '5% OFF', unitPrice: Math.round(basePrice * 0.95) },
    { label: 'Tier 2 Institutional (50–99 packs)', discount: '10% OFF', unitPrice: Math.round(basePrice * 0.9) },
    { label: 'Tier 3 Master Distributor (100+ packs)', discount: '15% OFF', unitPrice: Math.round(basePrice * 0.85) }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#002050]/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E2E8EE] overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E2E8EE] flex items-center justify-between bg-[#F4F8FA]">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold bg-[#002050] text-white px-2.5 py-0.5 rounded-full">
              {product.sku}
            </span>
            <span className="text-xs text-[#5B6B73] font-medium font-inter">
              {product.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-black hover:bg-slate-200/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column: Vial Graphic & Specs */}
            <div className="flex flex-col items-center">
              <div className="w-full h-64 rounded-2xl bg-gradient-to-b from-[#E6F7F5] to-[#F4F8FA] flex items-center justify-center border border-[#E2E8EE] p-4 relative">
                <VialGraphic
                  size={140}
                  label="BIOPEPTI"
                  sublabel={product.sku}
                  purity={product.purity}
                />
                <div className="absolute top-3 left-3 flex items-center gap-1 font-mono-code text-[11px] font-bold text-[#00B8AA] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#00B8AA]/20 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  {product.purity} HPLC Purity
                </div>
              </div>

              {/* Chemical specs mini grid */}
              <div className="w-full grid grid-cols-2 gap-2 mt-4 text-xs">
                {product.casNumber && (
                  <div className="p-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE]">
                    <span className="block text-[10px] text-[#5B6B73] uppercase font-semibold">CAS Number</span>
                    <span className="font-mono-code text-[#002050] font-medium">{product.casNumber}</span>
                  </div>
                )}
                {product.molecularWeight && (
                  <div className="p-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE]">
                    <span className="block text-[10px] text-[#5B6B73] uppercase font-semibold">Molecular Weight</span>
                    <span className="font-mono-code text-[#002050] font-medium">{product.molecularWeight}</span>
                  </div>
                )}
                <div className="p-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE]">
                  <span className="block text-[10px] text-[#5B6B73] uppercase font-semibold">Specification</span>
                  <span className="font-mono-code text-[#002050] font-medium">{product.spec}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE]">
                  <span className="block text-[10px] text-[#5B6B73] uppercase font-semibold">Fulfillment</span>
                  <span className="text-[#00B8AA] font-semibold">{product.leadTime || 'Ships in 24h'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Name, Description, Quantity & Order */}
            <div className="space-y-4">
              <div>
                <h3 className="font-sora font-extrabold text-2xl text-[#002050] leading-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-[#5B6B73] mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.sequence && (
                <div className="p-3 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE]">
                  <span className="block text-[10px] text-[#5B6B73] font-mono-code uppercase font-semibold mb-1">
                    Amino Acid Sequence:
                  </span>
                  <span className="font-mono-code text-[11px] text-[#002050] break-all">
                    {product.sequence}
                  </span>
                </div>
              )}

              {/* Volume Discount Tiers */}
              <div className="border border-[#E2E8EE] rounded-2xl p-4 bg-[#F4F8FA]/60">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Layers className="w-4 h-4 text-[#00B8AA]" />
                  <h4 className="font-sora font-bold text-xs uppercase text-[#002050] tracking-wider">
                    Wholesale Volume Tiers
                  </h4>
                </div>
                <div className="space-y-1.5 text-xs">
                  {tiers.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1 border-b border-[#E2E8EE]/60 last:border-0"
                    >
                      <span className="text-[#5B6B73]">{t.label}</span>
                      <div className="flex items-center gap-2">
                        {t.discount !== '0%' && (
                          <span className="text-[10px] bg-[#E6F7F5] text-[#00B8AA] font-bold px-1.5 py-0.2 rounded font-mono-code">
                            {t.discount}
                          </span>
                        )}
                        <span className="font-mono-code font-bold text-[#002050]">
                          ${t.unitPrice}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Add Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center justify-between border border-[#E2E8EE] rounded-full p-1 bg-white shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-mono-code font-bold text-sm text-[#002050]">
                    {quantity} {quantity === 1 ? 'pack' : 'packs'}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 rounded-full font-sora font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                    added
                      ? 'bg-[#16A34A] text-white'
                      : 'bg-[#002050] hover:bg-[#001538] text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Quote Cart</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-[#5EC8E8]" />
                      <span>Add to Quote (${product.price * quantity})</span>
                    </>
                  )}
                </button>
              </div>

              {/* COA verification link */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <Link
                  to={`/coa-reports?search=${encodeURIComponent(product.name)}`}
                  onClick={onClose}
                  className="text-[#00B8AA] hover:underline flex items-center gap-1 font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Authenticated COA Reports</span>
                </Link>

                <div className="flex items-center gap-1 text-[#5B6B73]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00B8AA]" />
                  <span>RUO Compliance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-[#E2E8EE]">
              <h4 className="font-sora font-bold text-sm text-[#002050] mb-3">
                Related Research Formulations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.slice(0, 3).map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct && onSelectProduct(rel)}
                    className="p-3 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] hover:border-[#00B8AA] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <span className="font-mono-code text-[10px] text-[#5B6B73] block">{rel.sku}</span>
                      <h5 className="font-sora font-bold text-xs text-[#002050] truncate max-w-[140px]">{rel.name}</h5>
                      <span className="font-mono-code text-[11px] text-[#00B8AA] font-semibold">${rel.price}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
