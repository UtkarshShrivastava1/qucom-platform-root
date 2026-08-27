import React from 'react';
import { Card } from '../ui/Card.js';
import { Plus, Upload, Megaphone, ReceiptText } from 'lucide-react';
import { DashboardTab } from './Sidebar.js';

interface QuickAccessPanelProps {
  onNavigate: (tab: DashboardTab) => void;
  onOpenAddProduct: () => void;
  onOpenBulkUpload: () => void;
}

export const QuickAccessPanel: React.FC<QuickAccessPanelProps> = ({
  onNavigate,
  onOpenAddProduct,
  onOpenBulkUpload,
}) => {
  const quickActions = [
    {
      title: 'Add Single Product',
      desc: 'Create new SKU with price & variants',
      icon: Plus,
      color: 'bg-brand-600/10 text-brand-400 border-brand-500/20 hover:border-brand-500',
      action: onOpenAddProduct,
    },
    {
      title: 'Bulk Catalog Upload',
      desc: 'Import hundreds of products via CSV/Excel',
      icon: Upload,
      color: 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-500',
      action: onOpenBulkUpload,
    },
    {
      title: 'Launch Localized Ad',
      desc: 'Promote store in 3–4km customer feed',
      icon: Megaphone,
      color: 'bg-amber-600/10 text-amber-400 border-amber-500/20 hover:border-amber-500',
      action: () => onNavigate('marketing'),
    },
    {
      title: 'Generate POS Invoice',
      desc: 'Counter checkout with GST breakdown',
      icon: ReceiptText,
      color: 'bg-sky-600/10 text-sky-400 border-sky-500/20 hover:border-sky-500',
      action: () => onNavigate('pos'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.title}
            type="button"
            onClick={action.action}
            className={`p-4 rounded-2xl border text-left bg-slate-900/60 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${action.color}`}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-slate-950 border border-slate-800">
              <Icon className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-100">{action.title}</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{action.desc}</p>
          </button>
        );
      })}
    </div>
  );
};
