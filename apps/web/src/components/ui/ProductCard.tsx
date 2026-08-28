'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Star, Store } from 'lucide-react';
import type { IProduct } from '@repo/shared-types';

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.baseMrp > 0
    ? Math.round(((product.baseMrp - product.basePrice) / product.baseMrp) * 100)
    : 0;

  const firstImage = product.variants?.[0]?.images?.[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group glass-card overflow-hidden flex flex-col hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-900">
        {firstImage ? (
          <img
            src={firstImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-900">
            <Store className="w-12 h-12 text-surface-700" />
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-emerald-500 text-white text-xs font-bold shadow-lg">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-surface-950/60 backdrop-blur-sm hover:bg-rose-500/20 text-surface-400 hover:text-rose-400 transition-all"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-medium text-surface-200 line-clamp-2 leading-snug group-hover:text-surface-50 transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-surface-100">
            ₹{product.basePrice.toLocaleString('en-IN')}
          </span>
          {discount > 0 && (
            <span className="text-xs text-surface-500 line-through">
              ₹{product.baseMrp.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Rating + Store */}
        <div className="flex items-center justify-between mt-auto pt-2">
          {product.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-medium text-surface-300">{product.rating.toFixed(1)}</span>
              {product.reviewCount > 0 && (
                <span className="text-xs text-surface-500">({product.reviewCount})</span>
              )}
            </div>
          )}
          <span className="text-xs text-surface-500 truncate max-w-[120px]">
            {product.storeName}
          </span>
        </div>
      </div>
    </Link>
  );
}
