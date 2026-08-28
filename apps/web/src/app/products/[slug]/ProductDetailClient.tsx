'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { TrustBar } from '@/components/ui/TrustBar';
import { fetchProductBySlug } from '@/lib/api/catalog';
import { Star, Heart, ShoppingBag, Share2, Store, ChevronRight, ChevronLeft, Check, Truck, RotateCcw, ShieldCheck, Minus, Plus, Package } from 'lucide-react';

interface ProductDetailClientProps {
  slug: string;
}

export function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
  });

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [qty, setQty] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-950">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="skeleton aspect-square rounded-2xl" />
            <div className="space-y-4">
              <div className="skeleton h-8 w-3/4 rounded" />
              <div className="skeleton h-6 w-1/2 rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-4/5 rounded" />
              <div className="skeleton h-12 w-40 rounded-xl mt-6" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-surface-950">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <Package className="w-16 h-16 mx-auto text-surface-600 mb-4" />
          <h1 className="text-xl font-bold text-surface-300">Product not found</h1>
          <p className="text-sm text-surface-500 mt-2">This product may have been removed.</p>
          <Link href="/products" className="inline-block mt-6 px-6 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors">
            Browse Products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const allImages = selectedVariant?.images?.length > 0
    ? selectedVariant.images
    : product.variants.flatMap((v) => v.images).filter(Boolean);

  const discount = selectedVariant.mrp > 0
    ? Math.round(((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100)
    : 0;

  const sizes = Array.from(new Set(product.variants.filter((v) => v.size && v.isActive).map((v) => v.size!)));
  const colors = Array.from(new Set(product.variants.filter((v) => v.color && v.isActive).map((v) => v.color!)));

  return (
    <div className="min-h-screen bg-surface-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-surface-500">
          <Link href="/" className="hover:text-surface-300 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-surface-300 transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-surface-300 truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ── Image Gallery ──────────────────────────────────────── */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-900 glass-card">
              {allImages.length > 0 ? (
                <img
                  src={allImages[selectedImageIdx] || allImages[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-20 h-20 text-surface-700" />
                </div>
              )}

              {/* Discount Badge */}
              {discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-sm font-bold shadow-lg">
                  {discount}% OFF
                </span>
              )}

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIdx((prev) => (prev - 1 + allImages.length) % allImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface-950/50 backdrop-blur-sm text-white hover:bg-surface-950/70 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIdx((prev) => (prev + 1) % allImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface-950/50 backdrop-blur-sm text-white hover:bg-surface-950/70 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIdx === idx ? 'border-brand-500' : 'border-surface-800 hover:border-surface-600'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ──────────────────────────────────────── */}
          <div className="space-y-5">
            {/* Store Link */}
            <Link
              href={`/stores/${product.storeId}`}
              className="inline-flex items-center gap-1.5 text-xs text-surface-400 hover:text-brand-400 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              {product.storeName}
            </Link>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-100 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-surface-500">{product.reviewCount} ratings</span>
              </div>
            )}

            {/* Price Block */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-surface-100">
                ₹{selectedVariant.price.toLocaleString('en-IN')}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-surface-500 line-through">
                    ₹{selectedVariant.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-semibold text-emerald-400">
                    {discount}% off
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-surface-500">Inclusive of all taxes</p>

            {/* Color Selector */}
            {colors.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-surface-300">Color</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.variants
                    .filter((v) => v.color && v.isActive)
                    .map((v, idx) => {
                      const isSelected = idx === selectedVariantIdx;
                      return (
                        <button
                          key={`${v.color}-${idx}`}
                          onClick={() => {
                            setSelectedVariantIdx(idx);
                            setSelectedImageIdx(0);
                          }}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-all ${
                            isSelected
                              ? 'border-brand-500 bg-brand-500/10 text-brand-400'
                              : 'border-surface-700 text-surface-400 hover:border-surface-500'
                          }`}
                        >
                          {v.colorHex && (
                            <span className="w-4 h-4 rounded-full border border-surface-600" style={{ backgroundColor: v.colorHex }} />
                          )}
                          {v.color}
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-surface-300">Size</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {sizes.map((size) => {
                    const variantIdx = product.variants.findIndex((v) => v.size === size && v.isActive);
                    const isSelected = variantIdx === selectedVariantIdx;
                    const variant = product.variants[variantIdx];
                    const outOfStock = variant && variant.stock <= 0;

                    return (
                      <button
                        key={size}
                        onClick={() => {
                          if (!outOfStock && variantIdx >= 0) {
                            setSelectedVariantIdx(variantIdx);
                          }
                        }}
                        disabled={outOfStock}
                        className={`w-12 h-12 rounded-xl border text-sm font-medium transition-all ${
                          outOfStock
                            ? 'border-surface-800 text-surface-600 cursor-not-allowed line-through'
                            : isSelected
                            ? 'border-brand-500 bg-brand-500/10 text-brand-400'
                            : 'border-surface-700 text-surface-400 hover:border-surface-500'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-surface-300">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2.5 rounded-xl bg-surface-900 border border-surface-700 text-surface-300 hover:bg-surface-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-lg font-semibold text-surface-100">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(selectedVariant.stock, q + 1))}
                  className="p-2.5 rounded-xl bg-surface-900 border border-surface-700 text-surface-300 hover:bg-surface-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-xs text-surface-500">
                  {selectedVariant.stock > 0 ? `${selectedVariant.stock} available` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                disabled={selectedVariant.stock <= 0}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-5 h-5" />
                {selectedVariant.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="p-3.5 rounded-xl bg-surface-900 border border-surface-700 text-surface-300 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3.5 rounded-xl bg-surface-900 border border-surface-700 text-surface-300 hover:text-brand-400 hover:bg-brand-500/10 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Service Badges */}
            <div className="grid grid-cols-3 gap-3 pt-3">
              {[
                { icon: Truck, label: 'Fast Delivery', detail: 'Same day available' },
                { icon: RotateCcw, label: 'Easy Returns', detail: '7 days' },
                { icon: ShieldCheck, label: 'Genuine', detail: '100% authentic' },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 rounded-xl bg-surface-900/60 border border-surface-800/50">
                  <item.icon className="w-5 h-5 mx-auto text-brand-400 mb-1" />
                  <p className="text-xs font-medium text-surface-300">{item.label}</p>
                  <p className="text-[10px] text-surface-500">{item.detail}</p>
                </div>
              ))}
            </div>

            {/* Product Attributes */}
            {product.attributes.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-semibold text-surface-300">Product Details</h3>
                <div className="glass-card p-4 divide-y divide-surface-800/50">
                  {product.attributes.map((attr) => (
                    <div key={attr.key} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                      <span className="text-xs text-surface-500">{attr.key}</span>
                      <span className="text-xs text-surface-300 font-medium">{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <section className="glass-card p-6 space-y-3">
            <h2 className="text-lg font-bold text-surface-100">Description</h2>
            <p className="text-sm text-surface-400 leading-relaxed whitespace-pre-line">{product.description}</p>
          </section>
        )}

        {/* Trust Bar */}
        <TrustBar />
      </main>

      <Footer />
    </div>
  );
}
