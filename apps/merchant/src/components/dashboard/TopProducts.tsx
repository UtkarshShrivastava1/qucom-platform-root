import React from 'react';
import { Package } from 'lucide-react';

interface TopProductItem {
  id: string;
  name: string;
  variant: string;
  orders: number;
  sales: string;
  imageBg: string;
}

const mockTopProducts: TopProductItem[] = [
  { id: '1', name: 'Men Graphic Print T-shirt', variant: 'Olive Green, L', orders: 32, sales: '₹9,568', imageBg: 'bg-amber-900/60' },
  { id: '2', name: 'Men Solid Cotton Shirt', variant: 'Blue, M', orders: 28, sales: '₹8,120', imageBg: 'bg-blue-600/60' },
  { id: '3', name: 'Men Striped Polo T-shirt', variant: 'Navy Blue, L', orders: 24, sales: '₹6,960', imageBg: 'bg-slate-800' },
  { id: '4', name: 'Men Checked Shirt', variant: 'Red, M', orders: 20, sales: '₹5,600', imageBg: 'bg-rose-700/60' },
  { id: '5', name: 'Men Plain T-shirt', variant: 'Black, L', orders: 18, sales: '₹4,320', imageBg: 'bg-slate-950' },
];

export const TopProducts: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Top Selling Products</h3>
        <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 text-[11px] font-semibold text-slate-400 pb-1">
        <span className="col-span-8">Product</span>
        <span className="col-span-2 text-right">Orders</span>
        <span className="col-span-2 text-right">Sales</span>
      </div>

      {/* Product Rows */}
      <div className="divide-y divide-slate-100 text-xs">
        {mockTopProducts.map((p) => (
          <div key={p.id} className="grid grid-cols-12 py-2 items-center hover:bg-slate-50 rounded-lg px-1 transition-colors">
            <div className="col-span-8 flex items-center gap-2.5 min-w-0 pr-2">
              <div className={`w-8 h-8 rounded-lg ${p.imageBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
                <Package className="w-4 h-4 opacity-80" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-slate-800 truncate text-xs leading-tight">{p.name}</h4>
                <span className="text-[10px] text-slate-400 truncate block">{p.variant}</span>
              </div>
            </div>

            <span className="col-span-2 text-right font-semibold text-slate-700">{p.orders}</span>
            <span className="col-span-2 text-right font-bold text-slate-900">{p.sales}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
