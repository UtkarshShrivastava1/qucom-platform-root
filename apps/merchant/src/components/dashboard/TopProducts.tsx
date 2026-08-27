import React from 'react';
import { Card } from '../ui/Card.js';
import { Badge } from '../ui/Badge.js';
import { TrendingUp } from 'lucide-react';

const topItems = [
  { name: 'Slim-Fit Linen Shirt', category: 'Fashion', sales: 64, revenue: '₹ 82,500' },
  { name: 'Formal Leather Loafers', category: 'Footwear', sales: 48, revenue: '₹ 1,15,200' },
  { name: 'Denim Casual Jacket', category: 'Fashion', sales: 39, revenue: '₹ 77,610' },
  { name: 'Pure Cotton Chinos', category: 'Fashion', sales: 35, revenue: '₹ 45,150' },
];

export const TopProducts: React.FC = () => {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-100">Top-Selling Products</h3>
        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>High Demand</span>
        </span>
      </div>

      <div className="space-y-3">
        {topItems.map((item, idx) => (
          <div key={item.name} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center">
                #{idx + 1}
              </span>
              <div>
                <h4 className="text-xs font-semibold text-slate-200">{item.name}</h4>
                <span className="text-[11px] text-slate-400">{item.category} • {item.sales} units sold</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-100">{item.revenue}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
