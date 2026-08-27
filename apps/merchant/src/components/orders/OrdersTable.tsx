import React, { useState } from 'react';
import { Card } from '../ui/Card.js';
import { Badge } from '../ui/Badge.js';
import { Button } from '../ui/Button.js';
import { Input } from '../ui/Input.js';
import { Search, Eye, Filter, CheckCircle2, Truck, PackageCheck, Clock } from 'lucide-react';

export interface MerchantOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: Array<{ name: string; quantity: number; price: number; variant?: string }>;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  fulfilmentMode: 'deliver' | 'pickup' | 'reserve';
  status: 'pending' | 'confirmed' | 'packed' | 'out_for_delivery' | 'delivered' | 'cancelled';
  otp: string;
  createdAt: string;
}

const mockOrders: MerchantOrder[] = [
  {
    id: '1',
    orderNumber: 'ORD-2026-901',
    customerName: 'Aarav Patel',
    customerPhone: '+91 98765 43210',
    deliveryAddress: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru',
    items: [
      { name: 'Slim Fit Cotton Shirt (Navy, L)', quantity: 2, price: 1299 },
      { name: 'Pure Linen Trousers (Beige, 34)', quantity: 1, price: 1899 },
    ],
    totalAmount: 4497,
    paymentMethod: 'UPI',
    fulfilmentMode: 'deliver',
    status: 'pending',
    otp: '4829',
    createdAt: '10 mins ago',
  },
  {
    id: '2',
    orderNumber: 'ORD-2026-902',
    customerName: 'Sneha Kulkarni',
    customerPhone: '+91 98112 34567',
    deliveryAddress: 'In-Store Customer Pickup',
    items: [
      { name: 'Leather Formal Shoes (Brown, UK 9)', quantity: 1, price: 2999 },
    ],
    totalAmount: 2999,
    paymentMethod: 'Card',
    fulfilmentMode: 'pickup',
    status: 'confirmed',
    otp: '9102',
    createdAt: '25 mins ago',
  },
  {
    id: '3',
    orderNumber: 'ORD-2026-903',
    customerName: 'Karthik Raja',
    customerPhone: '+91 97401 22334',
    deliveryAddress: '12th Cross, Indiranagar, Bengaluru',
    items: [
      { name: 'Casual Denim Jacket (Blue, M)', quantity: 1, price: 2499 },
      { name: 'Graphic Printed Tee (White, M)', quantity: 2, price: 699 },
    ],
    totalAmount: 3897,
    paymentMethod: 'UPI',
    fulfilmentMode: 'deliver',
    status: 'packed',
    otp: '3341',
    createdAt: '1 hour ago',
  },
  {
    id: '4',
    orderNumber: 'ORD-2026-904',
    customerName: 'Divya Nambiar',
    customerPhone: '+91 99887 76655',
    deliveryAddress: '5th Main, Koramangala 4th Block, Bengaluru',
    items: [
      { name: 'Silk Embroidered Saree (Maroon)', quantity: 1, price: 4500 },
    ],
    totalAmount: 4500,
    paymentMethod: 'COD',
    fulfilmentMode: 'deliver',
    status: 'out_for_delivery',
    otp: '7721',
    createdAt: '2 hours ago',
  },
  {
    id: '5',
    orderNumber: 'ORD-2026-905',
    customerName: 'Rohan Verma',
    customerPhone: '+91 96543 21098',
    deliveryAddress: 'HSR Layout Sector 2, Bengaluru',
    items: [
      { name: 'Chino Shorts (Khaki, 32)', quantity: 2, price: 899 },
    ],
    totalAmount: 1798,
    paymentMethod: 'UPI',
    fulfilmentMode: 'deliver',
    status: 'delivered',
    otp: '5519',
    createdAt: '5 hours ago',
  },
];

const statusBadgeMap: Record<MerchantOrder['status'], { label: string; variant: 'warning' | 'info' | 'brand' | 'success' | 'danger' }> = {
  pending: { label: 'Pending Approval', variant: 'warning' },
  confirmed: { label: 'Confirmed', variant: 'info' },
  packed: { label: 'Packed & Ready', variant: 'brand' },
  out_for_delivery: { label: 'Out for Delivery', variant: 'info' },
  delivered: { label: 'Delivered', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'danger' },
};

interface OrdersTableProps {
  onSelectOrder: (order: MerchantOrder) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ onSelectOrder }) => {
  const [orders, setOrders] = useState<MerchantOrder[]>(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['all', 'pending', 'confirmed', 'packed', 'out_for_delivery', 'delivered'];

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <Card className="p-5 space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Orders Management</h2>
          <p className="text-xs text-slate-400">Track and fulfill incoming customer transactions in real-time</p>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search order ID, name or phone..."
            leftIcon={<Search className="w-4 h-4" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800 text-xs">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedStatus(tab)}
            className={`px-3.5 py-2 rounded-xl font-semibold capitalize whitespace-nowrap transition-all ${
              selectedStatus === tab
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {tab.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="p-3.5">Order ID</th>
              <th className="p-3.5">Customer</th>
              <th className="p-3.5">Items</th>
              <th className="p-3.5">Total & Payment</th>
              <th className="p-3.5">Mode</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  No orders found matching this filter.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const badge = statusBadgeMap[order.status];
                return (
                  <tr key={order.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-200">
                      <div>{order.orderNumber}</div>
                      <span className="text-[10px] text-slate-500">{order.createdAt}</span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-200">{order.customerName}</div>
                      <div className="text-[11px] text-slate-400">{order.customerPhone}</div>
                    </td>
                    <td className="p-3.5 max-w-xs truncate text-slate-300">
                      {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-100">₹ {order.totalAmount.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-slate-400">{order.paymentMethod}</div>
                    </td>
                    <td className="p-3.5">
                      <Badge variant={order.fulfilmentMode === 'deliver' ? 'brand' : 'info'} size="sm">
                        {order.fulfilmentMode === 'deliver' ? 'Deliver' : 'Pickup'}
                      </Badge>
                    </td>
                    <td className="p-3.5">
                      <Badge variant={badge.variant} size="sm">
                        {badge.label}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onSelectOrder(order)}
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        <span>Manage</span>
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
