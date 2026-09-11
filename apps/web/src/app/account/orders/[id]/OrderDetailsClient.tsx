'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle2, 
  MapPin, 
  Download,
  Shield,
  MessageSquare,
  HeadphonesIcon,
  ChevronRight
} from 'lucide-react';
import { branding } from '@repo/shared-types';

export function OrderDetailsClient({ id }: { id: string }) {
  const displayId = id.startsWith('VZT') ? `#${id}` : `#VZT${id}`;
  
  return (
    <div className="min-h-screen bg-[#f4f5f9] pb-24">
      <main className="max-w-md lg:max-w-5xl mx-auto pt-4 relative z-10 flex flex-col gap-4 lg:gap-6 px-0 lg:px-4">
        {/* Title */}
        <div className="px-4 lg:px-0 w-full">
          <h1 className="text-[22px] font-bold text-[#192168]">Order Details</h1>
          <p className="text-[12px] font-medium text-surface-500 mt-0.5">Track and manage your order</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Delivery Status Banner */}
            <div className="mx-4 lg:mx-0 bg-[#ecfdf3] border border-green-200 rounded-xl p-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
              <span className="text-[11px] font-bold text-green-700">Delivered on 08 May 2024, 10:30 AM</span>
            </div>

            {/* Order Item Details */}
            <div className="mx-4 lg:mx-0 bg-white rounded-2xl p-4 shadow-sm border border-surface-200/50">
              <div className="flex items-center justify-between pb-3 border-b border-surface-100">
                <div>
                  <h3 className="text-[12px] font-extrabold text-[#192168]">Order ID: {displayId}</h3>
                  <p className="text-[10px] font-medium text-surface-500 mt-1">08 May 2024, 10:30 AM</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#06B95F]">
                  Delivered <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
              
              <div className="flex gap-4 py-4">
                <div className="w-[60px] h-[70px] rounded-lg overflow-hidden bg-surface-100 flex-shrink-0">
                  {/* Product Image */}
                  <Image 
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200&h=200" 
                    alt="Product"
                    width={60}
                    height={70}
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-[13px] font-extrabold text-[#192168]">Men Graphic Print T-shirt</h4>
                  <p className="text-[10px] font-medium text-surface-500 mt-1">Olive Green • Size: L • Qty: 1</p>
                  <p className="text-[13px] font-extrabold text-[#192168] mt-1.5">₹399</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                <span className="text-[12px] text-[#192168]">
                  Total Amount: <span className="font-extrabold">₹399</span>
                </span>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#1668F6] text-[#1668F6] text-[10px] font-bold hover:bg-blue-50 transition-colors">
                    <Download className="w-3 h-3" /> Download Bill
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-[#1668F6] text-[#1668F6] text-[10px] font-bold hover:bg-blue-50 transition-colors">
                    Buy Again
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mx-4 lg:mx-0 bg-white rounded-2xl p-4 shadow-sm border border-surface-200/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[12px] font-bold text-[#192168]">Delivery Address</h4>
                <button className="text-[10px] font-bold text-[#1668F6] hover:underline">View on Map</button>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#E8F0FE] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#1668F6]" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-[#192168]">Harish Kumar</h5>
                  <p className="text-[10px] font-medium text-surface-500 mt-0.5">123, MG Road, Near City Mall<br/>Indore, Madhya Pradesh - 452001</p>
                  <p className="text-[10px] font-medium text-surface-500 mt-1">Phone: +91 98765 43210</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mx-4 lg:mx-0 space-y-2 mb-4">
              <button className="w-full bg-white rounded-xl p-3 shadow-sm border border-surface-200/50 flex items-center justify-between hover:bg-surface-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-[#192168] block">Feedback</span>
                    <span className="text-[10px] font-medium text-surface-500">Share your experience and help us improve</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-surface-400" />
              </button>
              
              <button className="w-full bg-white rounded-xl p-3 shadow-sm border border-surface-200/50 flex items-center justify-between hover:bg-surface-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                    <HeadphonesIcon className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-[#192168] block">Need Help?</span>
                    <span className="text-[10px] font-medium text-surface-500">Contact our support team for any queries</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-surface-400" />
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[350px] flex flex-col gap-4 shrink-0">
            {/* Delivery OTP */}
            <div className="mx-4 lg:mx-0 bg-white rounded-2xl p-4 shadow-sm border border-surface-200/50 flex gap-4 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#E8F0FE] rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-3.5 h-3.5 text-[#1668F6]" />
                  </div>
                  <h4 className="text-[12px] font-bold text-[#192168]">Delivery OTP</h4>
                  <span className="text-[8px] font-bold text-[#1668F6] bg-[#E8F0FE] px-2 py-0.5 rounded-full">Show to delivery partner</span>
                </div>
                <p className="text-[10px] font-medium text-surface-500 mt-2 leading-relaxed">
                  Share this OTP with the delivery partner to confirm successful delivery
                </p>
              </div>
              <div className="bg-[#fef9f9] border border-rose-100 rounded-xl p-2.5 flex-shrink-0 text-center min-w-[120px]">
                <p className="text-[9px] font-bold text-[#192168]">Your Delivery OTP</p>
                <div className="flex gap-1.5 justify-center mt-1 mb-1">
                    <span className="text-[18px] font-extrabold text-[#1668F6]">7</span>
                    <span className="text-[18px] font-extrabold text-[#1668F6]">3</span>
                    <span className="text-[18px] font-extrabold text-[#1668F6]">8</span>
                    <span className="text-[18px] font-extrabold text-[#1668F6]">2</span>
                    <span className="text-[18px] font-extrabold text-[#1668F6]">1</span>
                    <span className="text-[18px] font-extrabold text-[#1668F6]">6</span>
                </div>
                <p className="text-[7.5px] font-bold text-rose-500 italic">This OTP is unique for this order.</p>
              </div>
            </div>

            {/* Order Tracking */}
            <div className="mx-4 lg:mx-0 bg-white rounded-2xl p-4 shadow-sm border border-surface-200/50">
              <h4 className="text-[12px] font-bold text-[#192168] mb-4">Order Tracking</h4>
              
              <div className="relative pl-6 space-y-5">
                {/* Timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-green-500" />
                
                <div className="relative">
                  <div className="absolute -left-6 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-sm" />
                  <h5 className="text-[11px] font-bold text-[#192168]">Order Confirmed</h5>
                  <p className="text-[10px] font-medium text-surface-500 mt-0.5">08 May 2024, 10:30 AM</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-6 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-sm" />
                  <h5 className="text-[11px] font-bold text-[#192168]">Packed</h5>
                  <p className="text-[10px] font-medium text-surface-500 mt-0.5">08 May 2024, 02:15 PM</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-6 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-sm" />
                  <h5 className="text-[11px] font-bold text-[#192168]">Out for Delivery</h5>
                  <p className="text-[10px] font-medium text-surface-500 mt-0.5">08 May 2024, 09:45 AM</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-6 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-sm" />
                  <h5 className="text-[11px] font-bold text-[#06B95F]">Delivered</h5>
                  <p className="text-[10px] font-medium text-surface-500 mt-0.5">08 May 2024, 10:30 AM</p>
                </div>
              </div>
              
              <div className="mt-5 bg-[#ecfdf3] rounded-lg p-3 flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                <p className="text-[10px] font-medium text-green-700">Your order has been delivered. Thank you for shopping with {branding.appName}!</p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="mx-4 lg:mx-0 bg-white rounded-2xl p-4 shadow-sm border border-surface-200/50">
              <h4 className="text-[12px] font-bold text-[#192168] mb-3">Payment Summary</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#E8F0FE] rounded flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-[#1668F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    </div>
                    <span className="text-[11px] text-[#192168]">Payment Method</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#192168]">UPI</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-surface-500">Subtotal</span>
                  <span className="text-[11px] font-bold text-[#192168]">₹399</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-surface-500">Delivery Charges</span>
                  <span className="text-[11px] font-bold text-green-600">FREE</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-surface-100 mt-2">
                  <span className="text-[12px] font-bold text-[#192168]">Total Amount</span>
                  <span className="text-[14px] font-extrabold text-[#192168]">₹399</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
