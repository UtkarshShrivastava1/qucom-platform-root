'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Clock, Truck } from 'lucide-react';
import type { IStore } from '@repo/shared-types';

interface StoreCardProps {
  store: IStore;
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Link
      href={`/stores/${store.slug}`}
      className="group flex-shrink-0 w-[200px] sm:w-[280px] bg-white overflow-hidden hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5 border rounded-2xl"
    >
      {/* Banner Image */}
      <div className="relative h-32 overflow-hidden bg-surface-100">
        {store.bannerUrl ? (
          <img
            src={store.bannerUrl}
            alt={store.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full gradient-brand opacity-40" />
        )}

        {/* ETA Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-white backdrop-blur-sm">
          <Clock className="w-3 h-3 text-emerald-400" />
          <span className="text-xs font-medium text-surface-500">
            {store.distanceKm ? `${store.distanceKm.toFixed(1)} km` : '~2 km'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-semibold text-[#192168] truncate group-hover:text-surface-500 transition-colors">
          {store.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium text-surface-300">{store.rating.toFixed(1)}</span>
            <span className="text-xs text-surface-500">({store.reviewCount})</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-400">
            <Truck className="w-3 h-3" />
            <span className="text-xs font-medium">Fast Delivery</span>
          </div>
        </div>

        <p className="text-xs text-surface-500 capitalize">{store.category.replace('_', ' ')}</p>
      </div>
    </Link>
  );
}
