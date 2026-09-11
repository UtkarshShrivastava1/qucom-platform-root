'use client';

import React, { useState } from 'react';
import { Ticket, ChevronDown } from 'lucide-react';
import Image from 'next/link';

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = [
    { label: 'All', count: 8 },
    { label: 'Coupons', count: 5 },
    { label: 'Bank Offers', count: 3 },
  ];

  return (
    <main className="min-h-screen bg-white pb-24 pt-4">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-[#192168]">Coupons & Offers</h1>
          <p className="text-sm text-gray-500 mt-1">Save more on your favourite products</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors relative ${
                activeTab === tab.label
                  ? 'text-[#1668F6]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
              {activeTab === tab.label && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1668F6] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="flex items-center gap-2 mb-8 rounded-xl border border-gray-200 p-1.5 focus-within:border-[#1668F6] focus-within:ring-1 focus-within:ring-[#1668F6] transition-all">
          <div className="pl-3 text-gray-400">
            <Ticket className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Enter coupon code"
            className="flex-1 bg-transparent py-2 px-2 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
          />
          <button className="rounded-lg bg-[#1668F6] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700">
            Apply
          </button>
        </div>

        {/* Available Coupons */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#192168]">Available Coupons</h2>
            <button className="text-xs font-bold text-[#1668F6]">View T&C</button>
          </div>
          <div className="flex flex-col gap-4">
            <CouponCard
              title="FLAT"
              value="₹200"
              code="VIZ200"
              badge="Best Deal"
              desc="Get flat ₹200 off on orders above ₹1499"
              date="Valid till 30 Jun 2024"
              colorClass="bg-emerald-50 text-emerald-600"
              borderColor="border-emerald-100"
            />
            <CouponCard
              title="FLAT"
              value="₹100"
              code="SAVE100"
              desc="Get flat ₹100 off on orders above ₹999"
              date="Valid till 25 May 2024"
              colorClass="bg-blue-50 text-blue-600"
              borderColor="border-blue-100"
            />
            <CouponCard
              title="EXTRA"
              value="5%"
              code="EXTRA5"
              desc="Get extra 5% off on all prepaid orders"
              date="Valid till 20 May 2024"
              colorClass="bg-orange-50 text-orange-600"
              borderColor="border-orange-100"
            />
            <CouponCard
              title="FLAT"
              value="₹50"
              code="NEW50"
              badge="New User"
              badgeClass="bg-purple-100 text-purple-600"
              desc="Flat ₹50 off for new users on orders above ₹499"
              date="Valid till 31 May 2024"
              colorClass="bg-purple-50 text-purple-600"
              borderColor="border-purple-100"
            />
            <CouponCard
              title="EXTRA"
              value="10%"
              code="WEEKEND10"
              desc="Extra 10% off on minimum order of ₹1999"
              date="Valid till 19 May 2024"
              colorClass="bg-teal-50 text-teal-600"
              borderColor="border-teal-100"
            />
          </div>
        </div>

        {/* Bank Offers */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#192168]">Bank Offers</h2>
            <button className="text-xs font-bold text-[#1668F6]">View All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <BankOfferCard bank="SBI" title="10% Instant Discount*" desc="on SBI Credit Cards" />
            <BankOfferCard bank="HDFC" title="₹750 Instant Discount*" desc="on HDFC Credit Cards" />
            <BankOfferCard bank="ICICI" title="10% Instant Discount*" desc="on ICICI Credit Cards" />
            <BankOfferCard bank="Axis" title="₹500 Instant Discount*" desc="on Axis Credit Cards" />
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 overflow-hidden border border-blue-100">
          <div className="relative z-10 w-3/5">
            <p className="text-xs font-bold text-[#1668F6] mb-1">Super Saver Deal!</p>
            <h3 className="text-2xl font-bold text-[#192168] mb-1 leading-tight">Upto 80% Off</h3>
            <p className="text-[11px] text-gray-600 mb-4">Big savings on top categories</p>
            <button className="rounded-lg bg-[#1668F6] px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700 shadow-sm">
              Shop Now
            </button>
          </div>
          {/* Mock Graphic Container */}
          <div className="absolute right-[-20px] bottom-[-10px] w-[180px] h-[120px] bg-contain bg-no-repeat bg-right-bottom opacity-90"
               style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/3081/3081986.png')" }}>
          </div>
        </div>
      </div>
    </main>
  );
}

function CouponCard({ title, value, code, badge, badgeClass, desc, date, colorClass, borderColor }: any) {
  return (
    <div className={`relative flex overflow-hidden rounded-xl border ${borderColor} bg-white shadow-sm`}>
      {/* Left colored side */}
      <div className={`flex w-[90px] shrink-0 flex-col items-center justify-center border-r border-dashed ${borderColor} ${colorClass} p-2 text-center`}>
        <span className="text-[10px] font-bold opacity-80">{title}</span>
        <span className="text-2xl font-black leading-none my-0.5">{value}</span>
        <span className="text-[10px] font-bold opacity-80">OFF</span>
      </div>

      {/* Right details side */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-sm font-black text-gray-900 tracking-wide">{code}</h3>
            {badge && (
              <span className={`rounded px-1.5 py-0.5 text-[8px] font-bold ${badgeClass || 'bg-emerald-100 text-emerald-700'}`}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-[11px] text-gray-600 leading-snug pr-12">{desc}</p>
        </div>
        
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {date}
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-[10px] font-bold text-[#1668F6]">View Details</span>
            <ChevronDown className="h-3 w-3 text-[#1668F6]" />
          </div>
        </div>

        {/* Apply Button overlapping top right */}
        <button className="absolute right-4 top-4 rounded-lg border border-[#1668F6] bg-blue-50/50 px-4 py-1.5 text-xs font-bold text-[#1668F6] transition hover:bg-blue-50">
          Apply
        </button>
      </div>

      {/* Cutouts */}
      <div className="absolute -top-1.5 left-[84px] h-3 w-3 rounded-full bg-white border-b border-gray-200"></div>
      <div className="absolute -bottom-1.5 left-[84px] h-3 w-3 rounded-full bg-white border-t border-gray-200"></div>
    </div>
  );
}

function BankOfferCard({ bank, title, desc }: any) {
  return (
    <div className="flex w-[160px] shrink-0 flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm text-center">
      <div className="mb-3 h-8 flex items-center justify-center font-black text-blue-900 italic opacity-80 text-lg">
        {bank}
      </div>
      <h4 className="text-xs font-bold text-gray-900 leading-snug mb-1">{title}</h4>
      <p className="text-[10px] text-gray-500 mb-3">{desc}</p>
      <div className="mt-auto w-full border-t border-gray-100 pt-2 text-[9px] font-semibold text-gray-400">
        T&C Apply
      </div>
    </div>
  );
}
