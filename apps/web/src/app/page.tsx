'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Sparkles, TrendingUp } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { CategoryStrip } from '@/components/ui/CategoryStrip';
import { PromoCarousel } from '@/components/ui/PromoCarousel';
import { TrustBar } from '@/components/ui/TrustBar';
import { ProductCard } from '@/components/ui/ProductCard';
import { StoreCard } from '@/components/ui/StoreCard';
import { ProductGridSkeleton, StoreCardSkeleton } from '@/components/ui/Skeleton';
import { useNearbyStores } from '@/hooks/useNearbyStores';
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts';
import { useLocationStore } from '@/stores/location.store';

export default function HomePage() {
  const { lng, lat, address } = useLocationStore();
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: nearbyStores, isLoading: storesLoading } = useNearbyStores(lng, lat);
  const { data: featuredProducts, isLoading: productsLoading } = useFeaturedProducts(12);

  return (
    <div className="min-h-screen bg-surface-950">
      <Header address={address} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 py-6">
        {/* Category Navigation Strip */}
        <CategoryStrip activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Promotional Carousel */}
        <PromoCarousel />

        {/* Trust & Service Assurance Bar */}
        <TrustBar />

        {/* ── Stores Near You ────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" />
              <h2 className="text-lg font-bold text-surface-100">Stores Near You</h2>
            </div>
            <Link
              href="/stores"
              className="flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
            >
              See All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {storesLoading ? (
              Array.from({ length: 4 }).map((_, i) => <StoreCardSkeleton key={i} />)
            ) : nearbyStores && nearbyStores.length > 0 ? (
              nearbyStores.slice(0, 8).map((store) => (
                <StoreCard key={store._id} store={store} />
              ))
            ) : (
              <div className="w-full py-12 text-center text-surface-500">
                <p className="text-sm">No stores found nearby. Try changing your location.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Best Deals For You ─────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-surface-100">Best Deals For You</h2>
            </div>
            <Link
              href="/products?sort=discount"
              className="flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {productsLoading ? (
            <ProductGridSkeleton count={8} />
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="w-full py-16 text-center glass-card">
              <TrendingUp className="w-10 h-10 mx-auto text-surface-600 mb-3" />
              <p className="text-sm text-surface-500">No products available yet. Check back soon!</p>
            </div>
          )}
        </section>

        {/* ── Explore Stores CTA ─────────────────────────────────────── */}
        <section className="relative overflow-hidden rounded-2xl gradient-brand p-8 sm:p-10">
          <div className="relative z-10 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Explore All Local Stores
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-lg">
              Discover amazing products from verified local retailers near you. Filter by category, sort by rating, and find your new favourite shop.
            </p>
            <Link
              href="/stores"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-surface-900 font-semibold text-sm hover:bg-white/90 transition-colors shadow-lg mt-2"
            >
              Browse Stores <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 animate-pulse-soft" />
          <div className="absolute right-20 -top-10 w-24 h-24 rounded-full bg-white/5" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
