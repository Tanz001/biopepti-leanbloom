import React, { useState, useEffect, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { PRODUCTS_DATA, getGroupedProducts } from '../data/products';
import { Product, SavedQuote, QuoteCustomer } from '../types';
import { generateQuotePDF } from '../lib/pdfGenerator';
import { VialGraphic } from '../components/ui/VialGraphic';
import {
  FileText,
  Eye,
  History,
  Download,
  Copy,
  MessageSquare,
  Plus,
  Minus,
  Trash2,
  Search,
  ChevronDown,
  ChevronRight,
  Save,
  CheckCircle2,
  ShieldCheck,
  Building,
  Mail,
  Phone,
  MapPin,
  Sparkles
} from 'lucide-react';

const SAVED_QUOTES_KEY = 'biopepti_quote_history_v1';

export const QuoteBuilderPage: React.FC = () => {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalUnits,
    copyQuoteToClipboard,
    openWhatsAppQuote
  } = useCart();

  const { showToast } = useToast();

  // Active Tab: 'quote' | 'preview' | 'history'
  const [activeTab, setActiveTab] = useState<'quote' | 'preview' | 'history'>('quote');

  // Auto-generated Quote ID
  const [quoteId, setQuoteId] = useState<string>(() => {
    return 'Q-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  });

  // Customer state
  const [customer, setCustomer] = useState<QuoteCustomer>({
    companyName: '',
    contactName: '',
    email: '',
    phoneWhatsapp: '',
    shippingCountry: 'United States',
    shippingAddress: ''
  });

  // Financial adjustments
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [shippingFee, setShippingFee] = useState<number>(() => (subtotal > 1500 ? 0 : 35));
  const [includeTax, setIncludeTax] = useState<boolean>(false);
  const [taxRate] = useState<number>(5); // 5%
  const [notes, setNotes] = useState<string>('Standard 2-8°C refrigerated transit. Lyophilized vials with desiccant.');

  // Catalog panel search & expansion
  const [catalogSearch, setCatalogSearch] = useState('');
  const [expandedCatalogGroups, setExpandedCatalogGroups] = useState<Record<string, boolean>>({});

  // History quotes list
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_QUOTES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [historySearch, setHistorySearch] = useState('');

  // Auto-update shipping fee when subtotal changes if user hasn't manually overridden
  useEffect(() => {
    if (subtotal >= 1500) {
      setShippingFee(0);
    } else if (subtotal > 0 && shippingFee === 0) {
      setShippingFee(35);
    }
  }, [subtotal]);

  // Calculations
  const discountAmount = useMemo(() => {
    if (discountValue <= 0) return 0;
    if (discountType === 'percentage') {
      return Math.round((subtotal * discountValue) / 100);
    }
    return Math.min(discountValue, subtotal);
  }, [subtotal, discountType, discountValue]);

  const taxAmount = useMemo(() => {
    if (!includeTax) return 0;
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    return Math.round((taxableAmount * taxRate) / 100);
  }, [subtotal, discountAmount, includeTax, taxRate]);

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);

  // Grouped products for catalog panel
  const groupedProducts = useMemo(() => {
    const all = getGroupedProducts();
    if (!catalogSearch.trim()) return all;
    const q = catalogSearch.toLowerCase();
    return all.filter(g =>
      g.name.toLowerCase().includes(q) ||
      g.variants.some(v => v.sku.toLowerCase().includes(q) || v.spec.toLowerCase().includes(q))
    );
  }, [catalogSearch]);

  const toggleGroup = (name: string) => {
    setExpandedCatalogGroups(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Save Quote to history
  const handleSaveQuote = () => {
    if (items.length === 0) {
      showToast('No Items in Quote', 'Add products before saving quotation.', 'warning');
      return;
    }

    const newQuote: SavedQuote = {
      id: quoteId,
      createdAt: new Date().toISOString(),
      customer,
      items,
      discountType,
      discountValue,
      shippingFee,
      includeTax,
      taxRate,
      notes,
      subtotal,
      discountAmount,
      taxAmount,
      grandTotal,
      status: 'Draft'
    };

    const updated = [newQuote, ...savedQuotes.filter(q => q.id !== quoteId)];
    setSavedQuotes(updated);
    try {
      localStorage.setItem(SAVED_QUOTES_KEY, JSON.stringify(updated));
      showToast('Quotation Saved!', `Quote ${quoteId} stored in local history.`, 'success');
    } catch {
      showToast('Storage Error', 'Could not save quote locally.', 'error');
    }
  };

  // Load a quote from history
  const handleLoadQuote = (quote: SavedQuote) => {
    setQuoteId(quote.id);
    setCustomer(quote.customer);
    setDiscountType(quote.discountType);
    setDiscountValue(quote.discountValue);
    setShippingFee(quote.shippingFee);
    setIncludeTax(quote.includeTax);
    setNotes(quote.notes || '');

    // Replace items
    clearCart();
    quote.items.forEach(it => {
      addItem(it.product, it.quantity);
    });

    setActiveTab('quote');
    showToast('Quote Loaded', `Restored quotation ${quote.id}.`, 'info');
  };

  // Duplicate quote
  const handleDuplicateQuote = (quote: SavedQuote) => {
    const freshId = 'Q-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const duplicated: SavedQuote = {
      ...quote,
      id: freshId,
      createdAt: new Date().toISOString()
    };
    const updated = [duplicated, ...savedQuotes];
    setSavedQuotes(updated);
    localStorage.setItem(SAVED_QUOTES_KEY, JSON.stringify(updated));
    showToast('Quote Duplicated', `Created fresh copy ${freshId}.`, 'success');
  };

  // Delete quote
  const handleDeleteQuote = (id: string) => {
    const updated = savedQuotes.filter(q => q.id !== id);
    setSavedQuotes(updated);
    localStorage.setItem(SAVED_QUOTES_KEY, JSON.stringify(updated));
    showToast('Quote Removed', `Deleted quotation ${id}.`, 'info');
  };

  // Trigger PDF Download
  const handleExportPDF = () => {
    if (items.length === 0) {
      showToast('Cannot Export Empty Quote', 'Please add items before exporting.', 'warning');
      return;
    }

    generateQuotePDF({
      quoteId,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      customer,
      items,
      subtotal,
      discountAmount,
      shippingFee,
      taxAmount,
      grandTotal,
      notes
    });

    showToast('PDF Exported', `Generated formal quotation ${quoteId}.pdf`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#F4F8FA] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8EE]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#002050] text-[#5EC8E8]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-sora text-[#002050]">
                  Quote Builder
                </h1>
                <span className="font-mono-code text-xs font-bold px-2.5 py-1 rounded-full bg-[#E6F7F5] text-[#00B8AA] border border-[#00B8AA]/20">
                  {quoteId}
                </span>
              </div>
              <p className="text-xs text-[#5B6B73]">
                Instant wholesale quotation, volume tier engine & official PDF generator.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveQuote}
              className="px-4 py-2.5 rounded-full bg-white border border-[#E2E8EE] hover:border-[#00B8AA] text-[#002050] font-sora font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-[#00B8AA]" />
              <span>Save Quote</span>
            </button>

            <button
              onClick={handleExportPDF}
              className="px-5 py-2.5 rounded-full bg-[#002050] hover:bg-[#001538] text-white font-sora font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-[#5EC8E8]" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* 3 Tabs with Green Underline Animation */}
        <div className="flex items-center gap-8 border-b border-[#E2E8EE]">
          <button
            onClick={() => setActiveTab('quote')}
            className={`pb-3 font-sora text-sm font-semibold relative transition-colors ${
              activeTab === 'quote' ? 'text-[#00B8AA]' : 'text-[#5B6B73] hover:text-[#002050]'
            }`}
          >
            <span>Quote Page</span>
            {activeTab === 'quote' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B8AA] rounded-full animate-in fade-in" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-3 font-sora text-sm font-semibold relative flex items-center gap-2 transition-colors ${
              activeTab === 'preview' ? 'text-[#00B8AA]' : 'text-[#5B6B73] hover:text-[#002050]'
            }`}
          >
            <span>Preview Page</span>
            {items.length > 0 && (
              <span className="text-[10px] font-mono-code bg-[#E6F7F5] text-[#00B8AA] px-2 py-0.2 rounded-full font-bold">
                {items.length}
              </span>
            )}
            {activeTab === 'preview' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B8AA] rounded-full animate-in fade-in" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 font-sora text-sm font-semibold relative flex items-center gap-2 transition-colors ${
              activeTab === 'history' ? 'text-[#00B8AA]' : 'text-[#5B6B73] hover:text-[#002050]'
            }`}
          >
            <span>History Page</span>
            <span className="text-[10px] font-mono-code bg-slate-100 text-[#5B6B73] px-2 py-0.2 rounded-full font-bold">
              {savedQuotes.length}
            </span>
            {activeTab === 'history' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B8AA] rounded-full animate-in fade-in" />
            )}
          </button>
        </div>

        {/* TAB 1: QUOTE PAGE (2 Columns: Left Catalog, Right Items & Pricing) */}
        {activeTab === 'quote' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Product Catalog Panel */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-[#E2E8EE] shadow-xs space-y-4 max-h-[820px] flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="font-sora font-bold text-sm text-[#002050]">Catalog Quick-Add</h3>
                <span className="text-[11px] font-mono-code text-[#5B6B73]">
                  {PRODUCTS_DATA.length} Formulations
                </span>
              </div>

              {/* Search catalog */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#5B6B73] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter peptides by name or SKU..."
                  value={catalogSearch}
                  onChange={e => setCatalogSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-xs font-inter text-[#002050] focus:bg-white"
                />
              </div>

              {/* Scrollable list of grouped products */}
              <div className="overflow-y-auto space-y-2 flex-1 pr-1">
                {groupedProducts.map(group => {
                  const isExp = expandedCatalogGroups[group.name] ?? false;
                  return (
                    <div
                      key={group.name}
                      className="border border-[#E2E8EE] rounded-2xl overflow-hidden bg-[#F7FAFC]"
                    >
                      <button
                        onClick={() => toggleGroup(group.name)}
                        className="w-full p-3 text-left flex items-center justify-between hover:bg-slate-100 transition-colors"
                      >
                        <div>
                          <span className="font-sora font-bold text-xs text-[#002050] block">
                            {group.name}
                          </span>
                          <span className="text-[10px] text-[#5B6B73]">
                            {group.variants.length} specifications
                          </span>
                        </div>
                        {isExp ? (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </button>

                      {isExp && (
                        <div className="p-2 space-y-1.5 border-t border-[#E2E8EE] bg-white">
                          {group.variants.map(variant => (
                            <div
                              key={variant.id}
                              className="p-2 rounded-xl bg-[#F4F8FA] flex items-center justify-between text-xs"
                            >
                              <div>
                                <span className="font-mono-code text-[11px] font-bold text-[#002050]">
                                  [{variant.sku}]
                                </span>
                                <span className="text-[#5B6B73] ml-1.5">{variant.spec}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono-code font-bold text-[#00B8AA]">
                                  ${variant.price}
                                </span>
                                <button
                                  onClick={() => addItem(variant, 1)}
                                  className="w-6 h-6 rounded-lg bg-[#00B8AA] hover:bg-[#009688] text-white flex items-center justify-center transition-colors shadow-2xs"
                                  title="Add to quotation"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Quote Items & Billing Panel */}
            <div className="lg:col-span-7 space-y-6">
              {/* Customer / Destination Info Fields */}
              <div className="bg-white rounded-3xl p-6 border border-[#E2E8EE] shadow-xs space-y-4">
                <h3 className="font-sora font-bold text-sm text-[#002050] flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#00B8AA]" />
                  <span>Client & Dispatch Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] font-medium text-[#5B6B73] block mb-1">
                      Company / University / Lab Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex BioPharma Labs Inc."
                      value={customer.companyName}
                      onChange={e => setCustomer({ ...customer, companyName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] focus:bg-white text-[#002050]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#5B6B73] block mb-1">
                      Contact Name / Investigator
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Robert Miller"
                      value={customer.contactName}
                      onChange={e => setCustomer({ ...customer, contactName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] focus:bg-white text-[#002050]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#5B6B73] block mb-1 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>Email for Official Quote PDF</span>
                    </label>
                    <input
                      type="email"
                      placeholder="procurement@apexbiopharma.com"
                      value={customer.email}
                      onChange={e => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] focus:bg-white text-[#002050]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#5B6B73] block mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>WhatsApp / Direct Contact Number</span>
                    </label>
                    <input
                      type="text"
                      placeholder="+1 (555) 019-2834"
                      value={customer.phoneWhatsapp}
                      onChange={e => setCustomer({ ...customer, phoneWhatsapp: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] focus:bg-white text-[#002050]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-medium text-[#5B6B73] block mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>Delivery Country & Address</span>
                    </label>
                    <input
                      type="text"
                      placeholder="400 Research Pkwy, Cambridge, MA 02142, USA"
                      value={customer.shippingAddress}
                      onChange={e => setCustomer({ ...customer, shippingAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] focus:bg-white text-[#002050]"
                    />
                  </div>
                </div>
              </div>

              {/* Quote Items List */}
              <div className="bg-white rounded-3xl p-6 border border-[#E2E8EE] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-sora font-bold text-sm text-[#002050]">
                    Quote Line Items ({items.length})
                  </h3>
                  {items.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-red-500 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Clear items
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-[#F4F8FA] border border-dashed border-[#E2E8EE]">
                    <div className="w-16 h-16 mx-auto mb-2 opacity-60">
                      <VialGraphic size={60} label="0" sublabel="EMPTY" />
                    </div>
                    <p className="font-sora font-bold text-sm text-[#002050]">No Quote Items Selected</p>
                    <p className="text-xs text-[#5B6B73] mt-1">
                      Use the quick-add catalog panel on the left to add research peptide packs.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map(item => (
                      <div
                        key={item.product.id}
                        className="p-3.5 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono-code font-bold text-[11px] bg-white px-2 py-1 rounded border border-[#E2E8EE] text-[#002050]">
                            {item.product.sku}
                          </span>
                          <div>
                            <span className="font-sora font-bold text-xs text-[#002050] block">
                              {item.product.name}
                            </span>
                            <span className="text-[#5B6B73] text-[11px]">{item.product.spec}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-end sm:self-auto">
                          {/* Stepper */}
                          <div className="flex items-center border border-[#E2E8EE] rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 text-slate-500 hover:text-black hover:bg-slate-50 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-mono-code font-bold text-xs min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 text-slate-500 hover:text-black hover:bg-slate-50 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right min-w-[65px]">
                            <span className="font-mono-code font-bold text-xs text-[#002050] block">
                              ${item.quantity * item.product.price}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono-code">
                              ${item.product.price}/ea
                            </span>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                            title="Remove line item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Adjustments: Discount, Shipping, Tax & Notes */}
              <div className="bg-white rounded-3xl p-6 border border-[#E2E8EE] shadow-xs space-y-4">
                <h3 className="font-sora font-bold text-sm text-[#002050]">
                  Pricing Modifiers & Wholesale Notes
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* Discount */}
                  <div>
                    <label className="text-[11px] font-medium text-[#5B6B73] block mb-1">
                      Volume Discount
                    </label>
                    <div className="flex items-center gap-1">
                      <select
                        value={discountType}
                        onChange={e => setDiscountType(e.target.value as any)}
                        className="px-2 py-2 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-xs font-semibold"
                      >
                        <option value="percentage">% Off</option>
                        <option value="fixed">$ Fixed</option>
                      </select>
                      <input
                        type="number"
                        min="0"
                        value={discountValue}
                        onChange={e => setDiscountValue(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] font-mono-code"
                      />
                    </div>
                  </div>

                  {/* Shipping Fee */}
                  <div>
                    <label className="text-[11px] font-medium text-[#5B6B73] block mb-1">
                      Cold-Chain Shipping Fee (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={shippingFee}
                      onChange={e => setShippingFee(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] font-mono-code"
                    />
                  </div>

                  {/* Tax Toggle */}
                  <div>
                    <label className="text-[11px] font-medium text-[#5B6B73] block mb-1">
                      Import Duty / Handling
                    </label>
                    <button
                      type="button"
                      onClick={() => setIncludeTax(!includeTax)}
                      className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                        includeTax
                          ? 'bg-[#E6F7F5] border-[#00B8AA] text-[#00B8AA]'
                          : 'bg-[#F4F8FA] border-[#E2E8EE] text-[#5B6B73]'
                      }`}
                    >
                      <span>{includeTax ? 'Tax Applied (5%)' : 'Exempt / Zero-Tax'}</span>
                      <CheckCircle2 className={`w-3.5 h-3.5 ${includeTax ? 'text-[#00B8AA]' : 'opacity-0'}`} />
                    </button>
                  </div>
                </div>

                {/* Notes input */}
                <div>
                  <label className="text-[11px] font-medium text-[#5B6B73] block mb-1">
                    Special Packaging or Protocol Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Specify customs tariff codes, batch numbers, or packaging requirements..."
                    className="w-full p-3 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-xs font-inter focus:bg-white"
                  />
                </div>
              </div>

              {/* Totals Summary Card & Fast Export Row */}
              <div className="bg-[#002050] text-white rounded-3xl p-6 shadow-xl space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal ({totalUnits} packs):</span>
                    <span className="font-mono-code text-white">${subtotal.toLocaleString()}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#5EC8E8]">
                      <span>Volume Discount Applied:</span>
                      <span className="font-mono-code">-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-300">
                    <span>Cold-Chain Express Shipping:</span>
                    <span className="font-mono-code text-white">
                      {shippingFee === 0 ? 'FREE (Orders > $1,500)' : `$${shippingFee}`}
                    </span>
                  </div>

                  {taxAmount > 0 && (
                    <div className="flex justify-between text-slate-300">
                      <span>Import Duty / Handling (5%):</span>
                      <span className="font-mono-code text-white">${taxAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-3 border-t border-slate-700 text-sm font-bold">
                    <span className="font-sora">Grand Total:</span>
                    <span className="font-mono-code text-[#5EC8E8] text-xl">
                      ${grandTotal.toLocaleString()} USD
                    </span>
                  </div>
                </div>

                {/* Export Buttons */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={handleExportPDF}
                    className="py-3 px-4 rounded-full bg-[#00B8AA] hover:bg-[#009688] text-white font-sora font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 text-white" />
                    <span>Export PDF</span>
                  </button>

                  <button
                    onClick={copyQuoteToClipboard}
                    className="py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-sora font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/20"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#5EC8E8]" />
                    <span>Copy Text</span>
                  </button>

                  <button
                    onClick={openWhatsAppQuote}
                    className="py-3 px-4 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-sora font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-white" />
                    <span>WhatsApp Desk</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE A4-STYLE BRANDED PREVIEW PAGE */}
        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#5B6B73]">
                Live A4 PDF simulation. Ready to print or transmit to corporate procurement.
              </span>
              <button
                onClick={handleExportPDF}
                className="px-6 py-2.5 rounded-full bg-[#00B8AA] text-white font-sora text-xs font-semibold flex items-center gap-2 hover:bg-[#009688] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Official PDF</span>
              </button>
            </div>

            {/* A4 Sheet Mockup */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8EE] shadow-2xl space-y-8">
              {/* Top Accent Strip */}
              <div className="h-2 bg-[#00B8AA] rounded-full -mt-2 mb-6" />

              {/* Brand and Quote Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-[#E2E8EE]">
                <div>
                  <div className="flex items-center gap-2.5">
                    <img src="/logo-mark.png" alt="" className="h-9 w-auto object-contain" />
                    <span className="font-sora font-extrabold text-2xl text-[#002050]">Biopepti</span>
                  </div>
                  <p className="text-xs text-[#5B6B73] mt-1">
                    Advanced Peptide Synthesis & Research Supply Group
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono-code">
                    Central BioHub, Hong Kong SAR • South San Francisco, CA, USA
                  </p>
                </div>

                <div className="text-right font-mono-code text-xs">
                  <span className="inline-block px-3 py-1 rounded bg-[#E6F7F5] text-[#00B8AA] font-bold text-sm mb-1">
                    OFFICIAL QUOTATION
                  </span>
                  <p className="font-bold text-[#002050]">ID: {quoteId}</p>
                  <p className="text-[#5B6B73]">
                    Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-slate-400 text-[10px]">Validity: 30 Days from Issue</p>
                </div>
              </div>

              {/* Customer Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5B6B73] block mb-1">
                    CLIENT / INSTITUTION
                  </span>
                  <p className="font-sora font-bold text-[#002050]">
                    {customer.companyName || 'Institutional Research Client'}
                  </p>
                  <p className="text-[#5B6B73]">{customer.contactName || 'Procurement Officer'}</p>
                  <p className="font-mono-code text-[#5B6B73]">{customer.email || 'N/A'}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5B6B73] block mb-1">
                    DESTINATION & COLD-CHAIN
                  </span>
                  <p className="font-sora font-bold text-[#002050]">
                    {customer.shippingCountry || 'International Freight'}
                  </p>
                  <p className="text-[#5B6B73]">{customer.shippingAddress || 'Express delivery hub'}</p>
                  <p className="text-[10px] text-[#00B8AA] font-mono-code">
                    Temperature-controlled insulated carton with ice packs
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-[#E2E8EE] rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#002050] text-white text-[11px] font-sora font-semibold">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">SKU</th>
                      <th className="py-3 px-4">Product Formulation</th>
                      <th className="py-3 px-4">Purity</th>
                      <th className="py-3 px-4 text-center">Qty</th>
                      <th className="py-3 px-4 text-right">Unit Price</th>
                      <th className="py-3 px-4 text-right">Total (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8EE] font-inter">
                    {items.map((it, idx) => (
                      <tr key={it.product.id}>
                        <td className="py-3 px-4 text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-4 font-mono-code font-bold text-[#002050]">
                          {it.product.sku}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-sora font-semibold text-[#002050] block">
                            {it.product.name}
                          </span>
                          <span className="text-[11px] text-[#5B6B73]">{it.product.spec}</span>
                        </td>
                        <td className="py-3 px-4 font-mono-code text-[#00B8AA]">
                          {it.product.purity}
                        </td>
                        <td className="py-3 px-4 font-mono-code text-center font-bold">
                          {it.quantity}
                        </td>
                        <td className="py-3 px-4 font-mono-code text-right text-slate-600">
                          ${it.product.price}
                        </td>
                        <td className="py-3 px-4 font-mono-code text-right font-bold text-[#002050]">
                          ${it.quantity * it.product.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals & Terms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 items-start text-xs">
                <div className="space-y-2">
                  <span className="font-sora font-bold text-xs uppercase tracking-wider text-[#002050] block">
                    Terms & Payment Conditions
                  </span>
                  <p className="text-[#5B6B73] leading-relaxed text-[11px]">
                    • In-stock items dispatch within 24-48 business hours via DHL / FedEx.
                    <br />• Payment accepted via Wire Transfer (T/T), Corporate ACH, or Crypto.
                    <br />• Full analytical HPLC/MS Certificate of Analysis included with each box.
                  </p>
                  {notes && (
                    <div className="p-3 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[11px] text-[#002050] mt-2">
                      <span className="font-semibold block mb-0.5">Order Note:</span>
                      {notes}
                    </div>
                  )}
                </div>

                <div className="p-5 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] space-y-2">
                  <div className="flex justify-between text-[#5B6B73]">
                    <span>Subtotal:</span>
                    <span className="font-mono-code text-[#002050]">${subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#00B8AA]">
                      <span>Volume Discount:</span>
                      <span className="font-mono-code">-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5B6B73]">
                    <span>Cold-Chain Courier:</span>
                    <span className="font-mono-code text-[#002050]">
                      {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                    </span>
                  </div>
                  {taxAmount > 0 && (
                    <div className="flex justify-between text-[#5B6B73]">
                      <span>Handling / Duty:</span>
                      <span className="font-mono-code text-[#002050]">${taxAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pt-2 border-t border-[#E2E8EE] text-sm font-bold text-[#002050]">
                    <span className="font-sora">Grand Total:</span>
                    <span className="font-mono-code text-[#00B8AA] text-lg">
                      ${grandTotal.toLocaleString()} USD
                    </span>
                  </div>
                </div>
              </div>

              {/* Research Use Only Warning Strip in Preview */}
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-center text-[10px] text-red-700 font-mono-code">
                LEGAL NOTICE: ALL PRODUCTS ARE FOR IN VITRO LABORATORY RESEARCH USE ONLY. NOT FOR HUMAN OR VETERINARY USE.
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HISTORY PAGE */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-sora font-bold text-lg text-[#002050]">Saved Quotations</h3>
                <p className="text-xs text-[#5B6B73]">
                  Stored locally in your browser. Re-open, duplicate, or re-export at any time.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#5B6B73] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by quote ID or company..."
                  value={historySearch}
                  onChange={e => setHistorySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#E2E8EE] text-xs font-inter text-[#002050]"
                />
              </div>
            </div>

            {savedQuotes.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#E2E8EE]">
                <History className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="font-sora font-bold text-sm text-[#002050]">No Saved Quotations</h4>
                <p className="text-xs text-[#5B6B73] mt-1 max-w-sm mx-auto">
                  Build a quote in the Quote Page tab and click &quot;Save Quote&quot; to archive it here.
                </p>
                <button
                  onClick={() => setActiveTab('quote')}
                  className="mt-4 px-5 py-2 rounded-full bg-[#002050] text-white font-sora text-xs font-semibold"
                >
                  Return to Quote Page
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedQuotes
                  .filter(q =>
                    q.id.toLowerCase().includes(historySearch.toLowerCase()) ||
                    (q.customer.companyName && q.customer.companyName.toLowerCase().includes(historySearch.toLowerCase()))
                  )
                  .map(quote => (
                    <div
                      key={quote.id}
                      className="p-5 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs space-y-4 card-lift flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-[#E2E8EE]">
                          <span className="font-mono-code font-bold text-xs text-[#00B8AA] bg-[#E6F7F5] px-2 py-0.5 rounded-full">
                            {quote.id}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono-code">
                            {new Date(quote.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="mt-3 space-y-1">
                          <h4 className="font-sora font-bold text-sm text-[#002050] truncate">
                            {quote.customer.companyName || 'Institutional Client'}
                          </h4>
                          <p className="text-xs text-[#5B6B73]">
                            {quote.items.length} items • {quote.items.reduce((s, it) => s + it.quantity, 0)} packs
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E2E8EE] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#5B6B73] block uppercase">Total</span>
                          <span className="font-mono-code font-bold text-sm text-[#002050]">
                            ${quote.grandTotal.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleLoadQuote(quote)}
                            className="p-2 rounded-xl bg-[#F4F8FA] hover:bg-[#E6F7F5] text-[#002050] hover:text-[#00B8AA] transition-colors"
                            title="Load into builder"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDuplicateQuote(quote)}
                            className="p-2 rounded-xl bg-[#F4F8FA] hover:bg-slate-200 text-[#002050] transition-colors"
                            title="Duplicate"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuote(quote.id)}
                            className="p-2 rounded-xl bg-[#F4F8FA] hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
