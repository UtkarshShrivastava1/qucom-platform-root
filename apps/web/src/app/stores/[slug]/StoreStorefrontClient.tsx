'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/features/products/components/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { fetchStoreBySlug } from '@/lib/api/stores';
import { useStoreProducts } from '@/hooks/useStoreProducts';
import { Star, MapPin, Truck, RotateCcw, ChevronRight, Store, Heart, Search, Mic, Share2, Zap, ShieldCheck, Headset, Filter, ChevronDown } from 'lucide-react';

interface StoreStorefrontClientProps {
  slug: string;
}

export function StoreStorefrontClient({ slug }: StoreStorefrontClientProps) {
  const { data: store, isLoading: storeLoading } = useQuery({
    queryKey: ['store', slug],
    queryFn: () => fetchStoreBySlug(slug),
    enabled: !!slug,
  });

  const { data: productsData, isLoading: productsLoading } = useStoreProducts(
    store?._id || '',
    { limit: 20 },
  );

  if (storeLoading) {
    return (
      <div className="min-h-screen bg-transparent pt-16">
        <main className="max-w-[1920px] mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="skeleton h-48 rounded-2xl" />
          <div className="skeleton h-8 w-1/3 rounded" />
          <ProductGridSkeleton count={8} />
        </main>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-transparent pt-16">
        <main className="max-w-[1920px] mx-auto px-4 sm:px-6 py-20 text-center">
          <Store className="w-16 h-16 mx-auto text-surface-600 mb-4" />
          <h1 className="text-xl font-bold text-surface-700">Store not found</h1>
          <p className="text-sm text-surface-500 mt-2">This store may have been removed or is temporarily unavailable.</p>
          <Link href="/stores" className="inline-block mt-6 px-6 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors">
            Browse All Stores
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const products = productsData?.products || [];
  
  // Create mocked sections based on available products
  const newArrivals = products.slice(0, 2);
  const bestDeals = products.slice(2, 4);
  const topPicks = products.slice(4, 6);
  const remaining = products.slice(6);

  return (
    <div className="min-h-screen bg-transparent pt-14 pb-20 md:pb-0">

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 py-6 space-y-5">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#192168]" />
          <input 
            type="text" 
            placeholder={`Search for products in ${store.name}...`} 
            className="w-full h-12 pl-12 pr-12 rounded-full border border-surface-200 bg-white text-[13px] font-semibold text-[#192168] placeholder:text-[#192168]/50 focus:outline-none focus:border-[#1668F6] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
          />
          <Mic className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#192168]" />
        </div>

        {/* Categories Strip (Flipkart style) */}
        <div className="hidden md:flex items-center justify-between bg-white border border-surface-200 rounded-2xl px-6 py-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
          {['Electronics', 'Fashion', 'Home', 'Grocery', 'Appliances', 'Toys', 'Beauty'].map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-2 cursor-pointer hover:text-[#1668F6] group">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-100 group-hover:ring-2 ring-[#1668F6] ring-offset-2 transition-all">
                <img 
                  src={`https://picsum.photos/seed/${cat}/100/100`} 
                  alt={cat}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold text-[#192168] group-hover:text-[#1668F6] transition-colors">{cat}</span>
            </div>
          ))}
        </div>

        {/* Store Info Banner Card */}
        <div className="bg-white p-3 flex gap-3 sm:gap-4 rounded-3xl shadow-sm border border-surface-200">
           {/* Store Logo / Banner (Left) */}
          <div className="flex-shrink-0 w-[130px] sm:w-[180px] h-[140px] sm:h-[150px] relative rounded-2xl overflow-hidden bg-surface-100">
            {store.bannerUrl ? (
              <img src={store.bannerUrl} alt={store.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#1668F6]/10 flex items-center justify-center">
                <Store className="w-8 h-8 text-[#1668F6]/50" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
            
            <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold ${store.isActive
                ? 'bg-[#06B95F] text-white'
                : 'bg-[#F59E0B] text-white'
                }`}>
                {store.isActive ? 'Open' : 'Closing Soon'}
            </span>
            <button className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full border border-white/50 text-white/90 hover:bg-white/20">
              <Heart className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Content (Right) */}
          <div className="flex-1 py-1 relative flex flex-col justify-center">
            <div className="flex items-start justify-between gap-1">
               <h1 className="text-[18px] sm:text-[20px] font-extrabold text-[#192168] leading-tight">
                 {store.name}
               </h1>
               <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#E8F0FE] text-[#1668F6]">
                 <Share2 className="w-4 h-4" />
               </button>
            </div>

            <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-[#192168] mt-1.5">
              <span className="font-extrabold">{store.rating.toFixed(1)}</span>
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#06B95F] fill-[#06B95F]" />
              <span className="font-medium text-[#192168]/60">({store.reviewCount || '1.2K'})</span>
            </div>

            <p className="text-[11px] sm:text-[12px] font-medium text-[#192168] mt-1.5 leading-snug pr-2 line-clamp-2">
              {store.description || 'Clothing, Accessories, Footwear & more'}
            </p>

            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] mt-2 text-[#192168] font-extrabold">
              <MapPin className="w-3.5 h-3.5 text-[#1668F6] fill-[#1668F6]/20 flex-shrink-0" />
              {store.distanceKm ? `${store.distanceKm.toFixed(1)} km` : '0.2 km'} <span className="font-medium text-[#192168]/60 truncate max-w-[80px] sm:max-w-none">• {store.address?.street || 'Boring Road, Patna, Bihar'}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3">
               <span className="flex items-center gap-1 text-[9px] sm:text-[10px] text-[#1668F6] font-extrabold bg-[#E8F0FE] px-2 py-1.5 rounded-lg">
                 <Zap className="w-3 h-3 fill-[#1668F6]" /> Fast Delivery
               </span>
               <span className="flex items-center gap-1 text-[9px] sm:text-[10px] text-[#1668F6] font-extrabold bg-[#E8F0FE] px-2 py-1.5 rounded-lg">
                 <RotateCcw className="w-3 h-3" /> Easy Returns
               </span>
            </div>
          </div>
        </div>

        {/* 4 Service Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="flex sm:flex-col items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-surface-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
                <Truck className="w-5 h-5 text-[#1668F6]" />
                <span className="text-[10px] font-extrabold text-[#192168] sm:text-center leading-tight">Fast Delivery<br className="hidden sm:block"/><span className="text-[9px] font-medium text-surface-500">On orders above ₹199</span></span>
            </div>
            <div className="flex sm:flex-col items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-surface-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
                <RotateCcw className="w-5 h-5 text-[#1668F6]" />
                <span className="text-[10px] font-extrabold text-[#192168] sm:text-center leading-tight">Easy Returns<br className="hidden sm:block"/><span className="text-[9px] font-medium text-surface-500">7 days return policy</span></span>
            </div>
            <div className="flex sm:flex-col items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-surface-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
                <ShieldCheck className="w-5 h-5 text-[#1668F6]" />
                <span className="text-[10px] font-extrabold text-[#192168] sm:text-center leading-tight">Secure Payments<br className="hidden sm:block"/><span className="text-[9px] font-medium text-surface-500">100% secure</span></span>
            </div>
            <div className="flex sm:flex-col items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-surface-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
                <Headset className="w-5 h-5 text-[#1668F6]" />
                <span className="text-[10px] font-extrabold text-[#192168] sm:text-center leading-tight">Support<br className="hidden sm:block"/><span className="text-[9px] font-medium text-surface-500">24x7 assistance</span></span>
            </div>
        </div>

        <div className="h-px bg-surface-200 my-4" />

        {/* All Products Header */}
        <div className="flex items-end justify-between pb-2">
            <div>
              <h2 className="text-[17px] font-extrabold text-[#192168]">All Products</h2>
              <p className="text-[11px] font-medium text-surface-500 mt-0.5">320 Items</p>
            </div>
            <div className="flex items-center gap-2">
               {/* Mobile Filter Button */}
               <button className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-200 bg-white text-[12px] font-extrabold text-[#1668F6]">
                  <Filter className="w-3.5 h-3.5" /> Filter
               </button>
               {/* Sort Dropdown */}
               <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-200 bg-[#f4f5f9] text-[12px] font-bold text-[#192168]">
                  Sort by: Popular <ChevronDown className="w-3.5 h-3.5" />
               </button>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filter Sidebar (Flipkart Style) */}
          <aside className="hidden md:block w-[260px] flex-shrink-0">
            <div className="bg-white border border-surface-200 rounded-2xl p-5 sticky top-24 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
              <h3 className="font-extrabold text-[#192168] mb-5 text-[16px] flex items-center gap-2 border-b border-surface-100 pb-3">
                <Filter className="w-4 h-4 text-[#1668F6]" /> Filters
              </h3>
              
              {/* Category Filter */}
              <div className="border-b border-surface-100 pb-5 mb-5">
                <h4 className="font-bold text-[#192168] text-[13px] uppercase tracking-wide mb-3">Categories</h4>
                <div className="space-y-3">
                  {['Electronics', 'Clothing', 'Home & Kitchen', 'Footwear'].map((cat, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-surface-300 text-[#1668F6] focus:ring-[#1668F6] cursor-pointer" />
                      <span className="text-[14px] text-surface-600 font-medium group-hover:text-[#1668F6] transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="border-b border-surface-100 pb-5 mb-5">
                <h4 className="font-bold text-[#192168] text-[13px] uppercase tracking-wide mb-3">Price</h4>
                <input type="range" className="w-full accent-[#1668F6]" min="0" max="10000" />
                <div className="flex items-center justify-between mt-3 text-[12px] text-surface-500 font-bold">
                  <span className="bg-surface-100 px-2 py-1 rounded">Min</span>
                  <span className="bg-surface-100 px-2 py-1 rounded">₹10,000+</span>
                </div>
              </div>
              
              {/* Customer Ratings */}
              <div className="border-b border-surface-100 pb-5 mb-5">
                <h4 className="font-bold text-[#192168] text-[13px] uppercase tracking-wide mb-3">Customer Ratings</h4>
                <div className="space-y-3">
                  {['4★ & above', '3★ & above', '2★ & above'].map((rating, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-surface-300 text-[#1668F6] focus:ring-[#1668F6] cursor-pointer" />
                      <span className="text-[14px] text-surface-600 font-medium group-hover:text-[#1668F6] transition-colors">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="font-bold text-[#192168] text-[13px] uppercase tracking-wide mb-3">Availability</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-surface-300 text-[#1668F6] focus:ring-[#1668F6] cursor-pointer" />
                  <span className="text-[14px] text-surface-600 font-medium group-hover:text-[#1668F6] transition-colors">Exclude Out of Stock</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
        {/* Product Sections */}
        {productsLoading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length > 0 ? (
            <div className="space-y-8">
               {newArrivals.length > 0 && (
                 <section>
                   <div className="flex items-center justify-between mb-3">
                     <h3 className="text-[15px] font-extrabold text-[#1668F6]">New Arrival</h3>
                     <button className="text-[12px] font-bold text-[#1668F6] flex items-center gap-0.5 hover:underline">View All <ChevronRight className="w-3 h-3" /></button>
                   </div>
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                     {newArrivals.map((product) => (
                       <ProductCard key={product._id} product={product} badge="NEW" />
                     ))}
                   </div>
                 </section>
               )}
               {bestDeals.length > 0 && (
                 <section>
                   <div className="flex items-center justify-between mb-3">
                     <h3 className="text-[15px] font-extrabold text-[#1668F6]">Best Deals</h3>
                     <button className="text-[12px] font-bold text-[#1668F6] flex items-center gap-0.5 hover:underline">View All <ChevronRight className="w-3 h-3" /></button>
                   </div>
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                     {bestDeals.map((product) => (
                       <ProductCard key={product._id} product={product} badge="DISCOUNT" />
                     ))}
                   </div>
                 </section>
               )}
               {topPicks.length > 0 && (
                 <section>
                   <div className="flex items-center justify-between mb-3">
                     <h3 className="text-[15px] font-extrabold text-[#1668F6]">Top Picks For You</h3>
                     <button className="text-[12px] font-bold text-[#1668F6] flex items-center gap-0.5 hover:underline">View All <ChevronRight className="w-3 h-3" /></button>
                   </div>
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                     {topPicks.map((product) => (
                       <ProductCard key={product._id} product={product} />
                     ))}
                   </div>
                 </section>
               )}
               {remaining.length > 0 && (
                 <section>
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                     {remaining.map((product) => (
                       <ProductCard key={product._id} product={product} />
                     ))}
                   </div>
                 </section>
               )}
            </div>
          ) : (
            <div className="py-16 text-center bg-white border border-surface-200 rounded-3xl">
              <Store className="w-10 h-10 mx-auto text-surface-300 mb-3" />
              <p className="text-sm text-surface-600 font-extrabold">This store hasn&apos;t listed any products yet.</p>
            </div>
          )}
          </div>
        </div>
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}