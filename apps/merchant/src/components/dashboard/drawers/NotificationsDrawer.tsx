import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Package,
  Boxes,
  Landmark,
  ShieldAlert,
  Truck,
  Tag,
  Store,
  ArrowRight,
} from 'lucide-react';
import { branding } from '../../../lib/branding.js';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type NotificationCategory = 'all' | 'orders' | 'inventory' | 'system';

interface NotificationItem {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    category: 'orders',
    title: 'New order received',
    description: 'Order #VZT10325 has been placed by Rohan Verma for ₹2,799',
    time: 'Just now',
    isUnread: true,
    icon: ShoppingBag,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    id: '2',
    category: 'orders',
    title: 'New order received',
    description: 'Order #VZT10324 has been placed by Sneha Kapoor for ₹1,649',
    time: '5m ago',
    isUnread: true,
    icon: ShoppingBag,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    id: '3',
    category: 'inventory',
    title: 'Low stock alert',
    description: 'Men Solid Cotton Shirt (Blue, M) is running low. Only 5 left in stock.',
    time: '15m ago',
    isUnread: false,
    icon: Boxes,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
  },
  {
    id: '4',
    category: 'system',
    title: 'Payout initiated',
    description: 'Your payout of ₹24,860 has been initiated and will be processed soon.',
    time: '1h ago',
    isUnread: false,
    icon: Landmark,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
  },
  {
    id: '5',
    category: 'system',
    title: 'System update',
    description: 'We have updated our Returns & Refund policy. Please review the changes.',
    time: '2h ago',
    isUnread: false,
    icon: ShieldAlert,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
  },
  {
    id: '6',
    category: 'orders',
    title: 'Order shipped',
    description: 'Order #VZT10318 has been shipped via Delhivery.',
    time: '3h ago',
    isUnread: false,
    icon: Truck,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    id: '7',
    category: 'inventory',
    title: 'Stock updated',
    description: 'Men Graphic Print T-shirt (Olive Green, L) stock has been updated.',
    time: '5h ago',
    isUnread: false,
    icon: Tag,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
  },
  {
    id: '8',
    category: 'system',
    title: `Welcome to ${branding.appName}!`,
    description: 'Complete your store setup and start selling to grow your business.',
    time: '1d ago',
    isUnread: false,
    icon: Store,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
];

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<NotificationCategory>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  if (!isOpen) return null;

  const filtered = activeTab === 'all'
    ? notifications
    : notifications.filter((n) => n.category === activeTab);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Slide-out Panel */}
      <div className="relative w-full max-w-md bg-white text-slate-800 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Notifications</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={markAllRead}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Mark all as read
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-slate-100 text-xs font-medium overflow-x-auto">
          {[
            { id: 'all', label: 'All', count: 8 },
            { id: 'orders', label: 'Orders', count: 5 },
            { id: 'inventory', label: 'Inventory', count: 2 },
            { id: 'system', label: 'System', count: 1 },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as NotificationCategory)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filtered.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors relative ${
                  n.isUnread ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className={`w-9 h-9 rounded-xl ${n.iconBg} ${n.iconColor} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{n.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.description}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block font-medium">{n.time}</span>
                </div>
                {n.isUnread && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5"
          >
            <span>View all notifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
