import React from 'react';
import { COARecord } from '../../types';
import { X, Download, ShieldCheck, Printer } from 'lucide-react';

interface CoaPreviewModalProps {
  coa: COARecord | null;
  onClose: () => void;
}

export const CoaPreviewModal: React.FC<CoaPreviewModalProps> = ({ coa, onClose }) => {
  if (!coa) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0B1F2A]/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E4EAE8] overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-3 border-b border-[#E4EAE8] bg-[#0B1F2A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5EEAD4]" />
            <span className="font-sora text-xs font-semibold">
              Authenticated Certificate of Analysis
            </span>
            <span className="font-mono-code text-[11px] bg-white/10 px-2 py-0.5 rounded text-[#5EEAD4]">
              {coa.batchNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Body (A4 Style) */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6 flex-1 bg-[#FAFCFB]">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-[#0B1F2A]">
            <div>
              <div className="flex items-baseline">
                <span className="font-sora font-extrabold text-2xl text-[#0B1F2A]">LUMORA</span>
                <span className="font-sora font-light text-2xl text-[#0E9F8E] tracking-widest ml-1.5">LABS</span>
              </div>
              <p className="text-[11px] text-[#5B6B73] font-mono-code mt-0.5">
                DIVISION OF QUALITY ASSURANCE & ADVANCED ANALYTICAL BIOTECH
              </p>
              <p className="text-[10px] text-slate-500">
                Central BioHub, Hong Kong SAR • ISO/IEC 17025 Accredited Protocol
              </p>
            </div>

            <div className="text-right sm:text-right font-mono-code text-xs">
              <span className="inline-block px-3 py-1 rounded bg-[#E7F6F3] text-[#0E9F8E] font-bold text-sm mb-1 border border-[#0E9F8E]/20">
                VERIFIED COA
              </span>
              <p className="text-[#0B1F2A] font-bold">BATCH: {coa.batchNumber}</p>
              <p className="text-slate-500 text-[11px]">Tested: {coa.testedDate}</p>
            </div>
          </div>

          {/* Product Overview Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white border border-[#E4EAE8] text-xs">
            <div>
              <span className="text-[10px] text-[#5B6B73] uppercase block font-semibold">Product Name</span>
              <span className="font-sora font-bold text-[#0B1F2A]">{coa.productName}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5B6B73] uppercase block font-semibold">Product SKU</span>
              <span className="font-mono-code font-bold text-[#0B1F2A]">{coa.sku}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5B6B73] uppercase block font-semibold">Specification</span>
              <span className="font-mono-code text-[#0B1F2A]">{coa.spec}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5B6B73] uppercase block font-semibold">Expiry Date</span>
              <span className="font-mono-code text-[#0E9F8E] font-bold">{coa.expiryDate}</span>
            </div>
          </div>

          {/* Analytical Test Results Table */}
          <div>
            <h4 className="font-sora font-bold text-xs uppercase tracking-wider text-[#0B1F2A] mb-2 flex items-center justify-between">
              <span>Physicochemical Analysis Summary</span>
              <span className="font-mono-code text-[#0E9F8E] text-[11px] font-semibold">
                Purity: {coa.purity}
              </span>
            </h4>

            <div className="border border-[#E4EAE8] rounded-xl overflow-hidden bg-white text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#F6F8F7] border-b border-[#E4EAE8] text-[11px] font-semibold text-[#5B6B73]">
                  <tr>
                    <th className="py-2.5 px-3">Test Parameter</th>
                    <th className="py-2.5 px-3">Specification Criteria</th>
                    <th className="py-2.5 px-3">Analytical Result</th>
                    <th className="py-2.5 px-3">Disposition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4EAE8] font-inter">
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Appearance</td>
                    <td className="py-2.5 px-3 text-slate-500">White to off-white lyophilized cake</td>
                    <td className="py-2.5 px-3 font-mono-code">{coa.appearance}</td>
                    <td className="py-2.5 px-3 font-mono-code text-emerald-600 font-bold">CONFORMS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Chemical Identity</td>
                    <td className="py-2.5 px-3 text-slate-500">ESI-MS / HRMS Molecular Mass</td>
                    <td className="py-2.5 px-3 font-mono-code">Matched Reference Standard</td>
                    <td className="py-2.5 px-3 font-mono-code text-emerald-600 font-bold">CONFORMS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Chromatographic Purity</td>
                    <td className="py-2.5 px-3 text-slate-500">≥ 98.0% (RP-UHPLC @ 214nm)</td>
                    <td className="py-2.5 px-3 font-mono-code font-bold text-[#0E9F8E]">{coa.purity}</td>
                    <td className="py-2.5 px-3 font-mono-code text-emerald-600 font-bold">PASS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Retention Time (tR)</td>
                    <td className="py-2.5 px-3 text-slate-500">± 0.2 min of reference</td>
                    <td className="py-2.5 px-3 font-mono-code">{coa.retentionTime || '12.4 min'}</td>
                    <td className="py-2.5 px-3 font-mono-code text-emerald-600 font-bold">PASS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Solubility</td>
                    <td className="py-2.5 px-3 text-slate-500">Clear, particulate-free in BAC water</td>
                    <td className="py-2.5 px-3 font-mono-code">{coa.solubility}</td>
                    <td className="py-2.5 px-3 font-mono-code text-emerald-600 font-bold">PASS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Bacterial Endotoxins</td>
                    <td className="py-2.5 px-3 text-slate-500">&lt; 0.05 EU/mg (Turbidimetric LAL)</td>
                    <td className="py-2.5 px-3 font-mono-code">&lt; 0.02 EU/mg</td>
                    <td className="py-2.5 px-3 font-mono-code text-emerald-600 font-bold">PASS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Simulated HPLC Chromatogram Graphic */}
          <div className="p-4 rounded-xl bg-white border border-[#E4EAE8]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sora text-xs font-bold text-[#0B1F2A]">
                Reverse-Phase UHPLC Chromatogram (UV 214 nm)
              </span>
              <span className="font-mono-code text-[10px] text-slate-400">
                Method: C18 2.1×100mm, 0.1% TFA / ACN Gradient
              </span>
            </div>

            <div className="h-28 w-full bg-[#F6F8F7] rounded-lg border border-[#E4EAE8] relative overflow-hidden flex items-end px-6 py-2">
              {/* Baseline and axes */}
              <div className="absolute inset-x-0 bottom-6 border-b border-slate-300" />
              <div className="absolute top-2 bottom-6 left-6 border-l border-slate-300" />

              {/* Peak SVG Curve */}
              <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                <path
                  d="M 10 90 L 180 90 Q 220 90 240 85 Q 248 10 250 8 Q 252 10 260 85 Q 280 90 490 90"
                  fill="none"
                  stroke="#0E9F8E"
                  strokeWidth="2"
                />
                {/* Micro peak text label */}
                <text x="250" y="24" textAnchor="middle" fill="#0B1F2A" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  tR = {coa.retentionTime || '12.4m'} (99%+)
                </text>
              </svg>

              {/* Time tick labels */}
              <div className="absolute bottom-1 left-6 right-6 flex justify-between text-[9px] font-mono-code text-slate-400">
                <span>0.0 min</span>
                <span>5.0 min</span>
                <span>10.0 min</span>
                <span>15.0 min</span>
                <span>20.0 min</span>
              </div>
            </div>
          </div>

          {/* QA Sign-off & Seal */}
          <div className="pt-4 border-t border-[#E4EAE8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div>
              <p className="font-sora font-semibold text-[#0B1F2A]">Analytical QA Sign-off:</p>
              <p className="font-mono-code text-[#5B6B73] mt-0.5">{coa.analyst}</p>
              <p className="text-[10px] text-slate-400">Lumora Labs Biotech Analytical Standards</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#0E9F8E] flex flex-col items-center justify-center text-center p-1 font-mono-code text-[8px] text-[#0E9F8E]">
                <ShieldCheck className="w-4 h-4 mb-0.5" />
                <span className="font-bold leading-tight">QA QC</span>
                <span>APPROVED</span>
              </div>

              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(coa, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = coa.pdfFilename || `COA_${coa.batchNumber}.json`;
                  a.click();
                }}
                className="px-4 py-2 rounded-full bg-[#0B1F2A] text-white font-sora font-semibold text-xs flex items-center gap-1.5 hover:bg-[#07131A] transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#5EEAD4]" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
