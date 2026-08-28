import React from 'react';
import { X, Edit2 } from 'lucide-react';
import { useAuthStore } from '../../../stores/authStore.js';

interface ProfileInformationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileInformationDrawer: React.FC<ProfileInformationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuthStore();

  if (!isOpen) return null;

  const storeName = user?.fullName || 'Fashion Hub';
  const email = user?.email || 'support@fashionhub.com';
  const phone = user?.phone || '+91 98765 43210';

  const categories = ['Fashion', 'Apparel', "Men's Wear", "Women's Wear", 'Accessories'];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Slide-out Panel */}
      <div className="relative w-full max-w-md bg-white text-slate-800 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Profile Information</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Section 1: Basic Information */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">Basic Information</h3>
              <button
                type="button"
                onClick={() => alert('Edit Basic Info')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Store Name</span>
                <span className="font-semibold text-slate-800">{storeName}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Business Email</span>
                <span className="font-medium text-slate-800">{email}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Phone Number</span>
                <span className="font-medium text-slate-800">{phone}</span>
              </div>
              <div className="flex items-start justify-between py-1">
                <span className="text-slate-500 shrink-0">Business Address</span>
                <span className="font-medium text-slate-800 text-right max-w-[220px] leading-relaxed">
                  123, MG Road, Andheri West, Mumbai, Maharashtra - 400058
                </span>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Section 2: Bank Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">Bank Details</h3>
              <button
                type="button"
                onClick={() => alert('Edit Bank Details')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Bank Name</span>
                <span className="font-semibold text-slate-800">HDFC Bank</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Account Holder Name</span>
                <span className="font-semibold text-slate-800">{storeName}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Account Number</span>
                <span className="font-mono text-slate-800 font-semibold">50200012345678</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">IFSC Code</span>
                <span className="font-mono text-slate-800 font-semibold">HDFC0001234</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Section 3: Store Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">Store Details</h3>
              <button
                type="button"
                onClick={() => alert('Edit Store Details')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-slate-500 shrink-0">Store Description</span>
                <span className="font-medium text-slate-800 text-right max-w-[220px] leading-relaxed">
                  We bring you the latest fashion collection with best quality and affordable prices.
                </span>
              </div>

              <div>
                <span className="text-slate-500 block mb-2">Store Category</span>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-2.5 py-1 rounded-lg bg-blue-50/60 text-blue-700 border border-blue-100 text-[11px] font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500">Store Logo</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#081028] text-white flex flex-col items-center justify-center text-[8px] font-black uppercase leading-tight tracking-tight shadow-sm">
                    <span>FASHION</span>
                    <span>HUB</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Change Logo')}
                    className="text-[11px] font-semibold text-blue-600 hover:underline"
                  >
                    View / Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Close Button */}
        <div className="p-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
