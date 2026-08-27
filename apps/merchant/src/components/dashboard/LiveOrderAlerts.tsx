import React from 'react';
import { Card } from '../ui/Card.js';
import { Badge } from '../ui/Badge.js';
import { Button } from '../ui/Button.js';
import { Clock, MapPin, Check, ArrowRight } from 'lucide-react';

interface OrderItem {
  id: string;
  customerName: string;
  distance: string;
  itemsSummary: string;
  totalAmount: number;
  timeAgo: string;
  mode: 'deliver' | 'pickup' | 'reserve';
}

const recentOrders: OrderItem[] = [
  {
    id: 'ORD-8942',
    customerName: 'Ananya Deshmukh',
    distance: '1.2 km away',
    itemsSummary: 'Cotton Polo Shirt (M) x 2, Chinos (32) x 1',
    totalAmount: 2450,
    timeAgo: '4 mins ago',
    mode: 'deliver',
  },
  {
    id: 'ORD-8941',
    customerName: 'Vikram Mehta',
    distance: '0.8 km away',
    itemsSummary: 'Running Shoes (UK 9) x 1',
    totalAmount: 3200,
    timeAgo: '12 mins ago',
    mode: 'pickup',
  },
  {
    id: 'ORD-8940',
    customerName: 'Pooja Iyer',
    distance: '2.4 km away',
    itemsSummary: 'Embroidered Kurti (L) x 1, Dupatta x 1',
    totalAmount: 1890,
    timeAgo: '25 mins ago',
    mode: 'deliver',
  },
];

export const LiveOrderAlerts: React.FC<{ onNavigateOrders: () => void }> = ({ onNavigateOrders }) => {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <h3 className="text-base font-bold text-slate-100">Live Incoming Orders</h3>
        </div>
        <button
          onClick={onNavigateOrders}
          className="text-xs text-brand-400 hover:text-brand-300 font-semibold inline-flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-200">{order.id}</span>
                <Badge variant={order.mode === 'deliver' ? 'brand' : 'info'} size="sm">
                  {order.mode === 'deliver' ? 'Home Delivery' : 'Store Pickup'}
                </Badge>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {order.timeAgo}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{order.itemsSummary}</p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>Customer: <strong className="text-slate-300">{order.customerName}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {order.distance}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 block">Total</span>
                <span className="text-sm font-bold text-slate-100">₹ {order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <Button size="sm" variant="primary">
                <Check className="w-3.5 h-3.5 mr-1" />
                <span>Accept</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
