'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { TrustBar } from '@/components/ui/TrustBar';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { fetchStoreBySlug } from '@/lib/api/stores';
import { useStoreProducts } from '@/hooks/useStoreProducts';
import { Star, MapPin, Truck, RotateCcw, ChevronRight, Store, Heart } from 'lucide-react';

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
      <div className="min-h-screen bg-surface-950">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="skeleton h-48 rounded-2xl" />
          <div className="skeleton h-8 w-1/3 rounded" />
          <ProductGridSkeleton count={8} />
        </main>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-surface-950">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <Store className="w-16 h-16 mx-auto text-surface-600 mb-4" />
          <h1 className="text-xl font-bold text-surface-300">Store not found</h1>
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

  return (
    <div className="min-h-screen bg-surface-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Cover Banner */}
        <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden">
          {store.bannerUrl ? (
            <img src={store.bannerUrl} alt={store.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full gradient-brand" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/40 to-transparent" />

          {/* Store Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  store.isActive
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {store.isActive ? '● Open Now' : '● Closed'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{store.name}</h1>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {store.rating.toFixed(1)} ({store.reviewCount} reviews)
                </span>
                <span className="capitalize">{store.category.replace('_', ' ')}</span>
                {store.distanceKm && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {store.distanceKm.toFixed(1)} km
                  </span>
                )}
              </div>
            </div>

            <button className="p-2.5 rounded-xl bg-surface-950/50 backdrop-blur-sm text-surface-300 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Service Badges */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
            <Truck className="w-3.5 h-3.5" /> Fast Delivery
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/10 text-brand-400 text-xs font-medium border border-brand-500/20">
            <RotateCcw className="w-3.5 h-3.5" /> Easy Returns
          </span>
        </div>

        {/* Trust Bar */}
        <TrustBar />

        {/* Store Description */}
        {store.description && (
          <p className="text-sm text-surface-400 leading-relaxed">{store.description}</p>
        )}

        {/* Product Sections */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-surface-100">All Products</h2>
            <Link
              href={`/products?storeId=${store._id}`}
              className="flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {productsLoading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center glass-card rounded-2xl">
              <Store className="w-10 h-10 mx-auto text-surface-600 mb-3" />
              <p className="text-sm text-surface-500">This store hasn&apos;t listed any products yet.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
