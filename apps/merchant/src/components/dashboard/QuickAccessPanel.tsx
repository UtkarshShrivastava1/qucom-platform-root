import React from 'react';
import {
  FileText,
  PlusCircle,
  Boxes,
  Receipt,
  HardDrive,
  BarChart3,
  ShoppingCart,
  UserPlus,
  Settings,
} from 'lucide-react';
import { DashboardTab } from './Sidebar.js';

interface QuickAccessPanelProps {
  onNavigate: (tab: DashboardTab) => void;
  onOpenAddProduct: () => void;
  onOpenBulkUpload: () => void;
}

export const QuickAccessPanel: React.FC<QuickAccessPanelProps> = ({
  onNavigate,
  onOpenAddProduct,
}) => {
  const actions = [
    {
      label: 'Create New Bill',
      sublabel: 'Tax Invoice / GST Invoice',
      icon: FileText,
      color: 'bg-blue-600 text-white',
      borderColor: 'border-blue-600',
      isPrimary: true,
      onClick: () => onNavigate('billing'),
    },
    {
      label: 'Add Product',
      sublabel: 'Add new product',
      icon: PlusCircle,
      color: 'text-emerald-600 bg-emerald-50',
      borderColor: 'border-emerald-200',
      onClick: onOpenAddProduct,
    },
    {
      label: 'Adjust Stock',
      sublabel: 'Update inventory',
      icon: Boxes,
      color: 'text-amber-600 bg-amber-50',
      borderColor: 'border-amber-200',
      onClick: () => onNavigate('inventory'),
    },
    {
      label: 'Add Expense',
      sublabel: 'Record new expense',
      icon: Receipt,
      color: 'text-rose-600 bg-rose-50',
      borderColor: 'border-rose-200',
      onClick: () => onNavigate('expenses'),
    },
    {
      label: 'Add Asset',
      sublabel: 'Add new asset',
      icon: HardDrive,
      color: 'text-purple-600 bg-purple-50',
      borderColor: 'border-purple-200',
      onClick: () => onNavigate('assets'),
    },
    {
      label: 'View Reports',
      sublabel: 'Business insights',
      icon: BarChart3,
      color: 'text-blue-600 bg-blue-50',
      borderColor: 'border-blue-200',
      onClick: () => onNavigate('analytics'),
    },
    {
      label: 'Create Order',
      sublabel: 'Manual order',
      icon: ShoppingCart,
      color: 'text-cyan-600 bg-cyan-50',
      borderColor: 'border-cyan-200',
      onClick: () => onNavigate('orders'),
    },
    {
      label: 'Add Customer',
      sublabel: 'Add new customer',
      icon: UserPlus,
      color: 'text-blue-600 bg-blue-50',
      borderColor: 'border-blue-200',
      onClick: () => onNavigate('customers'),
    },
    {
      label: 'Store Settings',
      sublabel: 'Manage store',
      icon: Settings,
      color: 'text-purple-600 bg-purple-50',
      borderColor: 'border-purple-200',
      onClick: () => onNavigate('store'),
    },
  ];

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {actions.slice(0, 8).map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all hover:shadow-2xs group ${
                action.isPrimary
                  ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                  : `bg-white hover:bg-slate-50 ${action.borderColor}`
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  action.isPrimary ? 'bg-white/20 text-white' : action.color
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span
                  className={`text-[11px] font-bold block truncate leading-tight ${
                    action.isPrimary ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {action.label}
                </span>
                <span
                  className={`text-[9px] block truncate leading-tight mt-0.5 ${
                    action.isPrimary ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {action.sublabel}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
