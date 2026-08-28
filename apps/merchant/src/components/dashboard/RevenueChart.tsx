import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { ShoppingBag, ChevronDown } from 'lucide-react';

const chartData = [
  { name: '13 May', thisWeek: 28000, lastWeek: 18000 },
  { name: '14 May', thisWeek: 32000, lastWeek: 20000 },
  { name: '15 May', thisWeek: 48750, lastWeek: 30000 },
  { name: '16 May', thisWeek: 38000, lastWeek: 26000 },
  { name: '17 May', thisWeek: 24000, lastWeek: 16000 },
  { name: '18 May', thisWeek: 42000, lastWeek: 29000 },
  { name: '19 May', thisWeek: 36000, lastWeek: 24000 },
];

export const RevenueChart: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header with Dropdown & Link */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Sales Overview</h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs font-medium hover:bg-slate-100 transition-colors"
            >
              <span>This Week</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>
            <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              View All Orders
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 pt-2 text-[11px] font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-blue-600 rounded-full" />
            <span className="text-slate-700 font-semibold">This Week</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-b-2 border-dashed border-blue-400" />
            <span>Last Week</span>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-48 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorThisWeek" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '0.75rem',
                  fontSize: '11px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(val: number) => [`₹${val.toLocaleString()}`, '']}
              />
              {/* Last Week Line */}
              <Area
                type="monotone"
                dataKey="lastWeek"
                stroke="#93c5fd"
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="none"
              />
              {/* This Week Line */}
              <Area
                type="monotone"
                dataKey="thisWeek"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorThisWeek)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mini Stat Pills */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 mt-2">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">Total Sales</span>
            <span className="text-xs font-extrabold text-slate-900">₹48,750</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-400 font-medium block">Average Daily Sales</span>
          <span className="text-xs font-extrabold text-slate-900 mt-0.5 block">₹6,964</span>
        </div>
      </div>
    </div>
  );
};
