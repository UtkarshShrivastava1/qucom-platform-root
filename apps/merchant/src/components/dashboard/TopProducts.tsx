import React from 'react';

interface TopProductItem {
  id: string;
  name: string;
  variant: string;
  orders: number;
  sales: string;
  colorHex: string;
}

const mockTopProducts: TopProductItem[] = [
  { id: '1', name: 'Men Graphic Print T-shirt', variant: 'Olive Green, L', orders: 32, sales: '₹9,568', colorHex: '#556B2F' },
  { id: '2', name: 'Men Solid Cotton Shirt', variant: 'Blue, M', orders: 28, sales: '₹8,120', colorHex: '#2563EB' },
  { id: '3', name: 'Men Striped Polo T-shirt', variant: 'Navy Blue, L', orders: 24, sales: '₹6,960', colorHex: '#1E293B' },
  { id: '4', name: 'Men Checked Shirt', variant: 'Red, M', orders: 20, sales: '₹5,600', colorHex: '#DC2626' },
  { id: '5', name: 'Men Plain T-shirt', variant: 'Black, L', orders: 18, sales: '₹4,320', colorHex: '#0F172A' },
];

export const TopProducts: React.FC = () => {
  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2 h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900">Top Selling Products</h3>
        <button type="button" className="text-[11px] font-semibold text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 text-[10px] font-semibold text-slate-400 pb-0.5">
        <span className="col-span-8">Product</span>
        <span className="col-span-2 text-right">Orders</span>
        <span className="col-span-2 text-right">Sales</span>
      </div>

      {/* Product Rows */}
      <div className="divide-y divide-slate-100 text-xs">
        {mockTopProducts.map((p) => (
          <div key={p.id} className="grid grid-cols-12 py-1.5 items-center hover:bg-slate-50/80 rounded-lg px-1 transition-colors">
            <div className="col-span-8 flex items-center gap-2 min-w-0 pr-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs border border-slate-200/60"
                style={{ backgroundColor: p.colorHex }}
              >
                {/* Clean Shirt Vector Shape */}
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white opacity-85" fill="currentColor">
                  <path d="M16 2l4 4-2 3-2-1v14H8V8L6 9 4 6l4-4h2a3 3 0 004 0h2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-slate-800 truncate text-[11px] leading-tight">{p.name}</h4>
                <span className="text-[9px] text-slate-400 truncate block mt-0.5">{p.variant}</span>
              </div>
            </div>

            <span className="col-span-2 text-right font-semibold text-slate-700 text-xs">{p.orders}</span>
            <span className="col-span-2 text-right font-bold text-slate-900 text-xs">{p.sales}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
