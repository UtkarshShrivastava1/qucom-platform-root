'use client';

import React from 'react';
import { CalendarDays, Users, ShoppingBag, ShieldCheck, FileText, ChevronRight, Info, UserCheck, CreditCard, RotateCcw, Ban, ShieldAlert, Gavel, HeadphonesIcon } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f4f5f9] pb-24 pt-4">
      <div className="mx-auto max-w-3xl px-5">
        
        {/* Header Section */}
        <div className="relative mb-6">
          <div className="pr-24">
            <h1 className="text-[22px] font-bold text-[#192168] mb-2">Terms & Conditions</h1>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-3">Please read these terms and conditions carefully before using Viztore.</p>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#192168]">
              <CalendarDays className="h-3.5 w-3.5 text-[#1668F6]" />
              Last updated: 20 May 2025
            </div>
          </div>
          {/* Mock Graphic Container */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-contain bg-no-repeat bg-right opacity-90"
               style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/2830/2830305.png')" }}>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-surface-200/50 mb-6">
          <h3 className="text-sm font-bold text-[#192168] mb-4">Key Highlights</h3>
          <div className="grid grid-cols-4 gap-2">
            <HighlightItem 
              icon={<Users className="h-4 w-4 text-blue-500" />} 
              title="User Agreement" 
              desc="By using Viztore, you agree to these terms." 
            />
            <HighlightItem 
              icon={<ShoppingBag className="h-4 w-4 text-emerald-500" />} 
              title="Use of Services" 
              desc="Use our app and services only for lawful purposes." 
            />
            <HighlightItem 
              icon={<ShieldCheck className="h-4 w-4 text-purple-500" />} 
              title="Your Responsibilities" 
              desc="Provide accurate information and keep your account secure." 
            />
            <HighlightItem 
              icon={<FileText className="h-4 w-4 text-amber-500" />} 
              title="Policy Updates" 
              desc="We may update these terms. Continued use means you accept the changes." 
            />
          </div>
        </div>

        {/* Terms Sections */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-surface-200/50 mb-6">
          <h3 className="text-sm font-bold text-[#192168] p-3 pb-1">Terms & Conditions</h3>
          <div className="flex flex-col">
            <TermSection icon={<FileText className="h-4 w-4 text-[#1668F6]" />} title="1. Acceptance of Terms" desc="By accessing or using Viztore, you agree to be bound by these Terms and Conditions." />
            <TermSection icon={<Info className="h-4 w-4 text-[#1668F6]" />} title="2. About Viztore" desc="Learn about Viztore, our platform and the services we provide." />
            <TermSection icon={<UserCheck className="h-4 w-4 text-[#1668F6]" />} title="3. User Accounts" desc="Rules and responsibilities related to creating and managing your account." />
            <TermSection icon={<ShoppingBag className="h-4 w-4 text-[#1668F6]" />} title="4. Use of Services" desc="Guidelines for using Viztore and what you can expect from our services." />
            <TermSection icon={<CreditCard className="h-4 w-4 text-[#1668F6]" />} title="5. Orders and Payments" desc="Information about placing orders, pricing and payment methods." />
            <TermSection icon={<RotateCcw className="h-4 w-4 text-[#1668F6]" />} title="6. Returns and Refunds" desc="Our policy on returns, refunds and cancellations." />
            <TermSection icon={<Ban className="h-4 w-4 text-[#1668F6]" />} title="7. Prohibited Activities" desc="Activities that are not allowed on Viztore." />
            <TermSection icon={<ShieldAlert className="h-4 w-4 text-[#1668F6]" />} title="8. Limitation of Liability" desc="Limitations of our liability to the fullest extent permitted by law." />
            <TermSection icon={<Gavel className="h-4 w-4 text-[#1668F6]" />} title="9. Governing Law" desc="These terms are governed by the laws of India." />
            <TermSection icon={<HeadphonesIcon className="h-4 w-4 text-[#1668F6]" />} title="10. Contact Us" desc="How to reach us for any questions about these terms." />
          </div>
        </div>

        {/* Acknowledgment Banner */}
        <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 border border-emerald-100">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <p className="text-[10px] text-emerald-800 font-medium leading-relaxed">
            By continuing to use Viztore, you acknowledge that you have read, understood and agree to these Terms & Conditions.
          </p>
        </div>

      </div>
    </main>
  );
}

function HighlightItem({ icon, title, desc }: any) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-2 h-8 w-8 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100">
        {icon}
      </div>
      <h4 className="text-[9px] font-bold text-[#192168] mb-1 leading-tight">{title}</h4>
      <p className="text-[8px] text-gray-500 leading-tight px-1">{desc}</p>
    </div>
  );
}

function TermSection({ icon, title, desc }: any) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 border border-blue-100">
          {icon}
        </div>
        <div>
          <h4 className="text-xs font-bold text-gray-900 mb-0.5">{title}</h4>
          <p className="text-[10px] text-gray-500 leading-snug pr-4">{desc}</p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
    </div>
  );
}
