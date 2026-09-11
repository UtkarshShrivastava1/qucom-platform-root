'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { StoreCardSkeleton } from '@/components/ui/Skeleton';
import { useNearbyStores } from '@/hooks/useNearbyStores';
import { useLocationStore } from '@/stores/location.store';
import { Star, Truck, MapPin, Clock, Store, Search, Mic, ChevronDown, Heart, Filter, ChevronRight } from 'lucide-react';
import { StoreCategory, type IStore } from '@repo/shared-types';

const categoryFilters = [
  { label: 'All Stores', value: undefined },
  { label: 'Fashion', value: StoreCategory.FASHION },
  { label: 'Footwear', value: StoreCategory.FOOTWEAR },
  { label: 'Electronics', value: StoreCategory.ELECTRONICS },
  { label: 'Beauty', value: StoreCategory.BEAUTY_CARE },
  { label: 'Home & Living', value: StoreCategory.HOME_LIVING },
];

function StoreListCard({ store }: { store: IStore }) {
  return (
    <Link
      href={`/stores/${store.slug}`}
      className="group bg-white flex h-[130px] overflow-hidden hover:border-brand-500/30 transition-all duration-300 rounded-2xl shadow-sm border border-surface-200"
    >
      {/* Store Logo / Banner (Left) */}
      <div className="flex-shrink-0 w-[140px] relative overflow-hidden bg-surface-100">
        {store.bannerUrl ? (
          <img src={store.bannerUrl} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-[#1668F6]/10 flex items-center justify-center">
            <Store className="w-8 h-8 text-[#1668F6]/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        
        {/* Badges inside Image */}
        <span className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold ${store.isActive
            ? 'bg-[#06B95F] text-white'
            : 'bg-[#F59E0B] text-white'
            }`}>
            {store.isActive ? 'Open' : 'Closing Soon'}
        </span>
        <button className="absolute top-2 right-2 flex items-center justify-center text-white/90 hover:text-rose-400" onClick={(e) => e.preventDefault()}>
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Content (Right) */}
      <div className="flex-1 p-3.5 pr-2 relative flex flex-col justify-center">
        <h3 className="text-sm font-extrabold text-[#192168] group-hover:text-[#1668F6] transition-colors truncate mb-1 pr-6">
          {store.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-[#192168]">
          <span className="font-extrabold">{store.rating.toFixed(1)}</span>
          <Star className="w-3.5 h-3.5 text-[#06B95F] fill-[#06B95F]" />
          <span className="font-medium text-[#192168]/60">({store.reviewCount || '1.2K'})</span>
        </div>

        <p className="text-[11px] font-medium text-[#192168]/70 mt-1.5 line-clamp-1 pr-6">
          {store.description || 'Clothing, Accessories, Footwear & more'}
        </p>

        <div className="flex items-center gap-1 text-[11px] mt-1.5 text-[#192168]/60 font-medium">
          <MapPin className="w-3 h-3 text-[#192168]" />
          {store.distanceKm ? `${store.distanceKm.toFixed(1)} km` : '0.2 km'} • {store.address?.street || 'Boring Road'}
        </div>

        <div className="mt-2.5">
          <span className="inline-flex items-center text-[10px] text-[#1668F6] font-extrabold bg-[#E8F0FE] px-2 py-1 rounded-full">
            Fast Delivery
          </span>
        </div>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#192168]/40">
           <ChevronRight className="w-5 h-5" />
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
    <div className="min-h-screen bg-transparent pt-14 pb-20 md:pb-0">

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 py-6 space-y-5">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#192168]" />
          <input 
            type="text" 
            placeholder="Search for products or stores..." 
            className="w-full h-12 pl-12 pr-12 rounded-full border border-surface-200 bg-white text-[13px] font-semibold text-[#192168] placeholder:text-[#192168]/50 focus:outline-none focus:border-[#1668F6] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
          />
          <Mic className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#192168]" />
        </div>

        {/* Page Header Area */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#E8F0FE] text-[#1668F6] rounded-2xl flex items-center justify-center flex-shrink-0">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-[#192168]">Stores Near Me</h1>
            <p className="text-[11px] font-medium text-[#192168]/70 leading-tight mt-0.5">Showing stores near your current location</p>
            <div className="flex items-center gap-1 text-[11px] mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#192168]" />
              <span className="font-extrabold text-[#192168]/70 truncate max-w-[200px]">{address || "Boring Road, Patna, Bihar"}</span>
              <button className="font-extrabold text-[#1668F6] ml-1">Change</button>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categoryFilters.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.value)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[11px] font-extrabold transition-all border ${
                  isActive
                    ? 'bg-[#1668F6] text-white border-[#1668F6]'
                    : 'bg-white text-[#192168] border-surface-200 hover:border-surface-300'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
          <button className="flex-shrink-0 px-4 py-1.5 rounded-full text-[11px] font-extrabold bg-white text-[#192168] border border-surface-200 hover:border-surface-300 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter
          </button>
        </div>

        {/* Nearest First Dropdown */}
        <div className="flex justify-end pt-1">
           <button className="flex items-center gap-1 text-[11px] font-extrabold text-[#192168]">
             Nearest First <ChevronDown className="w-3.5 h-3.5" />
           </button>
        </div>

        {/* Store List */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white p-4 flex gap-4 border border-surface-100 rounded-2xl">
                <div className="skeleton w-[140px] h-[100px] rounded-xl" />
                <div className="flex-1 space-y-2 py-2">
                  <div className="skeleton h-4 w-3/4 rounded" />
                  <div className="skeleton h-3 w-1/2 rounded" />
                  <div className="skeleton h-3 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : stores && stores.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {stores.map((store) => (
              <StoreListCard key={store._id} store={store} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white border border-surface-200 rounded-2xl">
            <Store className="w-12 h-12 mx-auto text-surface-300 mb-3" />
            <p className="text-surface-600 text-sm font-extrabold">No stores found in this area.</p>
            <p className="text-surface-500 text-xs mt-1 font-medium">Try changing your location or removing filters.</p>
          </div>
        )}
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

