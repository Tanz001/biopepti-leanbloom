import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuoteCartDrawer } from './components/layout/QuoteCartDrawer';
import { ToastContainer } from './components/ui/ToastContainer';
import { ScrollToTop } from './components/layout/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { PricingPage } from './pages/PricingPage';
import { QuoteBuilderPage } from './pages/QuoteBuilderPage';
import { OemServicesPage } from './pages/OemServicesPage';
import { CoaReportsPage } from './pages/CoaReportsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#F6F8F7] text-[#0B1F2A] font-inter">
            {/* Sticky Floating Navbar */}
            <Navbar />

            {/* Global Slide-In Quote Cart Drawer */}
            <QuoteCartDrawer />

            {/* Page Routes */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/quote" element={<QuoteBuilderPage />} />
                <Route path="/oem-services" element={<OemServicesPage />} />
                <Route path="/coa-reports" element={<CoaReportsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            {/* Footer with Global Research Disclaimer */}
            <Footer />

            {/* Global Toast Notifications */}
            <ToastContainer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ToastProvider>
  );
}
