import React from 'react';
import { Package } from 'lucide-react';

interface LowStockItem {
  id: string;
  name: string;
  variant: string;
  stock: number;
  imageBg: string;
}

const mockLowStock: LowStockItem[] = [
  { id: '1', name: 'Men Solid Cotton Shirt', variant: 'Blue, M', stock: 5, imageBg: 'bg-blue-600/60' },
  { id: '2', name: 'Men Checked Shirt', variant: 'Red, M', stock: 7, imageBg: 'bg-rose-700/60' },
  { id: '3', name: 'Men Print T-shirt', variant: 'Black, L', stock: 6, imageBg: 'bg-slate-900' },
  { id: '4', name: 'Men Polo T-shirt', variant: 'White, L', stock: 4, imageBg: 'bg-slate-400' },
  { id: '5', name: 'Men Graphic Print T-shirt', variant: 'Olive Green, L', stock: 3, imageBg: 'bg-amber-900/60' },
];

interface LowStockWarningsProps {
  onAddStock?: () => void;
}

export const LowStockWarnings: React.FC<LowStockWarningsProps> = ({ onAddStock }) => {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Low Stock Alert</h3>
        <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-100 text-xs">
        {mockLowStock.map((item) => (
          <div key={item.id} className="py-2 flex items-center justify-between hover:bg-slate-50 rounded-lg px-1 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <div className={`w-8 h-8 rounded-lg ${item.imageBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
                <Package className="w-4 h-4 opacity-80" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-slate-800 truncate text-xs leading-tight">{item.name}</h4>
                <span className="text-[10px] text-slate-400 truncate block">{item.variant}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-slate-600">
                Stock: <strong className="text-rose-600 font-bold">{item.stock}</strong>
              </span>
              <button
                type="button"
                onClick={onAddStock}
                className="px-2.5 py-1 rounded-md border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-blue-600 text-[11px] font-bold transition-colors"
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
