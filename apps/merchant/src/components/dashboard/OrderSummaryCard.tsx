import React from 'react';
import {
  Clock,
  CheckCircle2,
  Package,
  Truck,
  CheckCheck,
  XCircle,
  ChevronRight,
} from 'lucide-react';

interface OrderSummaryCardProps {
  onNavigateStatus?: (status: string) => void;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ onNavigateStatus }) => {
  const statuses = [
    { label: 'Pending', count: 25, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Confirmed', count: 36, icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Packed', count: 29, icon: Package, color: 'text-teal-500', bg: 'bg-teal-50' },
    { label: 'Shipped', count: 22, icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Delivered', count: 98, icon: CheckCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Cancelled', count: 7, icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Order Summary</h3>
      </div>

      <div className="space-y-1.5 text-xs">
        {statuses.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              onClick={() => onNavigateStatus?.(s.label.toLowerCase())}
              className="flex items-center justify-between py-1.5 px-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-6 h-6 rounded-md ${s.bg} ${s.color} flex items-center justify-center`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-slate-700">{s.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-xs">{s.count}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
