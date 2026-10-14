import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { ProductDetailModal } from '../components/products/ProductDetailModal';
import { VialGraphic } from '../components/ui/VialGraphic';
import { Product } from '../types';
import { useCatalog } from '../context/CatalogContext';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  FileCheck2,
  Globe2,
  MessageSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  FlaskConical,
  Database,
  Building2,
  Download
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, loading } = useCatalog();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const productRailRef = useRef<HTMLDivElement>(null);

  const catalogCount = products.length;

  // Prefer featured items from admin; otherwise show latest active SKUs
  const featuredProducts = useMemo(() => {
    const featured = products.filter((p) => p.featured);
    const source = featured.length > 0 ? featured : products;
    return source.slice(0, 12);
  }, [products]);

  const scrollProducts = (direction: 'left' | 'right') => {
    const rail = productRailRef.current;
    if (!rail) return;
    const amount = Math.min(rail.clientWidth * 0.85, 360);
    rail.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const faqs = [
    {
      q: 'What are the international shipping terms and cold-chain protection?',
      a: 'We ship worldwide via FedEx Priority and DHL Cold-Chain Express. All lyophilized peptide vials are packed in custom insulated styrofoam containers with thermal cooling packs. Dispatch occurs within 24â€“48 hours for in-stock SKUs, with typical transit times of 3â€“5 business days to North America and Europe.'
    },
    {
      q: 'What is the Minimum Order Quantity (MOQ) for wholesale catalog items?',
      a: 'Our standard wholesale catalog MOQ is 1 box (typically 10 vials per SKU). Tiered discounts begin at 10 boxes (5% discount), 50 boxes (10% discount), and custom enterprise contractual pricing for master distributors ordering 100+ boxes.'
    },
    {
      q: 'What payment methods do you accept for wholesale orders?',
      a: 'We support international bank wire transfers (T/T), corporate ACH, secure cryptocurrency payments (USDT / USDC / BTC), and major credit cards for verified institutional and corporate accounts.'
    },
    {
      q: 'How do you verify purity and are COA reports authentic?',
      a: 'Every production batch undergoes dual testing: analytical Reverse-Phase UHPLC for purity (>99% guaranteed) and High-Resolution Mass Spectrometry (HRMS/ESI-MS) for molecular identity. COA reports with real chromatograms are freely downloadable via our COA portal or with every shipped batch.'
    },
    {
      q: 'Do you provide private-label OEM, custom packaging, and vial crimping?',
      a: 'Yes. Through our OEM Division, we provide complete white-label and private-label manufacturing: custom vial cap colors, specialized flip-off labels, multi-vial custom rigid boxes, and custom sequence peptide synthesis from milligram to multi-kilogram scale.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F8FA]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-mesh-soft">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-16 w-[28rem] h-[28rem] rounded-full bg-[#00B8AA]/10 blur-3xl" />
          <div className="absolute top-20 right-0 w-[22rem] h-[22rem] rounded-full bg-[#0084D1]/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Hero Left */}
            <div className="lg:col-span-7 space-y-7">
              <div className="animate-rise flex items-center gap-3">
                <img src="/logo-mark.png" alt="" className="h-12 w-auto object-contain" />
                <div>
                  <p className="font-sora font-extrabold text-2xl sm:text-3xl text-[#002050] tracking-tight leading-none">
                    Biopepti
                  </p>
                  <p className="text-xs font-mono-code text-[#00B8AA] font-semibold mt-1 tracking-wide">
                    WHOLESALE RESEARCH PEPTIDES
                  </p>
                </div>
              </div>

              <h1 className="animate-rise-delay-1 text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-[#002050] leading-[1.1] tracking-tight font-sora max-w-xl">
                Pure kits. Clear pricing. Built for wholesale buyers.
              </h1>

              <p className="animate-rise-delay-2 text-base sm:text-lg text-[#5B6B73] max-w-xl font-inter leading-relaxed">
                {catalogCount} HPLC/MS-verified SKUs with instant quotations and cold-chain dispatch worldwide.
              </p>

              <div className="animate-rise-delay-2 flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/products"
                  className="px-7 py-3.5 rounded-full bg-[#002050] hover:bg-[#001538] text-white font-sora font-semibold text-sm flex items-center gap-2 group transition-all shadow-md active:scale-95"
                >
                  <span>Browse Catalog</span>
                  <ArrowRight className="w-4 h-4 text-[#5EC8E8] group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/quote"
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#002050] font-sora font-semibold text-sm border border-[#E2E8EE] transition-all hover:border-[#00B8AA]"
                >
                  Build a Quote
                </Link>
              </div>

              <div className="animate-rise-delay-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#5B6B73] font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00B8AA]" />
                  â‰¥99% purity kits
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00B8AA]" />
                  Batch COA available
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00B8AA]" />
                  OEM / private label
                </span>
              </div>
            </div>

            {/* Hero Right visual */}
            <div className="lg:col-span-5 relative flex items-center justify-center animate-rise-delay-2">
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-br from-[#00B8AA]/25 via-[#5EC8E8]/15 to-[#0084D1]/20 rounded-full blur-3xl -z-10" />

              <div className="relative w-full max-w-sm">
                <div className="animate-float-soft rounded-[2rem] bg-white/90 border border-[#E2E8EE] shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
                  <div className="h-56 sm:h-64 rounded-3xl bg-gradient-to-b from-[#E6F7F5] via-white to-[#F4F8FA] flex items-center justify-center border border-[#E2E8EE]/70">
                    <VialGraphic size={140} color="#00B8AA" label="BIOPEPTI" sublabel="TR15" purity="â‰¥99%" />
                  </div>
                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="font-mono-code text-[11px] font-bold text-[#00B8AA]">TR15 Â· 15mgÃ—10</p>
                      <h3 className="font-sora font-bold text-lg text-[#002050]">Tirzepatide</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wider text-[#5B6B73] font-semibold">Kit price</p>
                      <p className="font-mono-code font-bold text-xl text-[#002050]">$59</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-3 sm:-left-6 top-10 w-28 sm:w-32 rounded-2xl bg-white border border-[#E2E8EE] shadow-lg p-3 -rotate-6">
                  <VialGraphic size={56} color="#00B8AA" label="BIO" sublabel="BC10" purity="â‰¥99%" />
                  <p className="mt-1 font-mono-code text-[10px] text-[#5B6B73]">BPC-157</p>
                  <p className="font-sora font-bold text-xs text-[#002050]">$67</p>
                </div>

                <div className="absolute -right-2 sm:-right-5 bottom-8 w-28 sm:w-32 rounded-2xl bg-white border border-[#E2E8EE] shadow-lg p-3 rotate-6">
                  <VialGraphic size={56} color="#0084D1" label="BIO" sublabel="CU100" purity="â‰¥99%" />
                  <p className="mt-1 font-mono-code text-[10px] text-[#5B6B73]">GHK-Cu</p>
                  <p className="font-sora font-bold text-xs text-[#002050]">$52</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="py-8 bg-white border-y border-[#E2E8EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] flex items-center justify-center text-[#00B8AA] shrink-0">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono-code text-2xl sm:text-3xl font-extrabold text-[#002050] block">{catalogCount}</span>
                <span className="text-xs text-[#5B6B73] font-medium">Catalog SKUs</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] flex items-center justify-center text-[#00B8AA] shrink-0">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono-code text-2xl sm:text-3xl font-extrabold text-[#002050] block">61</span>
                <span className="text-xs text-[#5B6B73] font-medium">COA Records Online</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] flex items-center justify-center text-[#00B8AA] shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <span className="font-sora text-base sm:text-lg font-bold text-[#002050] block">OEM Label</span>
                <span className="text-xs text-[#5B6B73] font-medium">Full Custom Branding</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] flex items-center justify-center text-[#00B8AA] shrink-0">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <span className="font-sora text-base sm:text-lg font-bold text-[#002050] block">PDF Quotation</span>
                <span className="text-xs text-[#5B6B73] font-medium">Instant Export Engine</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPANY PROFILE ("Serving Global Research") */}
      <section className="py-20 bg-[#F4F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8EE] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
                  Global Infrastructure
                </span>
                <h2 className="text-3xl font-bold font-sora text-[#002050]">
                  Serving Global Research with Dual Continental Fulfillment
                </h2>
                <p className="text-sm text-[#5B6B73] leading-relaxed font-inter">
                  Biopepti was founded to bridge the gap between industrial peptide synthesis facilities and research procurement teams. Operating dual logistics and customer hubs in the United States and Hong Kong, we provide seamless customs clearance, rapid cold-chain transport, and institutional batch reliability.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE]">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-[#00B8AA]" />
                      <span className="font-sora font-bold text-xs text-[#002050]">Hong Kong SAR</span>
                    </div>
                    <p className="text-[11px] text-[#5B6B73]">
                      Central BioHub: Primary API synthesis, cleanroom automated vial filling, HPLC/MS certification.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE]">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe2 className="w-4 h-4 text-[#00B8AA]" />
                      <span className="font-sora font-bold text-xs text-[#002050]">United States Hub</span>
                    </div>
                    <p className="text-[11px] text-[#5B6B73]">
                      South San Francisco, CA: Western hemisphere warehousing, client services, expedited FedEx freight.
                    </p>
                  </div>
                </div>
              </div>

              {/* World Map Dot Graphic */}
              <div className="lg:col-span-6 relative flex items-center justify-center p-6 bg-radial from-[#E6F7F5] to-[#F4F8FA] rounded-2xl border border-[#E2E8EE]">
                <div className="w-full max-w-lg aspect-video relative flex items-center justify-center">
                  <svg viewBox="0 0 800 450" className="w-full h-full opacity-35" fill="#002050">
                    {/* Simplified world continent dot matrices */}
                    <circle cx="180" cy="160" r="14" fill="#CBD5E1" />
                    <circle cx="210" cy="180" r="28" fill="#CBD5E1" />
                    <circle cx="250" cy="190" r="22" fill="#CBD5E1" />
                    <circle cx="280" cy="240" r="18" fill="#CBD5E1" />
                    <circle cx="420" cy="150" r="24" fill="#CBD5E1" />
                    <circle cx="450" cy="190" r="32" fill="#CBD5E1" />
                    <circle cx="480" cy="270" r="22" fill="#CBD5E1" />
                    <circle cx="600" cy="180" r="42" fill="#CBD5E1" />
                    <circle cx="650" cy="220" r="36" fill="#CBD5E1" />
                    <circle cx="680" cy="330" r="24" fill="#CBD5E1" />
                  </svg>

                  {/* USA Hub Marker */}
                  <div className="absolute top-[35%] left-[24%] flex flex-col items-center">
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B8AA] opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-[#002050] border-2 border-[#5EC8E8]" />
                    </span>
                    <span className="mt-1 px-2 py-0.5 rounded bg-[#002050] text-white font-mono-code text-[10px] font-bold shadow-xs">
                      USA Hub (San Francisco)
                    </span>
                  </div>

                  {/* Hong Kong Hub Marker */}
                  <div className="absolute top-[48%] left-[72%] flex flex-col items-center">
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5EC8E8] opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00B8AA] border-2 border-white" />
                    </span>
                    <span className="mt-1 px-2 py-0.5 rounded bg-[#00B8AA] text-white font-mono-code text-[10px] font-bold shadow-xs">
                      Hong Kong Global HQ
                    </span>
                  </div>

                  {/* Connecting arc dashed line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 450">
                    <path
                      d="M 230 170 Q 480 60 610 220"
                      fill="none"
                      stroke="#00B8AA"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      strokeOpacity="0.8"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR STORY & TIMELINE */}
      <section className="py-20 bg-white border-b border-[#E2E8EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Story Text & Counters */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
                A Decade of Innovation
              </span>
              <h2 className="text-3xl font-bold font-sora text-[#002050]">
                From Boutique Synthesis to Global Wholesale Leader
              </h2>
              <p className="text-sm text-[#5B6B73] leading-relaxed font-inter">
                Founded by organic chemists and analytical biochemists, Biopepti started with one clear mandate: bring clinical-grade transparency and modern software efficiency to wholesale peptide supply.
              </p>

              {/* 4 Big Counters */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE]">
                  <span className="font-mono-code text-3xl font-bold text-[#002050] block">10+</span>
                  <span className="text-xs text-[#5B6B73] font-medium">Years in Operation</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE]">
                  <span className="font-mono-code text-3xl font-bold text-[#002050] block">500+</span>
                  <span className="text-xs text-[#5B6B73] font-medium">Institutional Clients</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE]">
                  <span className="font-mono-code text-3xl font-bold text-[#002050] block">60+</span>
                  <span className="text-xs text-[#5B6B73] font-medium">Stock Products</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE]">
                  <span className="font-mono-code text-3xl font-bold text-[#002050] block">40+</span>
                  <span className="text-xs text-[#5B6B73] font-medium">Countries Served</span>
                </div>
              </div>
            </div>

            {/* Right Vertical Timeline */}
            <div className="lg:col-span-7">
              <div className="relative pl-8 sm:pl-10 space-y-8 before:absolute before:left-3.5 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8EE]">
                {[
                  {
                    year: '2015',
                    title: 'Synthesis Laboratory Founded',
                    desc: 'Initial custom peptide facility launched with 4 microwave-assisted peptide synthesizers.'
                  },
                  {
                    year: '2017',
                    title: 'Catalog Expansion & cGMP Cleanrooms',
                    desc: 'Standardized our first 30 wholesale catalog SKUs and commissioned Class 100 sterile filling rooms.'
                  },
                  {
                    year: '2019',
                    title: 'Hong Kong International Office',
                    desc: 'Opened our global trading and logistics desk in Central, Hong Kong to support Pan-Asian & EU exports.'
                  },
                  {
                    year: '2021',
                    title: 'Capacity Upgrade (Kilogram Scale)',
                    desc: 'Expanded lyophilization suite with 6 industrial freeze-dryers, handling up to 50,000 vials/month.'
                  },
                  {
                    year: '2023',
                    title: 'Global Partner Network & US Forwarding',
                    desc: 'Established cold-chain forwarding facility in California to guarantee 3-day delivery across the Americas.'
                  },
                  {
                    year: '2025',
                    title: 'Continuous Innovation & Automated Quote OS',
                    desc: 'Deployed real-time HPLC batch verification and our instant B2B quotation platform.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle marker */}
                    <div className="absolute -left-8 sm:-left-10 top-1 w-5 h-5 rounded-full bg-white border-2 border-[#00B8AA] flex items-center justify-center group-hover:bg-[#00B8AA] transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00B8AA] group-hover:bg-white" />
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] group-hover:border-[#00B8AA]/40 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono-code text-xs font-bold text-[#00B8AA] bg-[#E6F7F5] px-2 py-0.5 rounded">
                          {item.year}
                        </span>
                        <h4 className="font-sora font-bold text-sm text-[#002050]">{item.title}</h4>
                      </div>
                      <p className="text-xs text-[#5B6B73] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "OPERATING SYSTEM" SECTION */}
      <section className="py-20 bg-[#F4F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
              The Biopepti Platform
            </span>
            <h2 className="text-3xl font-bold font-sora text-[#002050] mt-1">
              Built Like an Operating System for Wholesale Peptide Buyers
            </h2>
            <p className="text-sm text-[#5B6B73] mt-2">
              Three synchronized layers designed to eliminate procurement friction, delays, and quality uncertainty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 01 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8EE] card-lift shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="font-mono-code text-4xl font-extrabold text-[#E6F7F5] text-stroke block mb-4">
                  01
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center mb-4">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-bold text-xl text-[#002050] mb-2">Catalog Products</h3>
                <p className="text-xs text-[#5B6B73] leading-relaxed">
                  {catalogCount} standardized, inventory-backed SKUs. Constant stock of high-demand metabolic, recovery, and neuro-peptide sequences with verified purity.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E2E8EE]">
                <Link
                  to="/products"
                  className="text-xs font-sora font-bold text-[#00B8AA] hover:underline flex items-center gap-1"
                >
                  <span>Explore catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 02 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8EE] card-lift shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="font-mono-code text-4xl font-extrabold text-[#E6F7F5] text-stroke block mb-4">
                  02
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-bold text-xl text-[#002050] mb-2">Quote Workflow</h3>
                <p className="text-xs text-[#5B6B73] leading-relaxed">
                  Interactive multi-tier pricing calculator with automated discounts, real-time shipping estimates, PDF export, and instant WhatsApp dispatch.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E2E8EE]">
                <Link
                  to="/quote"
                  className="text-xs font-sora font-bold text-[#00B8AA] hover:underline flex items-center gap-1"
                >
                  <span>Launch Quote Builder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 03 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8EE] card-lift shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="font-mono-code text-4xl font-extrabold text-[#E6F7F5] text-stroke block mb-4">
                  03
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-bold text-xl text-[#002050] mb-2">Documentation</h3>
                <p className="text-xs text-[#5B6B73] leading-relaxed">
                  Every vial traceable to raw chromatograms and mass spectra. Search batch numbers online, download verified COA certificates, and verify compliance.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E2E8EE]">
                <Link
                  to="/coa-reports"
                  className="text-xs font-sora font-bold text-[#00B8AA] hover:underline flex items-center gap-1"
                >
                  <span>Verify batch COA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS â€” horizontal rail */}
      <section className="py-16 sm:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
                Catalog Highlights
              </span>
              <h2 className="text-3xl font-bold font-sora text-[#002050] mt-1">
                Featured research kits
              </h2>
              <p className="text-sm text-[#5B6B73] mt-1 max-w-lg">
                Scroll through top wholesale SKUs, then open the full {catalogCount}-item catalog.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollProducts('left')}
                className="w-10 h-10 rounded-full border border-[#E2E8EE] bg-white hover:bg-[#F4F8FA] text-[#002050] flex items-center justify-center transition-colors"
                aria-label="Scroll products left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollProducts('right')}
                className="w-10 h-10 rounded-full border border-[#E2E8EE] bg-white hover:bg-[#F4F8FA] text-[#002050] flex items-center justify-center transition-colors"
                aria-label="Scroll products right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <Link
                to="/products"
                className="ml-1 px-5 py-2.5 rounded-full bg-[#002050] hover:bg-[#001538] text-white text-xs font-sora font-semibold flex items-center gap-2 transition-all shadow-xs"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#5EC8E8]" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

          <div
            ref={productRailRef}
            className="product-rail hide-scrollbar flex gap-5 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 max-w-7xl mx-auto"
          >
            {loading && (
              <div className="w-full py-16 text-center text-sm text-[#5B6B73]">
                Loading catalog…
              </div>
            )}

            {!loading && featuredProducts.length === 0 && (
              <div className="w-full py-16 text-center text-sm text-[#5B6B73]">
                No products yet. Add active products in the admin panel.
              </div>
            )}

            {featuredProducts.map(product => (
              <div key={product.id} className="w-[280px] sm:w-[300px] shrink-0">
                <ProductCard
                  product={product}
                  onOpenDetails={prod => setSelectedProduct(prod)}
                />
              </div>
            ))}

            {featuredProducts.length > 0 && (
            <Link
              to="/products"
              className="w-[220px] sm:w-[240px] shrink-0 rounded-3xl border border-dashed border-[#00B8AA]/40 bg-[#F4F8FA] hover:bg-[#E6F7F5] transition-colors flex flex-col items-center justify-center gap-3 p-6 text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-[#002050] text-[#5EC8E8] flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div>
                <p className="font-sora font-bold text-sm text-[#002050]">View all products</p>
                <p className="text-xs text-[#5B6B73] mt-1">{catalogCount} SKUs in catalog</p>
              </div>
            </Link>
            )}
          </div>
        </div>
      </section>

      {/* 7. BUYER WORKFLOW (3 Horizontal Steps) */}
      <section className="py-20 bg-[#F4F8FA] border-y border-[#E2E8EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
              Procurement Process
            </span>
            <h2 className="text-3xl font-bold font-sora text-[#002050] mt-1">
              Seamless 3-Step Wholesale Ordering
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8EE] text-center card-lift relative">
              <div className="w-14 h-14 rounded-2xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center mx-auto mb-5 font-mono-code font-bold text-lg">
                01
              </div>
              <h3 className="font-sora font-bold text-lg text-[#002050] mb-2">Select Products</h3>
              <p className="text-xs text-[#5B6B73] leading-relaxed">
                Choose pure lyophilized formulations, vial quantities, and specifications directly from our live stock catalog.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8EE] text-center card-lift relative">
              <div className="w-14 h-14 rounded-2xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center mx-auto mb-5 font-mono-code font-bold text-lg">
                02
              </div>
              <h3 className="font-sora font-bold text-lg text-[#002050] mb-2">Build Pricing</h3>
              <p className="text-xs text-[#5B6B73] leading-relaxed">
                Calculate volume discounts, add shipping destination, apply tax exemptions, and configure custom notes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8EE] text-center card-lift relative">
              <div className="w-14 h-14 rounded-2xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center mx-auto mb-5 font-mono-code font-bold text-lg">
                03
              </div>
              <h3 className="font-sora font-bold text-lg text-[#002050] mb-2">Export Quotation</h3>
              <p className="text-xs text-[#5B6B73] leading-relaxed">
                Download a branded PDF quote with institutional wire details or transmit directly to our sales desk via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. QUOTE BUILDER CTA BANNER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-mesh-dark text-white p-8 sm:p-14 border border-[#00B8AA]/30 shadow-2xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00B8AA]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-[#5EC8E8]/10 text-[#5EC8E8] text-xs font-mono-code font-semibold border border-[#5EC8E8]/20">
                  INSTANT QUOTATION ENGINE
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-sora text-white leading-tight">
                  Ready to Configure Your Wholesale Research Order?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                  Try our full-featured Quote Builder. Calculate live tier discounts, specify shipping destinations, generate compliant A4 quotation PDFs, and dispatch inquiries in under 60 seconds.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    to="/quote"
                    className="px-8 py-3.5 rounded-full bg-[#00B8AA] hover:bg-[#009688] text-white font-sora font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <span>Open Quote Builder</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>

                  <Link
                    to="/oem-services"
                    className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-sora font-semibold text-xs border border-white/20 transition-colors"
                  >
                    Custom OEM & Private Label
                  </Link>
                </div>
              </div>

              {/* Mini animated mockup UI preview */}
              <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-xs shadow-xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="font-mono-code text-[11px] text-slate-300 ml-2">Q-0IC5LUL2.pdf</span>
                  </div>
                  <span className="font-mono-code text-[11px] text-[#5EC8E8]">AUTHENTICATED</span>
                </div>

                <div className="space-y-2 font-mono-code text-[11px]">
                  <div className="p-2 rounded bg-black/20 flex justify-between">
                    <span className="text-slate-300">TR15 Tirzepatide (Qty: 20)</span>
                    <span className="text-[#5EC8E8]">$1,180</span>
                  </div>
                  <div className="p-2 rounded bg-black/20 flex justify-between">
                    <span className="text-slate-300">BC10 BPC-157 (Qty: 10)</span>
                    <span className="text-[#5EC8E8]">$670</span>
                  </div>
                  <div className="p-2 rounded bg-black/20 flex justify-between">
                    <span className="text-slate-300">Volume Discount (5%)</span>
                    <span className="text-emerald-400">-$93</span>
                  </div>
                  <div className="p-2 rounded bg-white/10 flex justify-between font-bold text-white">
                    <span>Grand Total:</span>
                    <span className="text-[#5EC8E8]">$1,757 USD</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-inter">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5EC8E8]" /> Ready to export
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-20 bg-[#F4F8FA] border-t border-[#E2E8EE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
              Wholesale Knowledge Base
            </span>
            <h2 className="text-3xl font-bold font-sora text-[#002050] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#E2E8EE] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-sora font-semibold text-sm text-[#002050] flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#00B8AA] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5B6B73] leading-relaxed font-inter border-t border-[#E2E8EE]/60 bg-[#F7FAFC]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA BAND WITH WHATSAPP */}
      <section className="py-14 bg-[#002050] text-white border-t border-[#00B8AA]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-sora font-bold text-xl text-white">
              Speak with a Wholesale Account Chemist Today
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Immediate response for institutional quotes, customs logistics, and custom synthesis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/85294582103"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-[#00B8AA] hover:bg-[#009688] text-white font-sora font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-[#5EC8E8]" />
              <span>WhatsApp Sales (+852 9458 2103)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          relatedProducts={products.filter(
            p => p.category === selectedProduct.category && p.id !== selectedProduct.id
          )}
          onSelectProduct={prod => setSelectedProduct(prod)}
        />
      )}
    </div>
  );
};
