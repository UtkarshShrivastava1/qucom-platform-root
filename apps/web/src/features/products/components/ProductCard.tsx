'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Star, Store } from 'lucide-react';
import type { IProduct } from '@repo/shared-types';

interface ProductCardProps {
  product: IProduct;
  badge?: 'NEW' | 'DISCOUNT' | string;
}

export function ProductCard({ product, badge }: ProductCardProps) {
  const discount = product.baseMrp > 0
    ? Math.round(((product.baseMrp - product.basePrice) / product.baseMrp) * 100)
    : 0;

  const firstImage = product.variants?.[0]?.images?.[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white overflow-hidden flex flex-col hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5 border border-surface-200 rounded-2xl p-2"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-100 rounded-xl">
        {firstImage ? (
          <img
            src={firstImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-100">
            <Store className="w-12 h-12 text-surface-400" />
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span className={`absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm ${
            badge === 'NEW' ? 'bg-[#1668F6] text-white' : 
            badge === 'DISCOUNT' ? 'bg-[#F59E0B] text-white' : 
            'bg-[#0457F4] text-white'
          }`}>
            {badge === 'DISCOUNT' ? `${discount}% OFF` : badge}
          </span>
        )}
        {!badge && discount > 0 && (
           <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-[#1668F6] text-white text-[10px] font-extrabold shadow-sm">
             {discount}% OFF
           </span>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-rose-50 text-[#192168] hover:text-rose-500 transition-all shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)]"
        >
          <Heart className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="pt-2.5 pb-1 px-1 flex flex-col gap-1 flex-1">
        <h3 className="text-[12px] font-bold text-[#192168] line-clamp-2 leading-tight group-hover:text-[#1668F6] transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[14px] font-extrabold text-[#192168]">
            ₹{product.basePrice.toLocaleString('en-IN')}
          </span>
          {discount > 0 && (
            <>
              <span className="text-[11px] font-medium text-surface-500 line-through">
                ₹{product.baseMrp.toLocaleString('en-IN')}
              </span>
              <span className="text-[9px] font-extrabold text-[#06B95F] bg-[#06B95F]/10 px-1.5 py-0.5 rounded text-center">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Rating + Store */}
        <div className="flex items-center justify-between mt-auto pt-1.5">
          {product.rating > 0 && (
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 text-[#06B95F] fill-[#06B95F]" />
              <span className="text-[10px] font-extrabold text-[#192168]">{product.rating.toFixed(1)}</span>
              {product.reviewCount > 0 && (
                <span className="text-[10px] font-medium text-surface-500">({product.reviewCount})</span>
              )}
            </div>
          )}
          <span className="text-[10px] font-bold text-surface-500 truncate max-w-[80px]">
            {product.storeName}
          </span>
        </div>
      </div>
    </Link>
  );
}
