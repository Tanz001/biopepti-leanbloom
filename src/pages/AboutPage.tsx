import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Globe2,
  FlaskConical,
  Microscope,
  FileText,
  Users,
  MapPin
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elem = document.querySelector(location.hash);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#F4F8FA] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 1. HERO / MISSION */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] text-[#00B8AA] text-xs font-semibold font-sora shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00B8AA]" />
            <span>Biochemical Standards & Synthesis Heritage</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold font-sora text-[#002050] tracking-tight">
            Setting the Benchmark for Research Peptide Integrity
          </h1>

          <p className="text-base sm:text-lg text-[#5B6B73] font-inter leading-relaxed">
            Biopepti was founded to eliminate the quality ambiguity that has historically plagued the peptide supply sector. We operate fully transparent cGMP synthesis suites, independent analytical testing, and cold-chain forwarding.
          </p>
        </div>

        {/* 2. THREE CORE PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-[#E2E8EE] space-y-3 card-lift shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="font-sora font-bold text-xl text-[#002050]">Analytical Transparency</h3>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              We never ship peptides without corresponding raw UHPLC and mass spectrometry scans. Every buyer has real-time access to the chromatograms matching their specific lot number.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E2E8EE] space-y-3 card-lift shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-sora font-bold text-xl text-[#002050]">Purity Above All</h3>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              All catalog compounds undergo preparative HPLC recycling to achieve a minimum 99.0% chromatographic purity, with verified low endotoxin levels (&lt;0.05 EU/mg) for cell culture viability.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E2E8EE] space-y-3 card-lift shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-[#00B8AA] flex items-center justify-center">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-sora font-bold text-xl text-[#002050]">Continental Forwarding</h3>
            <p className="text-xs text-[#5B6B73] leading-relaxed">
              Operating out of Hong Kong and South San Francisco, our dual supply nodes ensure prompt customs resolution, strict cold-chain protection, and zero supply interruption.
            </p>
          </div>
        </div>

        {/* 3. CERTIFICATIONS & ACCREDITATIONS */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8EE] shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
              Accreditations & Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sora text-[#002050] mt-1">
              Quality Assurance Compliance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-white text-[#00B8AA] flex items-center justify-center mx-auto shadow-2xs font-mono-code font-bold">
                ISO
              </div>
              <h4 className="font-sora font-bold text-base text-[#002050]">ISO 9001:2015 Certified</h4>
              <p className="text-xs text-[#5B6B73]">
                Certified quality management system for peptide manufacturing, documentation, and dispatch tracking.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-white text-[#00B8AA] flex items-center justify-center mx-auto shadow-2xs font-mono-code font-bold">
                GMP
              </div>
              <h4 className="font-sora font-bold text-base text-[#002050]">cGMP Cleanrooms</h4>
              <p className="text-xs text-[#5B6B73]">
                Class 100 sterile filling suites with HEPA laminar air flow, continuous particle monitoring, and validated sanitation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-white text-[#00B8AA] flex items-center justify-center mx-auto shadow-2xs font-mono-code font-bold">
                USP
              </div>
              <h4 className="font-sora font-bold text-base text-[#002050]">USP Reference Grade</h4>
              <p className="text-xs text-[#5B6B73]">
                Calibrated against official USP & EP reference standards to verify molecular mass, counter-ion balance, and shelf-life stability.
              </p>
            </div>
          </div>
        </div>

        {/* 4. LEADERSHIP & SCIENTIFIC TEAM */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
              Scientific Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sora text-[#002050] mt-1">
              Led by Organic Chemists & Analytical Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs text-center space-y-3 card-lift">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#002050] to-[#00B8AA] text-[#5EC8E8] flex items-center justify-center mx-auto font-sora font-bold text-2xl shadow-md">
                CW
              </div>
              <div>
                <h4 className="font-sora font-bold text-base text-[#002050]">Dr. Colin Wong, Ph.D.</h4>
                <p className="text-xs text-[#00B8AA] font-mono-code">Director of Peptide Synthesis</p>
              </div>
              <p className="text-xs text-[#5B6B73] leading-relaxed">
                Former postdoctoral fellow in Macromolecular Chemistry at HKUST with 18+ years of solid-phase peptide synthesis expertise.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs text-center space-y-3 card-lift">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#002050] to-[#00B8AA] text-[#5EC8E8] flex items-center justify-center mx-auto font-sora font-bold text-2xl shadow-md">
                MT
              </div>
              <div>
                <h4 className="font-sora font-bold text-base text-[#002050]">Dr. Melissa Thorne, Ph.D.</h4>
                <p className="text-xs text-[#00B8AA] font-mono-code">VP of Quality Assurance & QC</p>
              </div>
              <p className="text-xs text-[#5B6B73] leading-relaxed">
                Specialist in high-resolution mass spectrometry and analytical UHPLC validation protocols across biopharmaceutical pipelines.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs text-center space-y-3 card-lift">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#002050] to-[#00B8AA] text-[#5EC8E8] flex items-center justify-center mx-auto font-sora font-bold text-2xl shadow-md">
                HV
              </div>
              <div>
                <h4 className="font-sora font-bold text-base text-[#002050]">Harrison Vance</h4>
                <p className="text-xs text-[#00B8AA] font-mono-code">Director of Cold-Chain Logistics</p>
              </div>
              <p className="text-xs text-[#5B6B73] leading-relaxed">
                12 years optimizing temperature-controlled bio-reagent distribution and customs regulatory frameworks between Asia and North America.
              </p>
            </div>
          </div>
        </div>

        {/* 5. PRIVACY POLICY ANCHORED SECTION */}
        <div id="privacy" className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8EE] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00B8AA]" />
            <h2 className="font-sora font-bold text-2xl text-[#002050]">
              Privacy & Data Protection Policy
            </h2>
          </div>
          <p className="text-xs text-[#5B6B73] font-mono-code">
            Last Updated: October 2025 • Compliant with GDPR, CCPA, and HK PDPO Standards
          </p>
          <div className="space-y-3 text-xs sm:text-sm text-[#5B6B73] leading-relaxed font-inter pt-2 border-t border-[#E2E8EE]">
            <p>
              Biopepti Biotech Group Ltd. (&quot;Biopepti&quot;, &quot;we&quot;, &quot;our&quot;) is committed to safeguarding the privacy and confidentiality of corporate procurement officers, academic researchers, and institutional partners using our wholesale platform.
            </p>
            <h4 className="font-sora font-bold text-xs uppercase text-[#002050] pt-2">1. Information We Collect</h4>
            <p>
              We collect organizational contact details, delivery addresses, institutional tax identification numbers, and quotation parameters strictly for generating wholesale invoices, executing cold-chain shipments, and complying with export customs regulations.
            </p>
            <h4 className="font-sora font-bold text-xs uppercase text-[#002050] pt-2">2. Data Security & Confidentiality</h4>
            <p>
              All quotation records, custom sequence synthesis agreements, and OEM private-label formulas are safeguarded with strict 256-bit encryption. We never sell, lease, or distribute client contact lists or inquiry telemetry to external marketing brokers.
            </p>
            <h4 className="font-sora font-bold text-xs uppercase text-[#002050] pt-2">3. Storage & Deletion Rights</h4>
            <p>
              Clients may request complete archival purging of their quotation history and company records at any time by contacting <code>privacy@biopepti.com</code>.
            </p>
          </div>
        </div>

        {/* 6. TERMS OF USE & SUPPLY ANCHORED SECTION */}
        <div id="terms" className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8EE] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#00B8AA]" />
            <h2 className="font-sora font-bold text-2xl text-[#002050]">
              Terms of Supply & Research Use Only Agreement
            </h2>
          </div>
          <p className="text-xs text-[#5B6B73] font-mono-code">
            Mandatory Institutional Purchaser Agreement
          </p>
          <div className="space-y-3 text-xs sm:text-sm text-[#5B6B73] leading-relaxed font-inter pt-2 border-t border-[#E2E8EE]">
            <p className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[#002050] text-xs font-medium">
              CRITICAL NOTICE: All chemicals, peptide compounds, and biological reagents sold by Biopepti are supplied solely for in vitro laboratory research, analytical testing, and experimental scientific calibration. They are not approved for human or veterinary administration.
            </p>
            <h4 className="font-sora font-bold text-xs uppercase text-[#002050] pt-2">1. Purchaser Warranties</h4>
            <p>
              By issuing a purchase order or quotation through this platform, the purchaser certifies that all personnel handling these compounds are qualified laboratory technicians operating in compliance with local biosafety regulations.
            </p>
            <h4 className="font-sora font-bold text-xs uppercase text-[#002050] pt-2">2. Warranty & Disposition</h4>
            <p>
              Biopepti warrants that all dispatched peptide lots conform to the purity and identity stated on the Certificate of Analysis (COA). If an unopened lot fails an independent verified HPLC assay, Biopepti will replace the lot or provide full credit within 30 days of receipt.
            </p>
            <h4 className="font-sora font-bold text-xs uppercase text-[#002050] pt-2">3. Limitation of Liability</h4>
            <p>
              In no event shall Biopepti be liable for indirect, incidental, or consequential damages resulting from the handling, storage, or experimental application of supplied compounds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
