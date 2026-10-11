import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, Copy, MessageSquare, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { VialGraphic } from '../ui/VialGraphic';

export const QuoteCartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    estimatedShipping,
    estimatedTotal,
    copyQuoteToClipboard,
    openWhatsAppQuote,
    totalUnits
  } = useCart();

  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const handleOpenQuoteBuilder = () => {
    setIsDrawerOpen(false);
    navigate('/quote');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="absolute inset-0 bg-[#0B1F2A]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-drawer bg-white/95 shadow-2xl flex flex-col border-l border-[#E4EAE8] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E4EAE8] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#E7F6F3] text-[#0E9F8E]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sora font-bold text-lg text-[#0B1F2A]">Wholesale Quote Cart</h3>
                <p className="text-xs text-[#5B6B73]">
                  {totalUnits} {totalUnits === 1 ? 'pack' : 'packs'} selected ({items.length} SKUs)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close Quote Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 mb-4 opacity-75">
                  <VialGraphic size={90} label="EMPTY" sublabel="CATALOG" />
                </div>
                <h4 className="font-sora font-bold text-base text-[#0B1F2A]">Your Quote Cart is Empty</h4>
                <p className="text-xs text-[#5B6B73] max-w-xs mt-1.5 leading-relaxed">
                  Browse our wholesale research peptide catalog to add pure lyophilized batches to your quote.
                </p>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/products');
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#0B1F2A] text-white text-xs font-semibold hover:bg-[#07131A] transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <span>Explore 179 SKUs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#5EEAD4]" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 text-xs text-[#5B6B73]">
                  <span>Item Specifications</span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-500 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear all
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map(item => (
                    <div
                      key={item.product.id}
                      className="p-3.5 rounded-2xl bg-[#F6F8F7] border border-[#E4EAE8] flex gap-3.5 items-center card-lift"
                    >
                      {/* Mini Vial preview */}
                      <div className="w-12 h-14 bg-white rounded-xl border border-[#E4EAE8] flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                        <VialGraphic size={38} label="LUM" sublabel={item.product.sku} purity="" />
                      </div>

                      {/* Product details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h5 className="font-sora font-bold text-xs text-[#0B1F2A] truncate">
                            {item.product.name}
                          </h5>
                          <span className="font-mono-code text-[11px] font-semibold text-[#0E9F8E] shrink-0">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-mono-code bg-white px-1.5 py-0.2 rounded border border-[#E4EAE8] text-[#5B6B73]">
                            {item.product.sku}
                          </span>
                          <span className="text-[11px] text-[#5B6B73] truncate">
                            {item.product.spec}
                          </span>
                        </div>

                        {/* Stepper & Unit Price */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center border border-[#E4EAE8] rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 text-slate-500 hover:text-black hover:bg-slate-50 transition-colors"
                              aria-label={`Decrease quantity of ${item.product.name}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-mono-code font-bold text-[#0B1F2A] min-w-[28px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 text-slate-500 hover:text-black hover:bg-slate-50 transition-colors"
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono-code text-[#5B6B73]">
                              ${item.product.price}/ea
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Free shipping banner */}
                <div className="p-3 rounded-xl bg-[#E7F6F3] border border-[#0E9F8E]/20 text-xs text-[#0B1F2A] flex items-center gap-2 mt-4">
                  <ShieldCheck className="w-4 h-4 text-[#0E9F8E] shrink-0" />
                  <span>
                    {subtotal >= 1500
                      ? 'Qualified for Complimentary Cold-Chain Express Shipping.'
                      : `Add $${(1500 - subtotal).toLocaleString()} more for Free Worldwide Cold-Chain Air Courier.`}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Footer Totals & Action Buttons */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#E4EAE8] bg-[#F6F8F7] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5B6B73]">
                  <span>Subtotal ({totalUnits} packs):</span>
                  <span className="font-mono-code text-[#0B1F2A]">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5B6B73]">
                  <span>Insulated Cold-Chain Freight:</span>
                  <span className="font-mono-code text-[#0B1F2A]">
                    {estimatedShipping === 0 ? 'FREE' : `$${estimatedShipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0B1F2A] pt-2 border-t border-[#E4EAE8]">
                  <span className="font-sora">Estimated Total:</span>
                  <span className="font-mono-code text-[#0E9F8E] text-base">
                    ${estimatedTotal.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* 3 Main Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* 1. Open Quote Builder */}
                <button
                  onClick={handleOpenQuoteBuilder}
                  className="w-full py-3 px-4 rounded-full bg-[#0B1F2A] text-white font-sora font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#07131A] transition-all group shadow-sm"
                >
                  <span>Open Full Quote Builder</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#5EEAD4] group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 2. Copy Quote & Send WhatsApp row */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={copyQuoteToClipboard}
                    className="py-2.5 px-3 rounded-full bg-white border border-[#E4EAE8] text-[#0B1F2A] font-sora font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#0E9F8E]" />
                    <span>Copy Text</span>
                  </button>

                  <button
                    onClick={openWhatsAppQuote}
                    className="py-2.5 px-3 rounded-full bg-[#0E9F8E] hover:bg-[#0B8576] text-white font-sora font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-white" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-center text-[#5B6B73]">
                Prices reflect wholesale pack tiers. Additional discounts apply for &gt;50 packs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
