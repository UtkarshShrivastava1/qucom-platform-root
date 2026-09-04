import React from 'react';

interface LowStockItem {
  id: string;
  name: string;
  variant: string;
  stock: number;
  colorHex: string;
  isLight?: boolean;
}

const mockLowStock: LowStockItem[] = [
  { id: '1', name: 'Men Solid Cotton Shirt', variant: 'Blue, M', stock: 5, colorHex: '#2563EB' },
  { id: '2', name: 'Men Checked Shirt', variant: 'Red, M', stock: 7, colorHex: '#DC2626' },
  { id: '3', name: 'Men Plain T-shirt', variant: 'Black, L', stock: 6, colorHex: '#0F172A' },
  { id: '4', name: 'Men Polo T-shirt', variant: 'White, L', stock: 4, colorHex: '#E2E8F0', isLight: true },
  { id: '5', name: 'Men Graphic Print T-shirt', variant: 'Olive Green, L', stock: 3, colorHex: '#556B2F' },
];

interface LowStockWarningsProps {
  onAddStock?: () => void;
}

export const LowStockWarnings: React.FC<LowStockWarningsProps> = ({ onAddStock }) => {
  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2 h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900">Low Stock Alert</h3>
        <button type="button" className="text-[11px] font-semibold text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-100 text-xs">
        {mockLowStock.map((item) => (
          <div key={item.id} className="py-1.5 flex items-center justify-between hover:bg-slate-50/80 rounded-lg px-1 transition-colors">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs border border-slate-200/60"
                style={{ backgroundColor: item.colorHex }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`w-3.5 h-3.5 ${item.isLight ? 'text-slate-600' : 'text-white opacity-85'}`}
                  fill="currentColor"
                >
                  <path d="M16 2l4 4-2 3-2-1v14H8V8L6 9 4 6l4-4h2a3 3 0 004 0h2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-slate-800 truncate text-[11px] leading-tight">{item.name}</h4>
                <span className="text-[9px] text-slate-400 truncate block mt-0.5">{item.variant}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <span className="text-[11px] text-slate-500 font-medium">
                Stock: <strong className="text-rose-600 font-bold ml-0.5">{item.stock}</strong>
              </span>
              <button
                type="button"
                onClick={onAddStock}
                className="px-2 py-0.5 rounded-lg border border-blue-200 bg-blue-50/40 hover:bg-blue-100/60 text-blue-600 text-[10px] font-semibold transition-colors"
              >
                Restock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
