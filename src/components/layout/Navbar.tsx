import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

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
    { label: 'Products', path: '/products' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Quote Builder', path: '/quote' },
    { label: 'OEM', path: '/oem-services' },
    { label: 'COA', path: '/coa-reports' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-40 flex justify-center px-4 transition-all duration-300 pointer-events-none ${
          scrolled ? 'top-3' : 'top-5'
        }`}
      >
        <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">
          {/* Main Floating Pill Container */}
          <div className="w-full glass-nav rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-lg flex items-center justify-between border border-[#E2E8EE]/80 transition-shadow hover:shadow-xl">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-[#5EC8E8] rounded-full p-1"
              aria-label="Biopepti Home"
            >
              <img
                src="/logo-mark.png"
                alt=""
                className="h-11 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
              />
              <span className="font-sora font-extrabold text-lg sm:text-xl text-[#002050] tracking-tight">
                Biopepti
              </span>
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
                        ? 'bg-[#E6F7F5] text-[#00B8AA] font-semibold shadow-xs'
                        : 'text-[#5B6B73] hover:text-[#002050] hover:bg-black/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Quote Cart Button */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8AA] hover:bg-[#009688] text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
                aria-label={`Open Quote Cart with ${totalUnits} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden md:inline">Quote Cart</span>
                {totalUnits > 0 && (
                  <span className="bg-[#002050] text-[#5EC8E8] font-mono-code text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center shadow-xs">
                    {totalUnits}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="lg:hidden p-2 rounded-full text-[#002050] hover:bg-slate-100 transition-colors"
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
          className="fixed inset-0 z-50 lg:hidden bg-[#002050]/80 backdrop-blur-md flex flex-col justify-between p-6 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto">
            {/* Header in sheet */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8EE]">
              <div className="flex items-center gap-2.5">
                <img src="/logo-mark.png" alt="" className="h-8 w-auto object-contain" />
                <span className="font-sora font-extrabold text-xl text-[#002050]">Biopepti</span>
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
                        ? 'bg-[#E6F7F5] text-[#00B8AA]'
                        : 'text-[#002050] hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E2E8EE] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsDrawerOpen(true);
                }}
                className="w-full py-3 rounded-full bg-[#00B8AA] text-white font-sora font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Quote Cart ({totalUnits} items)</span>
              </button>

              <div className="mt-2 p-3 rounded-xl bg-[#F4F8FA] text-[11px] text-[#5B6B73] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00B8AA] shrink-0" />
                <span>Supplied for laboratory research only. Not for human use.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
