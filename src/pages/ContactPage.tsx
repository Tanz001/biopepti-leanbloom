import React, { useState, useMemo } from 'react';
import { useToast } from '../context/ToastContext';
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building2,
  Globe2,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    department: 'Wholesale Sales & Quotes',
    message: ''
  });

  // Calculate live Open/Closed status in Hong Kong Time (UTC+8)
  const hktStatus = useMemo(() => {
    try {
      const now = new Date();
      // Format to HKT hour and day of week
      const hktString = now.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
      const hktDate = new Date(hktString);
      const day = hktDate.getDay(); // 0 is Sunday, 6 is Saturday
      const hours = hktDate.getHours();

      const isWeekday = day >= 1 && day <= 5;
      const isOpenHour = hours >= 8 && hours < 20;

      const timeFormatted = hktDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      if (isWeekday && isOpenHour) {
        return { isOpen: true, label: 'Open Now', time: timeFormatted };
      } else {
        return { isOpen: false, label: 'Desk Closed', time: timeFormatted };
      }
    } catch {
      return { isOpen: true, label: 'Open Now', time: '14:30 HKT' };
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Incomplete Form', 'Please complete the required contact fields.', 'warning');
      return;
    }

    setFormSubmitted(true);
    showToast('Message Dispatched', 'A sales or QA representative will reply within 4 business hours.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F4F8FA] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] text-[#00B8AA] text-xs font-semibold font-sora shadow-2xs">
            <span className={`w-2 h-2 rounded-full ${hktStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>
              HKT Desk: {hktStatus.label} ({hktStatus.time})
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold font-sora text-[#002050] tracking-tight">
            Connect with Biopepti Wholesale Desk
          </h1>

          <p className="text-base sm:text-lg text-[#5B6B73] font-inter leading-relaxed">
            Direct communication for institutional procurement, batch chromatogram queries, custom synthesis quotes, and customs logistics.
          </p>
        </div>

        {/* 1. WHATSAPP CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Asia-Pacific Desk */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs space-y-4 card-lift flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-[11px] font-bold text-[#00B8AA] bg-[#E6F7F5] px-2.5 py-0.5 rounded-full">
                  ASIA-PACIFIC & EU
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <h3 className="font-sora font-bold text-lg text-[#002050] mt-3">
                Hong Kong Sales Desk
              </h3>
              <p className="text-xs text-[#5B6B73] mt-1 leading-relaxed">
                Wholesale bulk pricing, export customs clearance, and Asian freight routes.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2E8EE] space-y-2">
              <span className="font-mono-code font-bold text-sm text-[#002050] block">
                +852 9458 2103
              </span>
              <a
                href="https://wa.me/85294582103?text=Hello%20Biopepti%20Sales%20Desk%2C%20I%20have%20a%20wholesale%20order%20inquiry."
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full bg-[#002050] hover:bg-[#001538] text-white font-sora font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#5EC8E8]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Americas Desk */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs space-y-4 card-lift flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-[11px] font-bold text-[#00B8AA] bg-[#E6F7F5] px-2.5 py-0.5 rounded-full">
                  NORTH & SOUTH AMERICA
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <h3 className="font-sora font-bold text-lg text-[#002050] mt-3">
                California Forwarding Desk
              </h3>
              <p className="text-xs text-[#5B6B73] mt-1 leading-relaxed">
                Domestic US overnight fulfillment, corporate ACH inquiries, and accounts.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2E8EE] space-y-2">
              <span className="font-mono-code font-bold text-sm text-[#002050] block">
                +1 (415) 890-4812
              </span>
              <a
                href="https://wa.me/14158904812?text=Hello%20Biopepti%20Americas%20Desk%2C%20I%20am%20inquiring%20about%20domestic%20research%20peptide%20fulfillment."
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full bg-[#002050] hover:bg-[#001538] text-white font-sora font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#5EC8E8]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 3: Technical QA Desk */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs space-y-4 card-lift flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-[11px] font-bold text-[#00B8AA] bg-[#E6F7F5] px-2.5 py-0.5 rounded-full">
                  ANALYTICAL CHEMISTRY
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <h3 className="font-sora font-bold text-lg text-[#002050] mt-3">
                Laboratory QA Director Desk
              </h3>
              <p className="text-xs text-[#5B6B73] mt-1 leading-relaxed">
                HPLC/MS interpretation, endotoxin testing reports, and custom synthesis feasibility.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2E8EE] space-y-2">
              <span className="font-mono-code font-bold text-sm text-[#002050] block">
                qa@biopepti.com
              </span>
              <a
                href="mailto:qa@biopepti.com"
                className="w-full py-2.5 rounded-full bg-white border border-[#E2E8EE] hover:border-[#00B8AA] text-[#002050] font-sora font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#00B8AA]" />
                <span>Email Technical Team</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. CONTACT FORM & OFFICE CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E8EE] shadow-xs">
            <h2 className="font-sora font-bold text-2xl text-[#002050] mb-1">
              Send an Official Inquiry
            </h2>
            <p className="text-xs text-[#5B6B73] mb-6">
              Institutional purchase inquiries receive prioritized review by a dedicated account chemist.
            </p>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#E6F7F5] border border-[#00B8AA]/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#00B8AA] mx-auto" />
                <h3 className="font-sora font-bold text-lg text-[#002050]">Inquiry Dispatched</h3>
                <p className="text-xs text-[#5B6B73] max-w-sm mx-auto">
                  Thank you, {formData.name}. We have logged your request and our account team will contact you at {formData.email}.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-3 px-6 py-2 rounded-full bg-[#002050] text-white text-xs font-semibold"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-inter">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#002050] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Sarah Jenkins"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[#002050] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#002050] mb-1">
                      Institution / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Stanford Bio-X Center"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[#002050] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#002050] mb-1">
                      Corporate / Academic Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="s.jenkins@stanford.edu"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[#002050] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#002050] mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="text"
                      placeholder="+1 (650) 723-2300"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[#002050] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#002050] mb-1">
                    Department Routing
                  </label>
                  <select
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[#002050] font-medium"
                  >
                    <option>Wholesale Sales & Quotes</option>
                    <option>OEM & Private Label Division</option>
                    <option>Analytical Quality Control & COA Inquiry</option>
                    <option>International Logistics & Customs Clearance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#002050] mb-1">
                    Detailed Message / Protocol Specs *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details on quantities, desired delivery timeline, or specific synthesis requirements..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[#002050] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#002050] hover:bg-[#001538] text-white font-sora font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <Send className="w-3.5 h-3.5 text-[#5EC8E8] group-hover:translate-x-0.5 transition-transform" />
                  <span>Transmit Inquiry to Wholesale Desk</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Dual Office Hub Cards & Map Visual */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hong Kong Office */}
            <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#00B8AA]">
                <Building2 className="w-5 h-5" />
                <h3 className="font-sora font-bold text-base text-[#002050]">
                  Hong Kong BioHub (Global HQ)
                </h3>
              </div>
              <p className="text-xs text-[#5B6B73] leading-relaxed">
                Level 18, Two International Finance Centre, 8 Finance Street, Central, Hong Kong SAR
              </p>
              <div className="pt-2 text-[11px] font-mono-code text-[#5B6B73] space-y-1">
                <p>Synthesis Suites: Cleanroom Class 100</p>
                <p>Hours: Mon–Fri 08:00 – 20:00 (HKT)</p>
                <p className="text-[#00B8AA] font-bold">Direct Line: +852 9458 2103</p>
              </div>
            </div>

            {/* USA Office */}
            <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#00B8AA]">
                <Globe2 className="w-5 h-5" />
                <h3 className="font-sora font-bold text-base text-[#002050]">
                  Americas Logistics & Cold-Chain
                </h3>
              </div>
              <p className="text-xs text-[#5B6B73] leading-relaxed">
                Suite 400, Biotech Parkway, South San Francisco, CA 94080, USA
              </p>
              <div className="pt-2 text-[11px] font-mono-code text-[#5B6B73] space-y-1">
                <p>Cold-Chain Hub: 2-8°C & -20°C Automated Freezers</p>
                <p>Hours: Mon–Fri 08:00 – 18:00 (PST)</p>
                <p className="text-[#00B8AA] font-bold">Direct Line: +1 (415) 890-4812</p>
              </div>
            </div>

            {/* Embedded Map Graphic Visual */}
            <div className="rounded-3xl bg-[#002050] p-6 text-white text-xs space-y-3 border border-[#00B8AA]/20 shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-sora font-bold text-xs text-[#5EC8E8] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Global Dispatch Coverage
                </span>
                <span className="font-mono-code text-[10px] text-slate-400">FedEx / DHL Priority</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                All shipments utilize temperature-monitored smart sensor logging upon institutional request.
              </p>
              <div className="h-24 w-full bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center p-3 text-center">
                <span className="font-mono-code text-[11px] text-[#5EC8E8]">
                  Worldwide Transit: North America (3d) • Europe (4d) • APAC (2d)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
