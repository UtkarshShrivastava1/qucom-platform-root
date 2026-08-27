import React from 'react';
import { Card } from '../ui/Card.js';
import { IndianRupee, ShoppingBag, Package, Star, TrendingUp, ArrowUpRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: 'brand' | 'emerald' | 'amber' | 'sky';
}

const colorMap = {
  brand: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  sky: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, color }) => {
  return (
    <Card hoverEffect className="p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-100">{value}</h3>
        <span className="inline-flex items-center text-xs font-medium text-emerald-400">
          <TrendingUp className="w-3 h-3 mr-0.5" />
          {change}
        </span>
      </div>
    </Card>
  );
};

export const SalesOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Today's Sales"
        value="₹ 24,850"
        change="+18.4%"
        icon={IndianRupee}
        color="brand"
      />
      <MetricCard
        title="Total Orders Today"
        value="42 Orders"
        change="+12.5%"
        icon={ShoppingBag}
        color="emerald"
      />
      <MetricCard
        title="Active SKUs Live"
        value="128 Products"
        change="+6 new"
        icon={Package}
        color="sky"
      />
      <MetricCard
        title="Store Rating"
        value="4.9 ★"
        change="156 reviews"
        icon={Star}
        color="amber"
      />
    </div>
  );
};
