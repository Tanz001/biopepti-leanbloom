import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useCatalog } from '../context/CatalogContext';
import { Product } from '../types';
import {
  Download,
  Search,
  Plus,
  Check,
  Layers,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const PricingPage: React.FC = () => {
  const { addItem } = useCart();
  const { products } = useCatalog();
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // Filter products by search
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.spec.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  // Group by category for clear group dividers in the table
  const groupedByCategory = useMemo(() => {
    const map = new Map<string, Product[]>();
    filteredProducts.forEach(prod => {
      if (!map.has(prod.category)) {
        map.set(prod.category, []);
      }
      map.get(prod.category)!.push(prod);
    });
    return Array.from(map.entries());
  }, [filteredProducts]);

  const handleAdd = (product: Product) => {
    addItem(product, 1);
    setAddedItemIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  // CSV Download function
  const downloadCSV = () => {
    const headers = ['SKU', 'Product Name', 'Specification', 'Category', 'Unit Price (USD)', 'Purity', 'CAS Number', 'Lead Time'];
    const rows = products.map(p => [
      `"${p.sku}"`,
      `"${p.name}"`,
      `"${p.spec}"`,
      `"${p.category}"`,
      p.price,
      `"${p.purity}"`,
      `"${p.casNumber || 'N/A'}"`,
      `"${p.leadTime || 'Ships in 24h'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Biopepti_Wholesale_Pricelist_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F4F8FA] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8EE]">
          <div>
            <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
              B2B Institutional Rate Card
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-sora text-[#002050] mt-1">
              Wholesale Pricing Schedule
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6B73] mt-1">
              Factory-direct research peptide rates. Standard pack formats (typically 10 sterile lyophilized vials).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={downloadCSV}
              className="px-5 py-2.5 rounded-full bg-white border border-[#E2E8EE] hover:border-[#00B8AA] text-[#002050] font-sora font-semibold text-xs flex items-center gap-2 shadow-2xs transition-colors"
            >
              <Download className="w-4 h-4 text-[#00B8AA]" />
              <span>Download Full CSV Table</span>
            </button>

            <Link
              to="/quote"
              className="px-6 py-2.5 rounded-full bg-[#002050] hover:bg-[#001538] text-white font-sora font-semibold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <span>Build Custom Quotation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#5EC8E8]" />
            </Link>
          </div>
        </div>

        {/* Volume Discount Explainer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-[#E2E8EE] shadow-2xs space-y-2 card-lift">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-[#5B6B73]">TIER 1 (BASE)</span>
              <span className="font-mono-code text-xs bg-[#F4F8FA] px-2 py-0.5 rounded text-[#002050] font-bold">1–9 Units</span>
            </div>
            <h3 className="font-sora font-bold text-lg text-[#002050]">Standard Wholesale</h3>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              Full access to in-stock inventory with zero minimum box constraints.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#00B8AA]/30 shadow-2xs space-y-2 card-lift">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-[#00B8AA] font-bold">TIER 2 (BULK)</span>
              <span className="font-mono-code text-xs bg-[#E6F7F5] text-[#00B8AA] px-2 py-0.5 rounded font-bold">10–49 Units</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="font-sora font-bold text-lg text-[#002050]">5% Volume Off</h3>
              <TrendingDown className="w-4 h-4 text-[#00B8AA]" />
            </div>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              Applied automatically across all catalog SKUs. Complies with multi-vial mix-and-match.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E2E8EE] shadow-2xs space-y-2 card-lift">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-[#00B8AA] font-bold">TIER 3 (INSTITUTION)</span>
              <span className="font-mono-code text-xs bg-[#E6F7F5] text-[#00B8AA] px-2 py-0.5 rounded font-bold">50–99 Units</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="font-sora font-bold text-lg text-[#002050]">10% Volume Off</h3>
              <TrendingDown className="w-4 h-4 text-[#00B8AA]" />
            </div>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              Complimentary expedited temperature-controlled air freight and priority filling.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#002050] text-white shadow-md space-y-2 card-lift">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-[#5EC8E8] font-bold">TIER 4 (MASTER)</span>
              <span className="font-mono-code text-xs bg-white/10 px-2 py-0.5 rounded text-[#5EC8E8] font-bold">100+ Units</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="font-sora font-bold text-lg text-white">Custom Contract</h3>
              <Sparkles className="w-4 h-4 text-[#5EC8E8]" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              15%+ discounted rates, customized lyophilization batch sizes, and private label support.
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-3xl border border-[#E2E8EE] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-[#5B6B73] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search table by SKU, product name, or spec..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] text-xs font-inter text-[#002050] focus:bg-white transition-colors"
            />
          </div>

          <span className="text-xs font-mono-code text-[#5B6B73]">
            Displaying {filteredProducts.length} wholesale catalog SKUs
          </span>
        </div>

        {/* Sticky Header Price Table */}
        <div className="bg-white rounded-3xl border border-[#E2E8EE] overflow-hidden shadow-xs">
          <div className="overflow-x-auto max-h-[700px] overflow-y-auto">
            <table className="w-full text-left text-xs relative">
              <thead className="bg-[#002050] text-white sticky top-0 z-20 font-sora font-semibold text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">SKU</th>
                  <th className="py-3.5 px-5">Product Name</th>
                  <th className="py-3.5 px-5">Specification</th>
                  <th className="py-3.5 px-5">Purity</th>
                  <th className="py-3.5 px-5">Base Unit Price</th>
                  <th className="py-3.5 px-5">10+ Tier (5%)</th>
                  <th className="py-3.5 px-5">50+ Tier (10%)</th>
                  <th className="py-3.5 px-5 text-right">Add to Quote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8EE] font-inter">
                {groupedByCategory.map(([category, items]) => (
                  <React.Fragment key={category}>
                    {/* Category Group Divider Header */}
                    <tr className="bg-[#F4F8FA] border-y border-[#E2E8EE]">
                      <td colSpan={8} className="py-2.5 px-5 font-sora font-bold text-xs text-[#002050]">
                        <div className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-[#00B8AA]" />
                          <span>{category}</span>
                          <span className="font-mono-code text-[11px] font-normal text-[#5B6B73]">
                            ({items.length} items)
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* Category Products */}
                    {items.map(product => {
                      const isAdded = addedItemIds[product.id];
                      const tier10 = Math.round(product.price * 0.95);
                      const tier50 = Math.round(product.price * 0.9);

                      return (
                        <tr
                          key={product.id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-3 px-5 font-mono-code font-bold text-[#002050]">
                            {product.sku}
                          </td>
                          <td className="py-3 px-5">
                            <span className="font-sora font-bold text-xs text-[#002050] block">
                              {product.name}
                            </span>
                            <span className="text-[10px] text-[#5B6B73]">
                              {product.casNumber ? `CAS: ${product.casNumber}` : 'Synthetic Peptide'}
                            </span>
                          </td>
                          <td className="py-3 px-5 font-mono-code text-[#5B6B73]">
                            {product.spec}
                          </td>
                          <td className="py-3 px-5 font-mono-code text-[#00B8AA] font-semibold">
                            {product.purity}
                          </td>
                          <td className="py-3 px-5 font-mono-code font-bold text-[#002050] text-sm">
                            ${product.price}
                          </td>
                          <td className="py-3 px-5 font-mono-code text-slate-600">
                            ${tier10}
                          </td>
                          <td className="py-3 px-5 font-mono-code text-[#00B8AA] font-semibold">
                            ${tier50}
                          </td>
                          <td className="py-3 px-5 text-right">
                            <button
                              onClick={() => handleAdd(product)}
                              className={`px-3 py-1.5 rounded-full font-sora text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-2xs ${
                                isAdded
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#002050] hover:bg-[#001538] text-white active:scale-95'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3 h-3 text-white" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3 text-[#5EC8E8]" />
                                  <span>Add</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Trust Row */}
        <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5B6B73]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#00B8AA] shrink-0" />
            <span>
              All orders are governed by Biopepti strict institutional quality assurance terms. Prices subject to monthly market raw-material indexing.
            </span>
          </div>

          <Link
            to="/quote"
            className="text-xs font-sora font-bold text-[#00B8AA] hover:underline whitespace-nowrap"
          >
            Launch Interactive Quote Builder &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
