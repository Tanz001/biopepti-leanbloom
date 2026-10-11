import React from 'react';
import { Link } from 'react-router-dom';
import { VialGraphic } from '../components/ui/VialGraphic';
import { ArrowLeft, Home, FileQuestion } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-20 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E4EAE8] shadow-lg text-center space-y-6">
        <div className="w-24 h-24 mx-auto opacity-80">
          <VialGraphic size={85} color="#DC2626" label="404" sublabel="NOT FOUND" purity="NULL" />
        </div>

        <div className="space-y-2">
          <span className="font-mono-code text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            ERROR 404: SEQUENCE NOT FOUND
          </span>
          <h1 className="font-sora font-bold text-2xl text-[#0B1F2A]">
            Page Does Not Exist
          </h1>
          <p className="text-xs text-[#5B6B73] leading-relaxed">
            The laboratory page or specification you requested has been moved or retired from our wholesale directory.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-full bg-[#0B1F2A] text-white font-sora font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#07131A] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/products"
            className="px-6 py-2.5 rounded-full bg-white border border-[#E4EAE8] text-[#0B1F2A] font-sora font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <span>View All Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
