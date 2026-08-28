'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { useProducts } from '@/hooks/useProducts';
import { useLocationStore } from '@/stores/location.store';
import { ProductCategory } from '@repo/shared-types';
import { ChevronRight, Package } from 'lucide-react';

const categoryMeta: Record<string, { title: string; description: string; emoji: string }> = {
  men: { title: "Men's Fashion", description: "Explore the latest in men's clothing, accessories and footwear", emoji: '👔' },
  women: { title: "Women's Fashion", description: "Discover trending women's apparel, beauty and accessories", emoji: '👗' },
  kids: { title: 'Kids', description: "Adorable clothing and toys for children", emoji: '🧸' },
  fashion: { title: 'Fashion', description: 'Trendy clothing and accessories for everyone', emoji: '✨' },
  beauty: { title: 'Beauty & Care', description: 'Skincare, makeup and personal care products', emoji: '💄' },
  home_living: { title: 'Home & Living', description: 'Décor, furnishings and kitchen essentials', emoji: '🏠' },
  footwear: { title: 'Footwear', description: 'Shoes, sandals and sneakers for every occasion', emoji: '👟' },
  electronics: { title: 'Electronics', description: 'Gadgets, phones and smart devices', emoji: '📱' },
  accessories: { title: 'Accessories', description: 'Watches, bags, jewellery and more', emoji: '⌚' },
  sports_fitness: { title: 'Sports & Fitness', description: 'Activewear, equipment and supplements', emoji: '🏃' },
  grocery_staples: { title: 'Grocery & Staples', description: 'Fresh vegetables, grains and daily essentials', emoji: '🥬' },
  value_store: { title: 'Value Store', description: 'Great deals under ₹299', emoji: '🏷️' },
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { address } = useLocationStore();
  const slug = params.slug;
  const meta = categoryMeta[slug] || { title: slug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), description: '', emoji: '🛍️' };
  const categoryEnum = Object.values(ProductCategory).find((c) => c === slug);

  const { data, isLoading } = useProducts({
    category: categoryEnum,
    limit: 20,
    page: 1,
  });

  const products = data?.products || [];
  const total = data?.meta?.total || 0;

  return (
    <div className="min-h-screen bg-surface-950">
      <Header address={address} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-surface-500">
          <Link href="/" className="hover:text-surface-300 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-surface-300">{meta.title}</span>
        </nav>

        {/* Category Header */}
        <div className="glass-card p-6 rounded-2xl gradient-brand relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-4xl">{meta.emoji}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">{meta.title}</h1>
            <p className="text-white/70 text-sm mt-1">{meta.description}</p>
            <p className="text-white/50 text-xs mt-2">{total} products</p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10" />
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass-card rounded-2xl">
            <Package className="w-10 h-10 mx-auto text-surface-600 mb-3" />
            <p className="text-surface-400 text-sm">No products in this category yet.</p>
            <Link href="/products" className="inline-block mt-4 px-5 py-2 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors">
              Browse All Products
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
