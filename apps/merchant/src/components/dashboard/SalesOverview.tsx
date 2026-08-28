import React from 'react';
import { ShoppingBag, ClipboardList, Users, TrendingUp, Calendar } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore.js';

export const SalesOverview: React.FC = () => {
  const { user } = useAuthStore();
  const storeName = user?.fullName || 'Fashion Hub';

  const kpis = [
    {
      title: 'Total Sales',
      value: '₹48,750',
      change: '18.6%',
      isPositive: true,
      timeframe: 'vs last 7 days',
      icon: ShoppingBag,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
    },
    {
      title: 'Orders',
      value: '128',
      change: '12.3%',
      isPositive: true,
      timeframe: 'vs last 7 days',
      icon: ClipboardList,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
    },
    {
      title: 'Visitors',
      value: '2,354',
      change: '15.7%',
      isPositive: true,
      timeframe: 'vs last 7 days',
      icon: Users,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Greeting Header & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>Good Morning, {storeName}!</span>
            <span>👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Here's what's happening with your store today.
          </p>
        </div>

        {/* Date Filter Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <span>Last 7 Days</span>
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-500 block">{kpi.title}</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block tracking-tight">
                  {kpi.value}
                </span>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="inline-flex items-center text-[11px] font-bold text-emerald-600 gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    {kpi.change}
                  </span>
                  <span className="text-[11px] text-slate-400">{kpi.timeframe}</span>
                </div>
              </div>

              {/* Circular Badge Icon */}
              <div className={`w-12 h-12 rounded-full ${kpi.iconBg} ${kpi.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
