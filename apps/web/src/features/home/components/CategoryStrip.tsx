'use client';

import React from 'react';
import { 
  Shirt, Smartphone, Laptop, Sparkles, Home, Tv, 
  Baby, Leaf, Car, Dumbbell, Sofa, BookOpen, Bike 
} from 'lucide-react';
import { ProductCategory } from '@repo/shared-types';

const categories = [
  { label: 'Fashion', value: ProductCategory.FASHION, icon: Shirt, color: 'text-blue-500' },
  { label: 'Mobiles', value: 'mobiles', icon: Smartphone, color: 'text-pink-500' },
  { label: 'Electronics', value: ProductCategory.ELECTRONICS, icon: Laptop, color: 'text-indigo-500' },
  { label: 'Beauty', value: ProductCategory.BEAUTY, icon: Sparkles, color: 'text-rose-500' },
  { label: 'Home & Living', value: ProductCategory.HOME_LIVING, icon: Home, color: 'text-amber-500' },
  { label: 'Appliances', value: 'appliances', icon: Tv, color: 'text-cyan-500' },
  { label: 'Toys & Baby', value: 'toys_baby', icon: Baby, color: 'text-fuchsia-500' },
  { label: 'Food & Health', value: ProductCategory.GROCERY_STAPLES, icon: Leaf, color: 'text-green-500' },
  { label: 'Auto Accessories', value: 'auto_accessories', icon: Car, color: 'text-slate-500' },
  { label: 'Sports', value: ProductCategory.SPORTS_FITNESS, icon: Dumbbell, color: 'text-orange-500' },
  { label: 'Furniture', value: 'furniture', icon: Sofa, color: 'text-amber-700' },
  { label: 'Books', value: 'books', icon: BookOpen, color: 'text-purple-500' },
  { label: '2 Wheelers', value: 'two_wheelers', icon: Bike, color: 'text-blue-600' },
];

interface CategoryStripProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function CategoryStrip({ activeCategory = 'all', onCategoryChange }: CategoryStripProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4 bg-white border-b border-surface-100 shadow-sm">
      <div className="flex items-center justify-between gap-6 px-6 min-w-max max-w-[1920px] mx-auto">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          const Icon = cat.icon;
          return (
            <button
              key={cat.value}
              onClick={() => onCategoryChange?.(cat.value)}
              className="flex flex-col items-center gap-2 group transition-all"
            >
              <div className={`p-0 transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                <Icon className={`w-6 h-6 ${cat.color}`} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[11px] font-semibold whitespace-nowrap ${isActive ? 'text-[#192168]' : 'text-surface-600 group-hover:text-[#192168]'}`}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
