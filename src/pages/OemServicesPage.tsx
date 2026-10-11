import React, { useState } from 'react';
import { VialGraphic } from '../components/ui/VialGraphic';
import { useToast } from '../context/ToastContext';
import {
  Sparkles,
  Layers,
  Box,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  ArrowRight,
  FlaskConical,
  Award
} from 'lucide-react';

export const OemServicesPage: React.FC = () => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phoneWhatsapp: '',
    productInterest: 'Weight Management Peptides (Tirzepatide / Retatrutide)',
    estimatedQuantity: '100–500 vials',
    packagingPreference: 'Custom Label + Branded 10-Vial Box',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.companyName) {
      showToast('Missing Details', 'Please provide your full name, company, and email.', 'warning');
      return;
    }

    setSubmitted(true);
    showToast('OEM Inquiry Transmitted', 'Our technical synthesis director will reply within 12 hours.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F4F8FA] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 1. HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] text-[#00B8AA] text-xs font-semibold font-sora shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00B8AA]" />
            <span>OEM & Custom Synthesis Suite</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold font-sora text-[#002050] tracking-tight">
            Your brand. Our synthesis.
          </h1>

          <p className="text-base sm:text-lg text-[#5B6B73] font-inter leading-relaxed">
            Turnkey private-label contract manufacturing, bespoke sequence synthesis, custom colored crimp caps, and institutional-grade analytical quality assurance.
          </p>
        </div>

        {/* 2. SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs space-y-3 card-lift">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-sora font-bold text-lg text-[#002050]">Private Label Solutions</h3>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              Launch your peptide brand with our proven catalog. Custom high-adhesion waterproof labels, bespoke cap colors, and tamper-evident shrink bands.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs space-y-3 card-lift">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="font-sora font-bold text-lg text-[#002050]">Custom Synthesis</h3>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              Solid-phase & liquid-phase synthesis for novel amino acid sequences, cyclizations, fluorophore tagging, D-amino acids, and fatty-acid conjugates.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs space-y-3 card-lift">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="font-sora font-bold text-lg text-[#002050]">Custom Packaging</h3>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              Rigid magnet-closure 10-vial presentation boxes, foil-stamped corporate packaging, custom foam inserts, and sterile blister sealing.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs space-y-3 card-lift">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-sora font-bold text-lg text-[#002050]">Distributor Programs</h3>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              Wholesale volume tier contracts for domestic and international distributors. Dedicated account manager and guaranteed reserve inventory.
            </p>
          </div>
        </div>

        {/* 3. BEFORE / AFTER LABEL MOCKUP VISUAL */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8EE] shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
              Packaging Transformation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sora text-[#002050] mt-1">
              From Raw Bulk to High-End Finished Goods
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6B73] mt-1">
              Elevate your research enterprise from anonymous plastic tubes to clinical-luxury vials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            {/* Standard Bulk Generic Presentation */}
            <div className="p-6 rounded-3xl bg-[#F4F8FA] border border-[#E2E8EE] text-center space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-700 font-mono-code text-xs font-bold">
                BEFORE: Generic Bulk Vial
              </span>
              <div className="h-52 flex items-center justify-center opacity-85">
                <VialGraphic
                  size={120}
                  color="#64748B"
                  accent="#94A3B8"
                  label="BATCH #481"
                  sublabel="UNBRANDED"
                  purity="STD GRADE"
                />
              </div>
              <ul className="text-xs text-[#5B6B73] space-y-1.5 text-left max-w-xs mx-auto">
                <li className="flex items-center gap-2">• Standard plain white label</li>
                <li className="flex items-center gap-2">• Basic aluminum crimp ring</li>
                <li className="flex items-center gap-2">• Generic plastic storage tray</li>
              </ul>
            </div>

            {/* Custom Branded Luxury Presentation */}
            <div className="p-6 rounded-3xl bg-radial from-[#E6F7F5] to-white border-2 border-[#00B8AA] text-center space-y-4 shadow-lg relative overflow-hidden">
              <span className="inline-block px-3 py-1 rounded-full bg-[#002050] text-[#5EC8E8] font-mono-code text-xs font-bold shadow-xs">
                AFTER: Custom Client OEM Presentation
              </span>
              <div className="h-52 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <VialGraphic
                  size={135}
                  color="#00B8AA"
                  accent="#5EC8E8"
                  label="ACME BIOTECH"
                  sublabel="PURE-RESEARCH"
                  purity="≥99.8% HPLC"
                />
              </div>
              <ul className="text-xs text-[#002050] font-medium space-y-1.5 text-left max-w-xs mx-auto">
                <li className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High-definition metallic foil label
                </li>
                <li className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Custom anodized teal cap & rubber stopper
                </li>
                <li className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Client QR Code linking to batch COA
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. PROCESS TIMELINE (6 STEPS) */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
              Production Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sora text-[#002050] mt-1">
              6-Stage OEM Fulfillment Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { num: '01', title: 'Inquiry', desc: 'Define target sequence, vial spec, cap color, and quantity.' },
              { num: '02', title: 'Sample Pack', desc: 'Pilot formulation batch produced for analytical verification.' },
              { num: '03', title: 'Label Approval', desc: 'Digital proofs of client labels and retail boxes approved.' },
              { num: '04', title: 'Production', desc: 'Automated Class 100 cleanroom vial filling and freeze-drying.' },
              { num: '05', title: 'QC & COA', desc: 'HPLC purity testing and high-res MS confirmation.' },
              { num: '06', title: 'Air Freight', desc: 'Insulated cold-chain dispatch with worldwide customs tracking.' }
            ].map(step => (
              <div
                key={step.num}
                className="p-5 rounded-3xl bg-white border border-[#E2E8EE] shadow-2xs space-y-2 card-lift"
              >
                <span className="font-mono-code text-xl font-extrabold text-[#00B8AA] block">
                  {step.num}
                </span>
                <h4 className="font-sora font-bold text-sm text-[#002050]">{step.title}</h4>
                <p className="text-[11px] text-[#5B6B73] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. MOQ & LEAD TIME INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] space-y-2">
            <div className="flex items-center gap-2 text-[#00B8AA]">
              <Award className="w-5 h-5" />
              <h3 className="font-sora font-bold text-sm text-[#002050]">Low OEM MOQ</h3>
            </div>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              Private label branding begins at just <strong>100 vials (10 boxes)</strong> per SKU for standard catalog sequences.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] space-y-2">
            <div className="flex items-center gap-2 text-[#00B8AA]">
              <Clock className="w-5 h-5" />
              <h3 className="font-sora font-bold text-sm text-[#002050]">Rapid Lead Times</h3>
            </div>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              Standard private-label orders ship within <strong>7–10 business days</strong>. Novel sequence synthesis takes <strong>14–21 days</strong>.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] space-y-2">
            <div className="flex items-center gap-2 text-[#00B8AA]">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-sora font-bold text-sm text-[#002050]">Strict Confidentiality</h3>
            </div>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              Comprehensive Non-Disclosure Agreements (NDA) executed prior to formula formulation. Your brand identity remains 100% confidential.
            </p>
          </div>
        </div>

        {/* 6. OEM INQUIRY FORM */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8EE] shadow-sm max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
              Start Your Private Label Project
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sora text-[#002050] mt-1">
              Submit OEM Technical Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6B73] mt-1">
              Our formulation team will provide a comprehensive cost proposal and label die-lines.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#E6F7F5] border border-[#00B8AA]/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#00B8AA] mx-auto" />
              <h3 className="font-sora font-bold text-lg text-[#002050]">Inquiry Received</h3>
              <p className="text-xs text-[#5B6B73] max-w-md mx-auto">
                Thank you, {formData.fullName}. Our lead peptide formulation chemist will review your requirements and reach out via {formData.email} within 12 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-6 py-2 rounded-full bg-[#002050] text-white text-xs font-semibold"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-inter">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#002050] mb-1">
                    Contact Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Campbell"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[#002050] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#002050] mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Campbell Bioscience LLC"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[#002050] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#002050] mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="david@campbellbio.com"
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
                    placeholder="+1 (415) 000-0000"
                    value={formData.phoneWhatsapp}
                    onChange={e => setFormData({ ...formData, phoneWhatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[#002050] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#002050] mb-1">
                    Peptide Family Interest
                  </label>
                  <select
                    value={formData.productInterest}
                    onChange={e => setFormData({ ...formData, productInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[#002050] font-medium"
                  >
                    <option>Weight Management Peptides (Tirzepatide / Retatrutide)</option>
                    <option>Tissue Healing & Angiogenesis (BPC-157 / TB-500)</option>
                    <option>GH Secretagogues (CJC-1295 / Ipamorelin)</option>
                    <option>Cosmetic & Copper Tripeptides (GHK-Cu)</option>
                    <option>Custom Sequence Synthesis (Novel Peptide)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#002050] mb-1">
                    Estimated Production Batch
                  </label>
                  <select
                    value={formData.estimatedQuantity}
                    onChange={e => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[#002050] font-medium"
                  >
                    <option>100–500 vials (Pilot Batch)</option>
                    <option>500–2,000 vials (Standard Distribution)</option>
                    <option>2,000–10,000 vials (Commercial Scale)</option>
                    <option>10,000+ vials (Institutional / Master Contract)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#002050] mb-1">
                  Project Scope & Specific Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Detail target concentrations, cap color preferences, box styling, or timeline..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-[#002050] focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#002050] hover:bg-[#001538] text-white font-sora font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <Send className="w-3.5 h-3.5 text-[#5EC8E8] group-hover:translate-x-0.5 transition-transform" />
                  <span>Transmit Technical OEM Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
