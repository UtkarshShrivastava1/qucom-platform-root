'use client';

import React from 'react';
import { Rocket, Users, TrendingUp, ShieldCheck, HeadphonesIcon, Megaphone, PieChart, Calendar, Wallet, ChevronRight } from 'lucide-react';

export default function SellPage() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-4">
      <div className="mx-auto max-w-3xl px-5">
        
        {/* Hero Section */}
        <div className="relative mb-6 pb-6 border-b border-gray-100">
          <div className="pr-36">
            <h1 className="text-2xl font-black text-[#192168] mb-4">Sell on Viztore</h1>
            <p className="text-sm text-gray-600 leading-relaxed font-medium max-w-[220px]">Start selling and grow your business with India's trusted local marketplace</p>
          </div>
          {/* Mock Graphic Container */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-contain bg-no-repeat bg-right opacity-90"
               style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/3081/3081986.png')" }}>
          </div>
        </div>

        {/* Action Banner */}
        <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4 border border-emerald-100 mb-8 cursor-pointer hover:bg-emerald-100/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
              <Rocket className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-900 text-sm">Grow your business with Viztore</h4>
              <p className="text-[10px] text-emerald-700 leading-tight mt-0.5">Reach more local customers and boost your sales</p>
            </div>
          </div>
          <button className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700 whitespace-nowrap">
            Get Started <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Why Sell */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-[#192168] mb-5">Why sell on Viztore?</h3>
          <div className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-4">
            <FeatureIcon 
              icon={<Users className="h-6 w-6 text-blue-500" />} 
              title="Local Customers" 
              desc="Reach thousands of local buyers near you" 
              bg="bg-blue-50" 
            />
            <FeatureIcon 
              icon={<TrendingUp className="h-6 w-6 text-emerald-500" />} 
              title="Grow Your Business" 
              desc="Increase sales and expand your brand" 
              bg="bg-emerald-50" 
            />
            <FeatureIcon 
              icon={<ShieldCheck className="h-6 w-6 text-purple-500" />} 
              title="Secure & Reliable" 
              desc="Safe payments and seller protection" 
              bg="bg-purple-50" 
            />
            <FeatureIcon 
              icon={<HeadphonesIcon className="h-6 w-6 text-orange-500" />} 
              title="Dedicated Support" 
              desc="Get help at every step of your journey" 
              bg="bg-orange-50" 
            />
          </div>
        </div>

        {/* 3 Simple Steps */}
        <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#192168] mb-6">Start Selling in 3 Simple Steps</h3>
          <div className="flex justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-4 left-[10%] right-[10%] h-px border-t border-dashed border-gray-300 z-0"></div>
            
            <Step number="1" title="Register" desc="Sign up and provide your business details" />
            <Step number="2" title="Verify & Setup" desc="Verify your documents and set up your store" />
            <Step number="3" title="List & Sell" desc="List your products and start selling instantly" />
          </div>
        </div>

        {/* Tools to Grow */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-[#192168] mb-5">Tools to Grow Your Business</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <ToolCard 
              icon={<Megaphone className="h-5 w-5 text-[#1668F6]" />} 
              title="Promotions & Ads" 
              desc="Increase visibility and boost sales" 
            />
            <ToolCard 
              icon={<PieChart className="h-5 w-5 text-emerald-500" />} 
              title="Business Insights" 
              desc="Track performance and growth" 
            />
            <ToolCard 
              icon={<Calendar className="h-5 w-5 text-purple-500" />} 
              title="Inventory Manager" 
              desc="Manage stock and orders easily" 
            />
            <ToolCard 
              icon={<Wallet className="h-5 w-5 text-orange-500" />} 
              title="Payouts" 
              desc="Easy withdrawals and settlements" 
            />
          </div>
        </div>

        {/* Need Help Banner */}
        <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-3">
            <HeadphonesIcon className="h-6 w-6 text-gray-500" />
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Need Help?</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Our team is here to help you at every step.</p>
            </div>
          </div>
          <button className="flex items-center gap-1 text-xs font-bold text-[#1668F6]">
            Contact Support <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </main>
  );
}

function FeatureIcon({ icon, title, desc, bg }: any) {
  return (
    <div className="flex flex-col items-center text-center px-1">
      <div className={`flex h-14 w-14 items-center justify-center rounded-full ${bg} mb-3`}>
        {icon}
      </div>
      <h4 className="text-xs font-bold text-gray-900 mb-1 leading-tight">{title}</h4>
      <p className="text-[10px] text-gray-500 leading-snug">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }: any) {
  return (
    <div className="flex flex-col items-center text-center z-10 w-1/3 px-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#1668F6] font-bold text-sm mb-3 border border-blue-100">
        {number}
      </div>
      <h4 className="text-[11px] font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-[9px] text-gray-500 leading-snug">{desc}</p>
    </div>
  );
}

function ToolCard({ icon, title, desc }: any) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm text-center items-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 mb-3 border border-gray-100">
        {icon}
      </div>
      <h4 className="text-[11px] font-bold text-gray-900 mb-1 leading-tight">{title}</h4>
      <p className="text-[9px] text-gray-500 leading-snug">{desc}</p>
    </div>
  );
}
