import React from 'react';
import { Package, ShoppingBag, AlertTriangle, XCircle, Banknote, TrendingUp, TrendingDown } from 'lucide-react';
import { useInventoryStore } from '../../stores/inventoryStore.js';

export const InventoryKPIBar: React.FC = () => {
  const { items } = useInventoryStore();

  const totalStockUnits = items.reduce((acc, item) => acc + item.currentStock, 0);
  const lowStockCount = items.filter((item) => item.status === 'LOW_STOCK').length;
  const outOfStockCount = items.filter((item) => item.status === 'OUT_OF_STOCK').length;
  const totalStockValue = items.reduce((acc, item) => acc + item.currentStock * item.sellingPrice, 0);

  const kpis = [
    {
      id: 'total-products',
      title: 'Total Products',
      value: (1240 + items.length).toLocaleString('en-IN'),
      trend: '+12%',
      trendLabel: 'vs last month',
      isPositive: true,
      icon: Package,
      accentColor: '#0038ed',
      bgColor: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'total-stock',
      title: 'Total Stock (Units)',
      value: (12500 + totalStockUnits).toLocaleString('en-IN'),
      trend: '+8%',
      trendLabel: 'vs last month',
      isPositive: true,
      icon: ShoppingBag,
      accentColor: '#10b981',
      bgColor: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'low-stock',
      title: 'Low Stock',
      value: (75 + lowStockCount).toLocaleString('en-IN'),
      trend: '-5%',
      trendLabel: 'vs last month',
      isPositive: false,
      icon: AlertTriangle,
      accentColor: '#f59e0b',
      bgColor: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'out-of-stock',
      title: 'Out of Stock',
      value: (35 + outOfStockCount).toLocaleString('en-IN'),
      trend: '-3%',
      trendLabel: 'vs last month',
      isPositive: false,
      icon: XCircle,
      accentColor: '#ef4444',
      bgColor: 'bg-rose-50 text-rose-600',
    },
    {
      id: 'stock-value',
      title: 'Stock Value',
      value: `₹${(1850000 + totalStockValue).toLocaleString('en-IN')}`,
      trend: '+15%',
      trendLabel: 'vs last month',
      isPositive: true,
      icon: Banknote,
      accentColor: '#8b5cf6',
      bgColor: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6">
      {kpis.map((kpi) => {
        const IconComponent = kpi.icon;
        return (
          <div
            key={kpi.id}
            className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-xs transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500">{kpi.title}</span>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold text-slate-900 tracking-tight">{kpi.value}</span>
              <div
                className={`flex items-center gap-0.5 text-2xs font-semibold px-1.5 py-0.5 rounded-full ${
                  kpi.isPositive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-rose-50 text-rose-700'
                }`}
              >
                {kpi.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{kpi.trend}</span>
              </div>
            </div>
            <p className="text-2xs text-slate-400 mt-1">{kpi.trendLabel}</p>
          </div>
        );
      })}
    </div>
  );
};
