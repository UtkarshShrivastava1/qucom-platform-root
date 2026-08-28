'use client';

import React from 'react';
import Link from 'next/link';
import { ProductCategory } from '@repo/shared-types';

const categories = [
  { label: 'All', value: 'all', emoji: '🛍️' },
  { label: 'Men', value: ProductCategory.MEN, emoji: '👔' },
  { label: 'Women', value: ProductCategory.WOMEN, emoji: '👗' },
  { label: 'Kids', value: ProductCategory.KIDS, emoji: '🧸' },
  { label: 'Fashion', value: ProductCategory.FASHION, emoji: '✨' },
  { label: 'Beauty', value: ProductCategory.BEAUTY, emoji: '💄' },
  { label: 'Home', value: ProductCategory.HOME_LIVING, emoji: '🏠' },
  { label: 'Footwear', value: ProductCategory.FOOTWEAR, emoji: '👟' },
  { label: 'Electronics', value: ProductCategory.ELECTRONICS, emoji: '📱' },
  { label: 'Accessories', value: ProductCategory.ACCESSORIES, emoji: '⌚' },
  { label: 'Sports', value: ProductCategory.SPORTS_FITNESS, emoji: '🏃' },
  { label: 'Grocery', value: ProductCategory.GROCERY_STAPLES, emoji: '🥬' },
];

interface CategoryStripProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function CategoryStrip({ activeCategory = 'all', onCategoryChange }: CategoryStripProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-3">
      <div className="flex items-center gap-2 px-4 sm:px-0 min-w-max">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => onCategoryChange?.(cat.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                  : 'bg-surface-900 text-surface-400 hover:bg-surface-800 hover:text-surface-200 border border-surface-800'
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
