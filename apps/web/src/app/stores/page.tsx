'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { StoreCardSkeleton } from '@/components/ui/Skeleton';
import { useNearbyStores } from '@/hooks/useNearbyStores';
import { useLocationStore } from '@/stores/location.store';
import { Star, Truck, MapPin, Clock, Store } from 'lucide-react';
import { StoreCategory, type IStore } from '@repo/shared-types';

const categoryFilters = [
  { label: 'All Stores', value: undefined },
  { label: 'Fashion', value: StoreCategory.FASHION },
  { label: 'Footwear', value: StoreCategory.FOOTWEAR },
  { label: 'Electronics', value: StoreCategory.ELECTRONICS },
  { label: 'Beauty', value: StoreCategory.BEAUTY_CARE },
  { label: 'Home & Living', value: StoreCategory.HOME_LIVING },
  { label: 'Grocery', value: StoreCategory.GROCERY_STAPLES },
  { label: 'Sports', value: StoreCategory.SPORTS_FITNESS },
];

function StoreListCard({ store }: { store: IStore }) {
  return (
    <Link
      href={`/stores/${store.slug}`}
      className="group glass-card p-4 flex gap-4 hover:border-brand-500/30 transition-all duration-300"
    >
      {/* Store Logo / Banner */}
      <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-surface-900">
        {store.bannerUrl ? (
          <img src={store.bannerUrl} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="w-full h-full gradient-brand opacity-40 flex items-center justify-center">
            <Store className="w-8 h-8 text-white/50" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-surface-200 group-hover:text-surface-50 transition-colors truncate">
            {store.name}
          </h3>
          <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
            store.isActive
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
              : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
          }`}>
            {store.isActive ? 'Open' : 'Closed'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-surface-400">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            {store.rating.toFixed(1)} ({store.reviewCount})
          </span>
          <span className="capitalize">{store.category.replace('_', ' ')}</span>
        </div>

        {store.description && (
          <p className="text-xs text-surface-500 line-clamp-1">{store.description}</p>
        )}

        <div className="flex items-center gap-3 text-xs">
          {store.distanceKm && (
            <span className="flex items-center gap-1 text-surface-400">
              <MapPin className="w-3 h-3" />
              {store.distanceKm.toFixed(1)} km
            </span>
          )}
          <span className="flex items-center gap-1 text-emerald-400">
            <Truck className="w-3 h-3" />
            Fast Delivery
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function StoresPage() {
  const { lng, lat, address } = useLocationStore();
  const [activeFilter, setActiveFilter] = useState<StoreCategory | undefined>(undefined);
  const { data: stores, isLoading } = useNearbyStores(lng, lat, 10, activeFilter);

  return (
    <div className="min-h-screen bg-surface-950">
      <Header address={address} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-surface-100">Explore Stores</h1>
          <p className="text-sm text-surface-400">Discover local stores and shops near you</p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categoryFilters.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'bg-surface-900 text-surface-400 hover:bg-surface-800 hover:text-surface-200 border border-surface-800'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Store List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card p-4 flex gap-4">
                <div className="skeleton w-24 h-24 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-3/4 rounded" />
                  <div className="skeleton h-3 w-1/2 rounded" />
                  <div className="skeleton h-3 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : stores && stores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stores.map((store) => (
              <StoreListCard key={store._id} store={store} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass-card rounded-2xl">
            <Store className="w-12 h-12 mx-auto text-surface-600 mb-3" />
            <p className="text-surface-400 text-sm">No stores found in this area.</p>
            <p className="text-surface-500 text-xs mt-1">Try changing your location or removing filters.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
