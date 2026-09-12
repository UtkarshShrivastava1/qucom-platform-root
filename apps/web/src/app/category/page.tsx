'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame, Shirt, Crown, Baby, Footprints, Sparkles,
  Armchair, Smartphone, ShoppingBasket, Car, Dumbbell,
  Gamepad2, BookOpen, MoreHorizontal, ChevronRight
} from 'lucide-react';

const categories = [
  { id: 'trending', label: 'Trending Now', icon: Flame, iconColor: 'text-orange-500' },
  { id: 'men', label: "Men's Fashion", icon: Shirt, iconColor: 'text-[#1668F6]' },
  { id: 'women', label: "Women's Fashion", icon: Crown, iconColor: 'text-pink-500' },
  { id: 'kids', label: 'Kids Fashion', icon: Baby, iconColor: 'text-yellow-500' },
  { id: 'footwear', label: 'Footwear', icon: Footprints, iconColor: 'text-emerald-500' },
  { id: 'beauty', label: 'Beauty & Grooming', icon: Sparkles, iconColor: 'text-purple-500' },
  { id: 'home', label: 'Home & Living', icon: Armchair, iconColor: 'text-teal-500' },
  { id: 'electronics', label: 'Electronics', icon: Smartphone, iconColor: 'text-blue-500' },
  { id: 'grocery', label: 'Grocery & Staples', icon: ShoppingBasket, iconColor: 'text-green-500' },
  { id: 'auto', label: 'Automotive', icon: Car, iconColor: 'text-rose-500' },
  { id: 'sports', label: 'Sports & Fitness', icon: Dumbbell, iconColor: 'text-yellow-500' },
  { id: 'toys', label: 'Toys, Kids & Baby', icon: Gamepad2, iconColor: 'text-purple-400' },
  { id: 'books', label: 'Books & Stationery', icon: BookOpen, iconColor: 'text-blue-400' },
  { id: 'more', label: 'More Categories', icon: MoreHorizontal, iconColor: 'text-surface-500' },
];

const subcategories = {
  men: [
    {
      title: 'Casual Wear', items: [
        { name: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=200&auto=format&fit=crop' },
        { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200&auto=format&fit=crop' },
        { name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=200&auto=format&fit=crop' },
        { name: 'Trousers', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=200&auto=format&fit=crop' },
        { name: 'Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=200&auto=format&fit=crop' },
        { name: 'Track Pants', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&auto=format&fit=crop' }
      ]
    },
    {
      title: 'Work Wear', items: [
        { name: 'Formal Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=200&auto=format&fit=crop' },
        { name: 'Blazers', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=200&auto=format&fit=crop' },
        { name: 'Formal Trousers', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=200&auto=format&fit=crop' },
        { name: 'Coats', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=200&auto=format&fit=crop' },
        { name: 'Ties', image: 'https://images.unsplash.com/photo-1595126744576-963a708eb1ee?q=80&w=200&auto=format&fit=crop' },
        { name: 'Formal Shoes', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=200&auto=format&fit=crop' }
      ]
    },
    {
      title: 'Occasion Wear', items: [
        { name: 'Kurtas', image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=200&auto=format&fit=crop' },
        { name: 'Sherwanis', image: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=200&auto=format&fit=crop' },
        { name: 'Nehru Jackets', image: 'https://images.unsplash.com/photo-1592878940526-0214b0f374f6?q=80&w=200&auto=format&fit=crop' }
      ]
    }
  ]
};

export default function CategoryPage() {
  const [activeTab, setActiveTab] = useState('men');

  return (
    <div className="flex bg-surface-50 pb-[68px] md:pb-0 min-h-[calc(100vh-200px)]">
      {/* Left Sidebar */}
      <div className="w-[84px] md:w-64 bg-white border-r border-surface-200 flex-shrink-0">
        {categories.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`w-full flex md:flex-row flex-col items-center md:items-start md:px-6 gap-2 md:gap-4 py-4 md:py-5 px-1 transition-all relative ${isActive
                  ? 'bg-blue-50/50'
                  : 'hover:bg-surface-50'
                }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1668F6] rounded-r-full" />
              )}
              <div className="flex-shrink-0">
                <cat.icon
                  className={`w-[22px] h-[22px] md:w-5 md:h-5 ${isActive ? 'text-[#1668F6] fill-[#1668F6]/10' : cat.iconColor}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span className={`text-[10px] md:text-sm text-center md:text-left leading-[1.1] tracking-tight ${isActive ? 'font-extrabold text-[#1668F6]' : 'font-bold text-[#192168]'
                }`}>
                {cat.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-white min-h-full pb-8">
        {/* Banner Area */}
        <div className="p-3 md:p-6">
          <div className="w-full h-28 md:h-40 bg-[#E8F0FE] rounded-2xl flex items-center justify-between px-5 md:px-8 overflow-hidden relative group cursor-pointer">
            <div className="relative z-10">
              <h3 className="font-extrabold text-[#192168] text-sm md:text-lg leading-tight">
                {categories.find(c => c.id === activeTab)?.label.split(' ')[0]}<br />Fashion Store
              </h3>
            </div>

            <div className="absolute right-0 bottom-0 w-30 md:w-48 h-[120%] flex items-end justify-end">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop"
                alt="Banner Model"
                className="w-full h-full object-cover object-top drop-shadow-xl opacity-95"
              />
            </div>

            <div className="relative z-10 w-7 h-7 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#192168] group-hover:bg-[#1668F6] group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Subcategories */}
        <div className="px-3 md:px-6 space-y-6 md:space-y-10">
          {subcategories[activeTab as keyof typeof subcategories]?.map((section, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-4 px-1">
                <h4 className="font-extrabold text-[#192168] text-[15px] md:text-lg">{section.title}</h4>
                <button className="text-[#1668F6] text-xs md:text-sm font-bold hover:underline">View all</button>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-x-2 gap-y-6 md:gap-6">
                {section.items.map((item, i) => (
                  <Link href={`/category/${activeTab}`} key={i} className="flex flex-col items-center gap-2 md:gap-3 group">
                    <div className="w-[84px] h-[84px] sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#f4f5f9] overflow-hidden group-hover:ring-4 ring-[#1668F6]/20 transition-all p-1.5">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top mix-blend-multiply bg-[#f4f5f9]" />
                      </div>
                    </div>
                    <span className="text-[11px] md:text-sm font-extrabold text-[#192168] text-center leading-tight">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )) || (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-[#f4f5f9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 text-surface-400" />
                </div>
                <p className="text-[#192168] font-extrabold">Categories coming soon...</p>
                <p className="text-surface-500 text-xs mt-1 font-medium">We are updating our inventory.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
