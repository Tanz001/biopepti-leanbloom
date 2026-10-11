import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, MessageSquare, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { totalUnits, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Quote Builder', path: '/quote' },
    { label: 'OEM Services', path: '/oem-services' },
    { label: 'COA Reports', path: '/coa-reports' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const openWhatsAppDirect = () => {
    window.open('https://wa.me/85294582103?text=Hello%20Lumora%20Labs%2C%20I%20have%20an%20inquiry%20regarding%20wholesale%20research%20peptides.', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-40 flex justify-center px-4 transition-all duration-300 pointer-events-none ${
          scrolled ? 'top-3' : 'top-5'
        }`}
      >
        <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">
          {/* Main Floating Pill Container */}
          <div className="w-full glass-nav rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-lg flex items-center justify-between border border-[#E4EAE8]/80 transition-shadow hover:shadow-xl">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-[#5EEAD4] rounded-full p-1"
              aria-label="LUMORA LABS Home"
            >
              <div className="w-9 h-9 rounded-full bg-[#0B1F2A] flex items-center justify-center text-[#5EEAD4] group-hover:scale-105 transition-transform shadow-sm">
                {/* Hexagon Molecule SVG Mark */}
                <svg
                  className="w-5 h-5 stroke-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 19 6.5 19 15.5 12 20 5 15.5 5 6.5 12 2" />
                  <circle cx="12" cy="11" r="2.5" fill="#5EEAD4" />
                </svg>
              </div>
              <div className="flex items-baseline tracking-tight">
                <span className="font-sora font-extrabold text-lg text-[#0B1F2A]">LUMORA</span>
                <span className="font-sora font-light text-lg text-[#0E9F8E] tracking-widest ml-1.5">LABS</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-[#E7F6F3] text-[#0E9F8E] font-semibold shadow-xs'
                        : 'text-[#5B6B73] hover:text-[#0B1F2A] hover:bg-black/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* WhatsApp direct chat button */}
              <button
                onClick={openWhatsAppDirect}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F2A] text-white text-xs font-semibold hover:bg-[#07131A] transition-colors border border-emerald-500/30 group shadow-xs"
                title="WhatsApp Wholesale Desk"
                aria-label="Direct WhatsApp Wholesale Desk"
              >
                <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
                <MessageSquare className="w-3.5 h-3.5 text-[#5EEAD4]" />
                <span className="hidden xl:inline">WhatsApp</span>
              </button>

              {/* Quote Cart Button */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E9F8E] hover:bg-[#0B8576] text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
                aria-label={`Open Quote Cart with ${totalUnits} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden md:inline">Quote Cart</span>
                {totalUnits > 0 && (
                  <span className="bg-[#0B1F2A] text-[#5EEAD4] font-mono-code text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center shadow-xs">
                    {totalUnits}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="lg:hidden p-2 rounded-full text-[#0B1F2A] hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Sheet */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 lg:hidden bg-[#0B1F2A]/80 backdrop-blur-md flex flex-col justify-between p-6 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto">
            {/* Header in sheet */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E4EAE8]">
              <div className="flex items-baseline">
                <span className="font-sora font-extrabold text-xl text-[#0B1F2A]">LUMORA</span>
                <span className="font-sora font-light text-xl text-[#0E9F8E] tracking-widest ml-1.5">LABS</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-slate-500 hover:text-black hover:bg-slate-100"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links list */}
            <div className="flex flex-col gap-1 py-4">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#E7F6F3] text-[#0E9F8E]'
                        : 'text-[#0B1F2A] hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E4EAE8] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsDrawerOpen(true);
                }}
                className="w-full py-3 rounded-full bg-[#0E9F8E] text-white font-sora font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Quote Cart ({totalUnits} items)</span>
              </button>

              <button
                onClick={openWhatsAppDirect}
                className="w-full py-3 rounded-full bg-[#0B1F2A] text-white font-sora font-semibold text-sm flex items-center justify-center gap-2 border border-[#5EEAD4]/20"
              >
                <MessageSquare className="w-4 h-4 text-[#5EEAD4]" />
                <span>WhatsApp Sales Desk (+852 9458 2103)</span>
              </button>

              <div className="mt-2 p-3 rounded-xl bg-[#F6F8F7] text-[11px] text-[#5B6B73] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0E9F8E] shrink-0" />
                <span>Supplied for laboratory research only. Not for human use.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
