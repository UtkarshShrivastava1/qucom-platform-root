import React from 'react';
import { ChevronRight, ShoppingCart } from 'lucide-react';

interface LiveOrderAlertsProps {
  onNavigateOrders?: () => void;
}

interface OrderRow {
  id: string;
  customer: string;
  itemsCount: number;
  amount: string;
  time: string;
}

const mockOrders: OrderRow[] = [
  { id: '#ORD-10325', customer: 'Rohan Verma', itemsCount: 3, amount: '₹2,799', time: 'Just now' },
  { id: '#ORD-10324', customer: 'Sneha Kapoor', itemsCount: 2, amount: '₹1,649', time: '5 min ago' },
  { id: '#ORD-10323', customer: 'Arjun Mehta', itemsCount: 1, amount: '₹899', time: '15 min ago' },
  { id: '#ORD-10322', customer: 'Neha Singh', itemsCount: 4, amount: '₹3,499', time: '25 min ago' },
  { id: '#ORD-10321', customer: 'Rahul Sharma', itemsCount: 2, amount: '₹3,897', time: '35 min ago' },
];

export const LiveOrderAlerts: React.FC<LiveOrderAlertsProps> = ({ onNavigateOrders }) => {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>🔥</span>
              <span>New Orders</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200/60">
              5 New Orders
            </span>
          </div>

          {/* 3D Basket illustration or icon */}
          <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
            <ShoppingCart className="w-4 h-4" />
          </div>
        </div>

        {/* Orders Table */}
        <div className="divide-y divide-slate-100 text-xs">
          {/* Table Header */}
          <div className="grid grid-cols-12 py-2 text-[11px] font-semibold text-slate-400">
            <span className="col-span-3">Order ID</span>
            <span className="col-span-3">Customer</span>
            <span className="col-span-2">Items</span>
            <span className="col-span-2 text-right">Amount</span>
            <span className="col-span-2 text-right">Time</span>
          </div>

          {/* Table Rows */}
          {mockOrders.map((order) => (
            <div
              key={order.id}
              onClick={onNavigateOrders}
              className="grid grid-cols-12 py-2.5 items-center hover:bg-slate-50 rounded-lg cursor-pointer transition-colors px-1"
            >
              <span className="col-span-3 font-semibold text-blue-600 truncate">{order.id}</span>
              <span className="col-span-3 text-slate-700 font-medium truncate">{order.customer}</span>
              <span className="col-span-2 text-slate-500 truncate">{order.itemsCount} items</span>
              <span className="col-span-2 text-right font-bold text-slate-900">{order.amount}</span>
              <div className="col-span-2 flex items-center justify-end gap-1">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100 whitespace-nowrap">
                  {order.time}
                </span>
                <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-width Solid Orange Action Button */}
      <div className="pt-3">
        <button
          type="button"
          onClick={onNavigateOrders}
          className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <span>View All Orders</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
