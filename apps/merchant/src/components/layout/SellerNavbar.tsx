import React from 'react';
import { ChevronDown, Store } from 'lucide-react';
import { branding } from '../../lib/branding.js';

interface SellerNavbarProps {
  onGoToLogin?: () => void;
  onGoToSignup?: () => void;
}

export const SellerNavbar: React.FC<SellerNavbarProps> = ({
  onGoToLogin,
  onGoToSignup,
}) => {
  return (
    <nav className="h-18 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between shadow-xs">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-8">
        <button
          onClick={onGoToSignup}
          className="flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
            <Store className="w-5 h-5" />
          </div>
          <span className="text-2xl font-black tracking-tight text-blue-600 font-sans">
            {branding.appName}
          </span>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <span>Sell Online</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          <button className="hover:text-blue-600 transition-colors">How it works</button>
          <button className="hover:text-blue-600 transition-colors">Pricing</button>
          <button className="hover:text-blue-600 transition-colors">Grow Business</button>
          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <span>Learn</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onGoToLogin}
          className="px-6 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-all"
        >
          Login
        </button>

        <button
          type="button"
          onClick={onGoToSignup}
          className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all"
        >
          Start Selling
        </button>
      </div>
    </nav>
  );
};
