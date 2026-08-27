import React, { useState } from 'react';
import { Card } from '../ui/Card.js';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const dataWeekly = [
  { name: 'Mon', revenue: 14200, orders: 28 },
  { name: 'Tue', revenue: 18400, orders: 34 },
  { name: 'Wed', revenue: 16800, orders: 31 },
  { name: 'Thu', revenue: 22100, orders: 40 },
  { name: 'Fri', revenue: 26500, orders: 48 },
  { name: 'Sat', revenue: 34200, orders: 62 },
  { name: 'Sun', revenue: 29800, orders: 55 },
];

const dataMonthly = [
  { name: 'Week 1', revenue: 112000, orders: 210 },
  { name: 'Week 2', revenue: 135000, orders: 245 },
  { name: 'Week 3', revenue: 128000, orders: 230 },
  { name: 'Week 4', revenue: 162000, orders: 298 },
];

export const RevenueChart: React.FC = () => {
  const [range, setRange] = useState<'week' | 'month'>('week');
  const chartData = range === 'week' ? dataWeekly : dataMonthly;

  return (
    <Card className="p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-100">Revenue & Transaction Analytics</h3>
          <p className="text-xs text-slate-400">Hyperlocal sales performance within delivery radius</p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setRange('week')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              range === 'week' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setRange('month')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              range === 'month' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                fontSize: '12px',
                color: '#f8fafc',
              }}
              formatter={(val: number) => [`₹ ${val.toLocaleString('en-IN')}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
