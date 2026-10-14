import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Award, FileText, CheckCircle2, MessageSquare, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';

export const Footer: React.FC = () => {
  const { products } = useCatalog();
  const catalogCount = products.length;
  return (
    <footer className="bg-[#002050] text-white pt-16 pb-12 border-t border-[#00B8AA]/20 relative overflow-hidden">
      {/* Background Subtle Mesh Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00B8AA]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#5EC8E8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Research Use Only Warning Strip */}
        <div className="mb-14 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="p-2 rounded-xl bg-amber-500/20 text-[#F5B94A] shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className="font-bold text-[#F5B94A] font-sora mr-2">RESEARCH USE ONLY:</span>
            All peptide compounds and reagents supplied by Biopepti are intended strictly for in vitro laboratory research, analytical calibration, and preclinical experimental assays. They are not intended for human consumption, medical therapeutics, or veterinary use.
          </div>
        </div>

        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Blurb */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center p-1.5 shadow-sm">
                <img src="/logo-mark.png" alt="Biopepti" className="h-full w-auto object-contain" />
              </div>
              <span className="font-sora font-extrabold text-xl text-white tracking-tight">Biopepti</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-inter">
              High-purity peptide synthesis, bulk lyophilized vials, and private-label OEM manufacturing for institutions, universities, and pharmaceutical research teams worldwide.
            </p>
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 text-[11px] font-mono-code text-slate-300 border border-slate-700">
                <CheckCircle2 className="w-3 h-3 text-[#5EC8E8]" /> ISO 9001:2015
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 text-[11px] font-mono-code text-slate-300 border border-slate-700">
                <CheckCircle2 className="w-3 h-3 text-[#5EC8E8]" /> cGMP Standard
              </span>
            </div>
          </div>

          {/* Column 2: Navigation & Catalog */}
          <div>
            <h4 className="text-xs font-semibold text-[#5EC8E8] uppercase tracking-wider font-sora mb-4">
              Catalog & Workflow
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Product Catalog ({catalogCount} SKUs)
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Wholesale Price List & CSV
                </Link>
              </li>
              <li>
                <Link to="/quote" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Interactive Quote Builder</span>
                  <span className="text-[10px] bg-[#00B8AA] text-white px-1.5 py-0.2 rounded font-semibold">Core</span>
                </Link>
              </li>
              <li>
                <Link to="/oem-services" className="hover:text-white transition-colors">
                  Private Label & OEM Synthesis
                </Link>
              </li>
              <li>
                <Link to="/coa-reports" className="hover:text-white transition-colors">
                  Batch COA Library & Verification
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Biopepti
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Desk */}
          <div>
            <h4 className="text-xs font-semibold text-[#5EC8E8] uppercase tracking-wider font-sora mb-4">
              Wholesale Sales Desk
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#5EC8E8] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500 font-mono-code">WHATSAPP ASIA-PACIFIC</span>
                  <a
                    href="https://wa.me/85294582103"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:text-[#5EC8E8] font-mono-code transition-colors"
                  >
                    +852 9458 2103
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#5EC8E8] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500 font-mono-code">WHATSAPP AMERICAS</span>
                  <a
                    href="https://wa.me/14158904812"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:text-[#5EC8E8] font-mono-code transition-colors"
                  >
                    +1 (415) 890-4812
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#5EC8E8] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-500 font-mono-code">SECURE DISPATCH INQUIRIES</span>
                  <a
                    href="mailto:wholesale@biopepti.com"
                    className="text-white hover:text-[#5EC8E8] transition-colors"
                  >
                    wholesale@biopepti.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Offices & Logistics */}
          <div>
            <h4 className="text-xs font-semibold text-[#5EC8E8] uppercase tracking-wider font-sora mb-4">
              Dual Logistics Hubs
            </h4>
            <div className="space-y-4 text-xs text-slate-400 leading-relaxed">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-1.5 font-semibold text-white font-sora mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#5EC8E8]" />
                  <span>Hong Kong Biotech Center</span>
                </div>
                <p className="text-slate-400">
                  Level 18, Two International Finance Centre, Central, Hong Kong SAR
                </p>
                <span className="inline-block mt-1 text-[11px] text-[#00B8AA] font-mono-code">
                  Asia-Pacific Production & QC Hub
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-1.5 font-semibold text-white font-sora mb-1">
                  <Globe className="w-3.5 h-3.5 text-[#5EC8E8]" />
                  <span>North American Forwarding</span>
                </div>
                <p className="text-slate-400">
                  Suite 400, Biotech Parkway, South San Francisco, CA 94080, USA
                </p>
                <span className="inline-block mt-1 text-[11px] text-[#00B8AA] font-mono-code">
                  North America Express Fulfillment
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Bar */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 border-b border-slate-800/80">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#5EC8E8]" /> USP Grade Lyophilization
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#5EC8E8]" /> Independent HPLC & MS Validation
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#5EC8E8]" /> Endotoxin Tested (&lt;0.05 EU/mg)
            </span>
          </div>
          <div className="text-slate-500 font-mono-code text-[11px]">
            HOURS: MON - FRI 08:00 - 20:00 (HKT UTC+8)
          </div>
        </div>

        {/* Bottom copyright & legal links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Biopepti. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about#privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about#terms" className="hover:text-slate-300 transition-colors">
              Terms of Supply
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Institutional Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
