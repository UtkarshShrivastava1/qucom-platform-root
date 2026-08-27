import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Megaphone,
  Boxes,
  ReceiptText,
  Wallet,
  Calculator,
  HardDrive,
  RotateCcw,
  BarChart3,
  Store,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { branding } from '../../lib/branding.js';
import { useAuthStore } from '../../stores/authStore.js';

export type DashboardTab =
  | 'overview'
  | 'orders'
  | 'catalog'
  | 'marketing'
  | 'inventory'
  | 'pos'
  | 'wallet'
  | 'expenses'
  | 'assets'
  | 'returns'
  | 'analytics'
  | 'store'
  | 'support';

interface SidebarProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems: Array<{ id: DashboardTab; label: string; icon: React.ElementType; section?: string }> = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders Management', icon: ShoppingBag },
  { id: 'catalog', label: 'Products & Catalog', icon: Package },
  { id: 'inventory', label: 'Inventory Manager', icon: Boxes },
  { id: 'marketing', label: 'Marketing & Ads', icon: Megaphone, section: 'Growth & Sales' },
  { id: 'pos', label: 'Billing & POS', icon: ReceiptText },
  { id: 'wallet', label: 'Wallet & Payouts', icon: Wallet },
  { id: 'expenses', label: 'Expense Tracking', icon: Calculator, section: 'Operations' },
  { id: 'assets', label: 'Asset Management', icon: HardDrive },
  { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw },
  { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
  { id: 'store', label: 'Store Profile', icon: Store, section: 'Settings' },
  { id: 'support', label: 'Help & Support', icon: HelpCircle },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
}) => {
  const { logout } = useAuthStore();

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-slate-900 border-r border-slate-800 z-30 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800 shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-brand-500/20 shrink-0">
              {branding.appName.charAt(0)}
            </div>
            <div className="truncate">
              <h1 className="font-bold text-sm text-slate-100 leading-tight truncate">{branding.appName}</h1>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-brand-400">Merchant Hub</span>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-brand-500/20 mx-auto">
            {branding.appName.charAt(0)}
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors hidden sm:flex"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          const showSection = item.section && !isCollapsed;

          return (
            <React.Fragment key={item.id}>
              {showSection && (
                <div className="pt-3 pb-1 px-3 text-[10px] font-bold tracking-wider uppercase text-slate-500">
                  {item.section}
                </div>
              )}

              <button
                type="button"
                onClick={() => onSelectTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom Logout */}
      <div className="p-3 border-t border-slate-800 shrink-0">
        <button
          type="button"
          onClick={logout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
