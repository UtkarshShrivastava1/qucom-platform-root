import React from 'react';
import { Modal } from '../ui/Modal.js';
import { Button } from '../ui/Button.js';
import { Badge } from '../ui/Badge.js';
import { MerchantOrder } from './OrdersTable.js';
import { Phone, MapPin, KeyRound, Package, Check, Truck, Download, AlertCircle } from 'lucide-react';

interface OrderDetailModalProps {
  order: MerchantOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: MerchantOrder['status']) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order Details: ${order.orderNumber}`} maxWidth="xl">
      <div className="space-y-5">
        {/* Order Status & OTP Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Current Status</span>
            <div className="flex items-center gap-2">
              <Badge variant="brand" size="md" className="capitalize">
                {order.status.replace(/_/g, ' ')}
              </Badge>
              <span className="text-xs text-slate-400">Placed {order.createdAt}</span>
            </div>
          </div>

          <div className="p-3.5 bg-brand-500/10 border border-brand-500/20 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] text-brand-300 uppercase tracking-wider block">Delivery Handoff OTP</span>
              <span className="text-xl font-mono font-bold text-brand-300 tracking-wider">{order.otp}</span>
            </div>
            <KeyRound className="w-6 h-6 text-brand-400" />
          </div>
        </div>

        {/* Customer Information */}
        <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-xl space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Customer & Delivery Info</h4>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-200 gap-1">
            <span className="font-bold">{order.customerName}</span>
            <a href={`tel:${order.customerPhone}`} className="text-brand-400 hover:underline flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>{order.customerPhone}</span>
            </a>
          </div>
          <div className="text-xs text-slate-300 flex items-start gap-1.5 pt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
            <span>{order.deliveryAddress}</span>
          </div>
        </div>

        {/* Line Items List */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Itemized Products</h4>
          <div className="border border-slate-800 rounded-xl divide-y divide-slate-800 bg-slate-950/60 overflow-hidden text-xs">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-200">{item.name}</div>
                  <span className="text-slate-500">Qty: {item.quantity} × ₹ {item.price}</span>
                </div>
                <div className="font-bold text-slate-100">₹ {(item.quantity * item.price).toLocaleString('en-IN')}</div>
              </div>
            ))}
            <div className="p-3 bg-slate-900/60 flex items-center justify-between font-bold text-sm text-slate-100">
              <span>Total Payable ({order.paymentMethod})</span>
              <span className="text-brand-300">₹ {order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Workflow Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <Button variant="outline" size="sm" onClick={() => alert('Invoice generated')}>
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Download Invoice</span>
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {order.status === 'pending' && (
              <Button
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => onUpdateStatus(order.id, 'confirmed')}
              >
                <Check className="w-3.5 h-3.5 mr-1" />
                <span>Confirm Order</span>
              </Button>
            )}

            {order.status === 'confirmed' && (
              <Button
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => onUpdateStatus(order.id, 'packed')}
              >
                <Package className="w-3.5 h-3.5 mr-1" />
                <span>Pack & Ready</span>
              </Button>
            )}

            {order.status === 'packed' && (
              <Button
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => onUpdateStatus(order.id, 'out_for_delivery')}
              >
                <Truck className="w-3.5 h-3.5 mr-1" />
                <span>Dispatch for Delivery</span>
              </Button>
            )}

            {order.status === 'out_for_delivery' && (
              <Button
                variant="primary"
                size="sm"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500"
                onClick={() => onUpdateStatus(order.id, 'delivered')}
              >
                <Check className="w-3.5 h-3.5 mr-1" />
                <span>Verify OTP & Mark Delivered</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
