import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COA_RECORDS } from '../data/coa';
import { CoaPreviewModal } from '../components/coa/CoaPreviewModal';
import { COARecord } from '../types';
import {
  FileCheck2,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  Filter,
  Sparkles,
  ShieldCheck,
  Eye,
  Microscope,
  RotateCcw
} from 'lucide-react';

export const CoaReportsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [selectedCoa, setSelectedCoa] = useState<COARecord | null>(null);

  // Fast batch verification input
  const [verifyBatchInput, setVerifyBatchInput] = useState('');
  const [verifiedResult, setVerifiedResult] = useState<COARecord | null | 'not_found'>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyBatchInput.trim()) return;

    const matched = COA_RECORDS.find(
      c => c.batchNumber.toLowerCase() === verifyBatchInput.trim().toLowerCase()
    );

    if (matched) {
      setVerifiedResult(matched);
    } else {
      setVerifiedResult('not_found');
    }
  };

  // Filter COA records
  const filteredRecords = useMemo(() => {
    return COA_RECORDS.filter(record => {
      // Year filter
      if (selectedYear !== 'All Years') {
        if (!record.testedDate.startsWith(selectedYear)) return false;
      }

      // Search query (productName, batchNumber, sku)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = record.productName.toLowerCase().includes(q);
        const matchesBatch = record.batchNumber.toLowerCase().includes(q);
        const matchesSku = record.sku.toLowerCase().includes(q);
        if (!matchesName && !matchesBatch && !matchesSku) return false;
      }

      return true;
    });
  }, [searchQuery, selectedYear]);

  return (
    <div className="min-h-screen bg-[#F4F8FA] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E2E8EE]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] text-[#00B8AA] text-xs font-mono-code font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00B8AA]" />
              <span>QUALITY ASSURANCE ARCHIVE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-sora text-[#002050]">
              Certificate of Analysis (COA) Reports
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6B73] mt-1">
              Trace any batch to independent Reverse-Phase UHPLC chromatograms and high-resolution mass spectra.
            </p>
          </div>

          <span className="font-mono-code text-xs font-bold text-[#002050] px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8EE] shadow-2xs self-start md:self-auto">
            {COA_RECORDS.length} Authenticated Batches Online
          </span>
        </div>

        {/* 1. FAST BATCH VERIFICATION BOX */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8EE] shadow-xs">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center gap-2">
              <Microscope className="w-5 h-5 text-[#00B8AA]" />
              <h2 className="font-sora font-bold text-base text-[#002050]">
                Instant Batch Verification
              </h2>
            </div>
            <p className="text-xs text-[#5B6B73]">
              Enter the batch lot number printed on your vial or packaging label (e.g. <code>LL-2025-0814</code>) to verify authenticity and download analytical curves.
            </p>

            <form onSubmit={handleVerify} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-[#5B6B73] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter Lot Number (e.g. LL-2025-0814)..."
                  value={verifyBatchInput}
                  onChange={e => setVerifyBatchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] font-mono-code text-xs text-[#002050] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#002050] hover:bg-[#001538] text-white font-sora font-semibold text-xs transition-colors"
              >
                Verify Batch
              </button>
            </form>

            {/* Verification Result Display */}
            {verifiedResult && verifiedResult !== 'not_found' && (
              <div className="p-4 rounded-2xl bg-[#E6F7F5] border border-[#00B8AA]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white text-[#00B8AA] shadow-2xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sora font-bold text-xs text-[#002050]">
                        Verified Authentic Batch
                      </span>
                      <span className="font-mono-code text-[11px] font-bold text-[#00B8AA] bg-white px-2 py-0.5 rounded">
                        Purity: {verifiedResult.purity}
                      </span>
                    </div>
                    <p className="text-xs text-[#5B6B73]">
                      {verifiedResult.productName} ({verifiedResult.spec}) • Lot: {verifiedResult.batchNumber}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCoa(verifiedResult)}
                  className="px-4 py-2 rounded-full bg-[#00B8AA] hover:bg-[#009688] text-white font-sora font-semibold text-xs flex items-center gap-1.5 transition-colors self-end sm:self-auto"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect COA</span>
                </button>
              </div>
            )}

            {verifiedResult === 'not_found' && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs text-amber-900 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold">Lot ID Not Found in Instant Database.</span>
                  <p className="text-amber-700 mt-0.5">
                    For custom synthesis lots or historical batches prior to 2024, contact QA desk at <code>qa@biopepti.com</code>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. QUALITY PROCESS (4-STEP VISUAL) */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-mono-code text-[#00B8AA] font-bold uppercase tracking-wider">
              Analytical Rigor
            </span>
            <h2 className="text-2xl font-bold font-sora text-[#002050] mt-1">
              4-Stage Quality Assurance Cycle
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-[#E2E8EE] space-y-2 card-lift">
              <span className="font-mono-code font-bold text-xs text-[#00B8AA]">STAGE 01</span>
              <h3 className="font-sora font-bold text-sm text-[#002050]">Solid-Phase Synthesis</h3>
              <p className="text-[11px] text-[#5B6B73] leading-relaxed">
                Stepwise microwave-assisted coupling in Class 100 cleanrooms using high-purity Fmoc building blocks.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-[#E2E8EE] space-y-2 card-lift">
              <span className="font-mono-code font-bold text-xs text-[#00B8AA]">STAGE 02</span>
              <h3 className="font-sora font-bold text-sm text-[#002050]">Preparative HPLC</h3>
              <p className="text-[11px] text-[#5B6B73] leading-relaxed">
                Dual C18 reverse-phase purification removes truncated sequences and synthesis enantiomers.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-[#E2E8EE] space-y-2 card-lift">
              <span className="font-mono-code font-bold text-xs text-[#00B8AA]">STAGE 03</span>
              <h3 className="font-sora font-bold text-sm text-[#002050]">HPLC / MS Testing</h3>
              <p className="text-[11px] text-[#5B6B73] leading-relaxed">
                Analytical UHPLC verifies &gt;99% chromatographic purity; High-Res ESI-MS verifies theoretical mass.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-[#E2E8EE] space-y-2 card-lift">
              <span className="font-mono-code font-bold text-xs text-[#00B8AA]">STAGE 04</span>
              <h3 className="font-sora font-bold text-sm text-[#002050]">Documentation</h3>
              <p className="text-[11px] text-[#5B6B73] leading-relaxed">
                Full analytical certificate generated, certified by senior QA chemist, and indexed permanently.
              </p>
            </div>
          </div>
        </div>

        {/* 3. COA DIRECTORY TABLE */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-[#E2E8EE] shadow-xs">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-[#5B6B73] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by product name, SKU, or batch #..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-2xl bg-[#F4F8FA] border border-[#E2E8EE] text-xs font-inter text-[#002050]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 text-xs text-[#5B6B73]">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter Year:</span>
              </div>
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#F4F8FA] border border-[#E2E8EE] text-xs font-semibold text-[#002050]"
              >
                <option value="All Years">All Years</option>
                <option value="2025">2025 Batches</option>
                <option value="2024">2024 Batches</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E2E8EE] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#002050] text-white text-[11px] font-sora font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Batch Number</th>
                    <th className="py-3.5 px-4">Product Name</th>
                    <th className="py-3.5 px-4">SKU / Spec</th>
                    <th className="py-3.5 px-4">Purity (%)</th>
                    <th className="py-3.5 px-4">Analytical Method</th>
                    <th className="py-3.5 px-4">Release Date</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8EE] font-inter">
                  {filteredRecords.map(coa => (
                    <tr
                      key={coa.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono-code font-bold text-[#002050]">
                        {coa.batchNumber}
                      </td>
                      <td className="py-3.5 px-4 font-sora font-bold text-xs text-[#002050]">
                        {coa.productName}
                      </td>
                      <td className="py-3.5 px-4 font-mono-code text-[#5B6B73]">
                        [{coa.sku}] {coa.spec}
                      </td>
                      <td className="py-3.5 px-4 font-mono-code text-[#00B8AA] font-bold text-sm">
                        {coa.purity}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {coa.testMethod}
                      </td>
                      <td className="py-3.5 px-4 font-mono-code text-slate-500">
                        {coa.testedDate}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedCoa(coa)}
                          className="px-3.5 py-1.5 rounded-full bg-[#00B8AA] hover:bg-[#009688] text-white font-sora text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View COA</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* COA Preview Modal */}
      {selectedCoa && (
        <CoaPreviewModal
          coa={selectedCoa}
          onClose={() => setSelectedCoa(null)}
        />
      )}
    </div>
  );
};
