import React, { useState, useMemo } from 'react';
import { PRODUCTS_DATA, PRODUCT_CATEGORIES } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { ProductDetailModal } from '../components/products/ProductDetailModal';
import { Product, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import {
  Search,
  LayoutGrid,
  List,
  Filter,
  Plus,
  Check,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedSpecFilter, setSelectedSpecFilter] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(prod => {
      // Category filter
      if (selectedCategory !== 'All Categories' && prod.category !== selectedCategory) {
        return false;
      }
      // Search query (name, sku, spec, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesSku = prod.sku.toLowerCase().includes(q);
        const matchesSpec = prod.spec.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesSpec && !matchesDesc) {
          return false;
        }
      }
      // Spec filter
      if (selectedSpecFilter !== 'all') {
        if (!prod.spec.toLowerCase().includes(selectedSpecFilter.toLowerCase())) {
          return false;
        }
      }
      // Price slider
      if (prod.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedSpecFilter, maxPrice, sortBy]);

  // Group filtered products by base name
  const groupedProducts = useMemo(() => {
    const map = new Map<string, Product[]>();
    filteredProducts.forEach(prod => {
      const baseName = prod.name.split('(')[0].trim();
      if (!map.has(baseName)) {
        map.set(baseName, []);
      }
      map.get(baseName)!.push(prod);
    });

    const groups: { name: string; category: ProductCategory; variants: Product[] }[] = [];
    map.forEach((variants, name) => {
      groups.push({
        name,
        category: variants[0].category,
        variants
      });
    });
    return groups;
  }, [filteredProducts]);

  // Toggle group expansion
  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const handleExpandAll = () => {
    const next: Record<string, boolean> = {};
    groupedProducts.forEach(g => {
      next[g.name] = true;
    });
    setExpandedGroups(next);
  };

  const handleCollapseAll = () => {
    setExpandedGroups({});
  };

  const handleAddVariant = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedItemIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedSpecFilter('all');
    setMaxPrice(500);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#F4F8FA] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
                Active Catalog Inventory
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold font-sora text-[#002050] mt-1">
                Wholesale Research Peptides
              </h1>
              <p className="text-xs sm:text-sm text-[#5B6B73] mt-1">
                Lyophilized sterile research vials • Guaranteed ≥99.0% purity with certified HPLC/MS.
              </p>
            </div>

            {/* Total count badge & Expand/Collapse controls */}
            <div className="flex items-center gap-3">
              <span className="font-mono-code text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-[#E2E8EE] text-[#002050] shadow-2xs">
                {filteredProducts.length} products • {groupedProducts.length} groups
              </span>
              <button
                onClick={handleExpandAll}
                className="text-xs text-[#00B8AA] hover:underline font-semibold"
              >
                Expand all
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={handleCollapseAll}
                className="text-xs text-[#5B6B73] hover:underline font-medium"
              >
                Collapse all
              </button>
            </div>
          </div>

          {/* Search Bar & Primary Category Chips */}
          <div className="bg-white p-3 sm:p-4 rounded-3xl border border-[#E2E8EE] shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-[#5B6B73] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by product name, specification, sequence, or SKU..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] text-xs sm:text-sm font-inter text-[#002050] placeholder:text-slate-400 focus:bg-white transition-colors"
                />
              </div>

              {/* Sort & View Mode Controls */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => setMobileFilterOpen(prev => !prev)}
                  className="lg:hidden px-3 py-2 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] text-xs font-semibold flex items-center gap-1.5 text-[#002050]"
                >
                  <Filter className="w-3.5 h-3.5 text-[#00B8AA]" />
                  <span>Filters</span>
                </button>

                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="px-3 py-2 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] text-xs font-semibold text-[#002050]"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                  </select>

                  <div className="flex items-center border border-[#E2E8EE] rounded-2xl bg-[#F4F8FA] p-0.5">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-xl transition-colors ${
                        viewMode === 'grid' ? 'bg-white shadow-2xs text-[#002050]' : 'text-slate-400'
                      }`}
                      title="Grid View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-xl transition-colors ${
                        viewMode === 'list' ? 'bg-white shadow-2xs text-[#002050]' : 'text-slate-400'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
              {PRODUCT_CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-[#002050] text-white font-semibold shadow-xs'
                        : 'bg-[#F4F8FA] hover:bg-slate-200 text-[#5B6B73] border border-[#E2E8EE]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar + Product Results) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Filter Sidebar */}
          <aside
            className={`lg:col-span-3 lg:sticky lg:top-24 bg-white rounded-3xl p-6 border border-[#E2E8EE] shadow-xs space-y-6 ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8EE]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#00B8AA]" />
                <h3 className="font-sora font-bold text-sm text-[#002050]">Refine Catalog</h3>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-[#00B8AA] hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Spec/Size Filter */}
            <div className="space-y-2">
              <label className="text-xs font-sora font-semibold text-[#002050] block uppercase tracking-wider">
                Vial Specification / Mass
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: 'All', val: 'all' },
                  { label: '2mg', val: '2mg' },
                  { label: '5mg', val: '5mg' },
                  { label: '10mg', val: '10mg' },
                  { label: '15mg', val: '15mg' },
                  { label: '50mg+', val: '50mg' }
                ].map(item => (
                  <button
                    key={item.val}
                    onClick={() => setSelectedSpecFilter(item.val)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-mono-code font-medium border text-center transition-colors ${
                      selectedSpecFilter === item.val
                        ? 'bg-[#E6F7F5] border-[#00B8AA] text-[#00B8AA] font-bold'
                        : 'border-[#E2E8EE] text-[#5B6B73] hover:bg-[#F4F8FA]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-sora font-semibold text-[#002050]">
                <span className="uppercase tracking-wider">Max Unit Price</span>
                <span className="font-mono-code text-[#00B8AA]">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="7"
                max="500"
                step="1"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#00B8AA] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono-code">
                <span>$7</span>
                <span>$250</span>
                <span>$500+</span>
              </div>
            </div>

            {/* Purity Guarantee Callout */}
            <div className="p-4 rounded-2xl bg-[#E6F7F5] border border-[#00B8AA]/20 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#00B8AA] font-sora font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Purity Guarantee</span>
              </div>
              <p className="text-[#002050] leading-relaxed text-[11px]">
                Every SKU is strictly synthesized in ISO 9001:2015 cGMP suites and authenticated by independent UHPLC and mass spectrometry.
              </p>
            </div>
          </aside>

          {/* Right Product Grid / List Results */}
          <main className="lg:col-span-9 space-y-6">
            {groupedProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#E2E8EE]">
                <h4 className="font-sora font-bold text-base text-[#002050]">No Matching Products Found</h4>
                <p className="text-xs text-[#5B6B73] mt-1 max-w-sm mx-auto">
                  Try adjusting your search criteria, clearing the specification filter, or resetting price bounds.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#002050] text-white font-sora text-xs font-semibold hover:bg-[#001538]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* GRID VIEW with Group Expanders */
              <div className="space-y-6">
                {groupedProducts.map(group => {
                  const isExpanded = expandedGroups[group.name] ?? true;
                  return (
                    <div
                      key={group.name}
                      className="bg-white rounded-3xl p-6 border border-[#E2E8EE] shadow-2xs space-y-4"
                    >
                      {/* Group Header */}
                      <div
                        onClick={() => toggleGroup(group.name)}
                        className="flex items-center justify-between cursor-pointer select-none group"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            className="p-1 rounded-full bg-[#F4F8FA] text-slate-500 group-hover:text-black group-hover:bg-[#E6F7F5]"
                            aria-label={`Toggle group ${group.name}`}
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-sora font-bold text-lg text-[#002050] group-hover:text-[#00B8AA] transition-colors">
                                {group.name}
                              </h3>
                              <span className="text-[11px] font-mono-code px-2 py-0.5 rounded-full bg-[#F4F8FA] border border-[#E2E8EE] text-[#5B6B73]">
                                {group.variants.length} {group.variants.length === 1 ? 'spec' : 'specs'}
                              </span>
                            </div>
                            <span className="text-xs text-[#5B6B73] font-inter">
                              {group.category}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-mono-code text-[#00B8AA] font-semibold">
                          From ${Math.min(...group.variants.map(v => v.price))} /pack
                        </span>
                      </div>

                      {/* Expanded Grid Cards */}
                      {isExpanded && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                          {group.variants.map(product => (
                            <ProductCard
                              key={product.id}
                              product={product}
                              onOpenDetails={prod => setSelectedProduct(prod)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="bg-white rounded-3xl border border-[#E2E8EE] overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F8FA] border-b border-[#E2E8EE] text-[11px] font-semibold text-[#5B6B73] uppercase tracking-wider font-sora">
                      <tr>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4">Product Formulation</th>
                        <th className="py-3 px-4">Specification</th>
                        <th className="py-3 px-4">Purity</th>
                        <th className="py-3 px-4">Wholesale Price</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8EE] font-inter">
                      {filteredProducts.map(product => {
                        const isAdded = addedItemIds[product.id];
                        return (
                          <tr
                            key={product.id}
                            onClick={() => setSelectedProduct(product)}
                            className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                          >
                            <td className="py-3.5 px-4 font-mono-code font-bold text-[#002050]">
                              {product.sku}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-sora font-bold text-xs text-[#002050] block">
                                {product.name}
                              </span>
                              <span className="text-[11px] text-[#5B6B73] line-clamp-1">
                                {product.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono-code text-[#5B6B73]">
                              {product.spec}
                            </td>
                            <td className="py-3.5 px-4 font-mono-code text-[#00B8AA] font-semibold">
                              {product.purity}
                            </td>
                            <td className="py-3.5 px-4 font-mono-code font-bold text-[#002050] text-sm">
                              ${product.price}
                              <span className="text-[10px] text-slate-400 font-normal"> /pack</span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={e => handleAddVariant(product, e)}
                                className={`px-3 py-1.5 rounded-full font-sora text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                                  isAdded
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-[#002050] hover:bg-[#001538] text-white'
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
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          relatedProducts={PRODUCTS_DATA.filter(
            p => p.category === selectedProduct.category && p.id !== selectedProduct.id
          )}
          onSelectProduct={prod => setSelectedProduct(prod)}
        />
      )}
    </div>
  );
};
