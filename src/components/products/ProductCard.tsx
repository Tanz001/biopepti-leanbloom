import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { VialGraphic } from '../ui/VialGraphic';
import { Check, Plus, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  // Determine cap accent color based on category
  const getCapColor = (category: string) => {
    switch (category) {
      case 'Weight Management':
        return '#00B8AA'; // Primary teal
      case 'Recovery & Repair':
        return '#0284C7'; // Sky/Cobalt
      case 'Growth Hormone & Longevity':
        return '#7C3AED'; // Royal Violet
      case 'Cosmetic & Peptides':
        return '#0D9488'; // Deep Mint / Copper
      case 'Cognitive & Neuro':
        return '#EA580C'; // Warm Amber
      default:
        return '#002050';
    }
  };

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(product)}
      className="group relative bg-white rounded-3xl p-5 border border-[#E2E8EE] card-lift cursor-pointer flex flex-col justify-between shadow-xs select-none"
    >
      <div>
        {/* Card Header Tag Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono-code text-[11px] font-bold text-[#002050] bg-[#F4F8FA] border border-[#E2E8EE] px-2.5 py-1 rounded-full">
            {product.sku}
          </span>

          <span className="inline-flex items-center gap-1 font-mono-code text-[11px] font-semibold text-[#00B8AA] bg-[#E6F7F5] px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-[#00B8AA]" />
            {product.purity}
          </span>
        </div>

        {/* Product Image Area on Soft Mint Gradient */}
        <div className="relative w-full h-44 rounded-2xl bg-gradient-to-b from-[#E6F7F5] to-[#F4F8FA] flex items-center justify-center p-3 mb-4 overflow-hidden border border-[#E2E8EE]/60 group-hover:border-[#5EC8E8]/40 transition-colors">
          <div className="transform group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-300">
            <VialGraphic
              size={110}
              color={getCapColor(product.category)}
              label="BIOPEPTI"
              sublabel={product.sku}
              purity={product.purity}
            />
          </div>

          {/* Quick view hover icon */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-xs p-1.5 rounded-full shadow-xs text-slate-700">
            <Eye className="w-3.5 h-3.5" />
          </div>

          {/* Subtitle pill */}
          <div className="absolute bottom-2 left-2 right-2 text-center">
            <span className="text-[10px] text-[#5B6B73] font-mono-code truncate block bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md">
              {product.category}
            </span>
          </div>
        </div>

        {/* Title and Spec */}
        <div className="space-y-1 mb-3">
          <h4 className="font-sora font-bold text-base text-[#002050] group-hover:text-[#00B8AA] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h4>
          <p className="font-mono-code text-xs text-[#5B6B73]">{product.spec}</p>
        </div>
      </div>

      {/* Pricing & Add to Quote Button */}
      <div className="pt-3 border-t border-[#E2E8EE] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase text-[#5B6B73] font-semibold block tracking-wider">
            Wholesale
          </span>
          <span className="font-mono-code font-bold text-lg text-[#002050]">
            ${product.price}
            <span className="text-xs font-normal text-[#5B6B73]"> /pack</span>
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`h-9 px-4 rounded-full font-sora text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
            justAdded
              ? 'bg-[#16A34A] text-white scale-95'
              : 'bg-[#002050] hover:bg-[#001538] text-white active:scale-95'
          }`}
          aria-label={`Add ${product.name} to Quote`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-white animate-in zoom-in-50 duration-150" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 text-[#5EC8E8]" />
              <span>Add to Quote</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
