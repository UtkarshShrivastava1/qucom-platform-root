import React from 'react';
import { Bell, Store, ShieldCheck, User, Menu } from 'lucide-react';
import { Badge } from '../ui/Badge.js';
import { useAuthStore } from '../../stores/authStore.js';
import { useOnboardingStore } from '../../stores/onboardingStore.js';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  isCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu, isCollapsed }) => {
  const { user } = useAuthStore();
  const { draft } = useOnboardingStore();

  const storeName = draft.step4?.storeDisplayName || 'Shree Ganesh Retail';
  const category = draft.step5?.primaryCategory || 'Fashion & Apparel';

  return (
    <header
      className={`h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ${
        isCollapsed ? 'sm:ml-20' : 'sm:ml-64'
      }`}
    >
      {/* Left: Mobile trigger & Store Name */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="sm:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
            <Store className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-100 leading-tight truncate max-w-[180px] sm:max-w-xs">
              {storeName}
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="capitalize">{category}</span>
              <span>•</span>
              <Badge variant="success" size="sm">Open Now</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions, Notifications & Avatar */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs ring-2 ring-slate-800">
            {user?.fullName?.charAt(0) || <User className="w-4 h-4" />}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-slate-200 truncate max-w-[120px]">
              {user?.fullName || 'Merchant Partner'}
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3" />
              <span>GST Verified</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
