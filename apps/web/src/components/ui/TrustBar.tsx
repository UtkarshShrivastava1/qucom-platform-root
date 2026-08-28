import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

const trustItems = [
  { icon: Truck, label: 'Fast Delivery', description: 'Same day in your area' },
  { icon: RotateCcw, label: 'Easy Returns', description: '7-day return policy' },
  { icon: ShieldCheck, label: 'Secure Payments', description: '100% safe checkout' },
  { icon: Headphones, label: '24×7 Support', description: 'Always here to help' },
];

export function TrustBar() {
  return (
    <div className="w-full glass-light rounded-2xl p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trustItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-surface-200">{item.label}</p>
              <p className="text-xs text-surface-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
