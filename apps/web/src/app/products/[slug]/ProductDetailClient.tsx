'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Footer } from '@/components/layout/Footer';
import { fetchProductBySlug } from '@/lib/api/catalog';
import { ProductCard } from '@/features/products/components/ProductCard';
import { 
  Star, Heart, ShoppingBag, Share2, Store, ChevronRight, ChevronLeft, 
  Check, Truck, RotateCcw, ShieldCheck, Minus, Plus, Package, 
  MapPin, Search, ChevronDown, ChevronUp, Zap, Box 
} from 'lucide-react';

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
  const [showDetails, setShowDetails] = useState(true); // Open by default as per screenshot

  if (isLoading) {
    return (
      <div className="min-h-screen bg-transparent pt-16">
        <main className="max-w-[1920px] mx-auto px-4 sm:px-6 py-6 space-y-6">
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
      <div className="min-h-screen bg-transparent pt-16">
        <main className="max-w-[1920px] mx-auto px-4 sm:px-6 py-20 text-center">
          <Package className="w-16 h-16 mx-auto text-surface-600 mb-4" />
          <h1 className="text-xl font-bold text-surface-700">Product not found</h1>
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
    <div className="min-h-screen bg-transparent pt-14 pb-28 md:pb-0">
      <main className="max-w-[1920px] mx-auto md:px-4 sm:px-6 md:py-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
          {/* ── MOBILE: IMAGE FULL WIDTH, DESKTOP: STICKY GALLERY ── */}
          <div className="md:sticky md:top-24 h-max">
            {/* Mobile Image Container */}
            <div className="relative aspect-[4/5] md:aspect-square bg-[#f4f5f9] md:rounded-2xl overflow-hidden w-full">
              {allImages.length > 0 ? (
                <img
                  src={allImages[selectedImageIdx] || allImages[0]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 md:p-0"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-20 h-20 text-surface-300" />
                </div>
              )}

              {/* Top Right Action Buttons (Mobile overlay, Desktop absolute) */}
              <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-[#192168] hover:text-rose-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-[#192168] hover:text-[#1668F6] transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex flex-col items-center justify-center text-[#192168] hover:text-[#1668F6] transition-colors gap-0.5">
                  <Search className="w-3.5 h-3.5" />
                  <span className="text-[7px] font-extrabold uppercase tracking-tight">Similar</span>
                </button>
              </div>

              {/* Pagination Dots (Mobile primarily) */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                  {allImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === selectedImageIdx ? 'w-4 bg-[#192168]' : 'w-1.5 bg-surface-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Desktop Thumbnails */}
            <div className="hidden md:flex items-center gap-3 mt-4 overflow-x-auto">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all bg-[#f4f5f9] ${
                    selectedImageIdx === idx ? 'border-[#1668F6]' : 'border-transparent hover:border-surface-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* ── PRODUCT DETAILS & SELECTION ── */}
          <div className="px-4 py-5 md:p-0 space-y-6 bg-white md:bg-transparent -mt-4 md:mt-0 relative rounded-t-3xl md:rounded-none z-20">
            
            {/* Title & Brand */}
            <div className="space-y-1.5">
              <h1 className="text-[22px] md:text-3xl font-extrabold text-[#192168] leading-tight">
                {product.name}
              </h1>
              <p className="text-xs font-semibold text-surface-500">
                Navy Blue • 100% Cotton • Regular Fit
              </p>
            </div>

            {/* Price & Rating Row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-extrabold text-[#1668F6]">
                  ₹{selectedVariant.price.toLocaleString('en-IN')}
                </span>
                {discount > 0 && (
                  <div className="flex flex-col justify-center">
                    <span className="text-sm text-surface-400 line-through font-bold">
                      ₹{selectedVariant.mrp.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">
                      {discount}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Rating Badge */}
              <div className="flex flex-col items-end gap-1">
                 <div className="flex items-center gap-1">
                   <span className="text-sm font-extrabold text-emerald-600">4.3</span>
                   <Star className="w-4 h-4 fill-emerald-600 text-emerald-600 -mt-0.5" />
                 </div>
                 <span className="text-[10px] text-surface-500 font-bold">(1.2K Reviews)</span>
              </div>
            </div>

            <div className="h-px bg-surface-100" />

            {/* Select Size */}
            {sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-extrabold text-[#192168]">Select Size</h3>
                  <button className="text-xs font-bold text-[#1668F6] flex items-center gap-1 hover:underline">
                    Size Chart
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {sizes.map((s, idx) => (
                    <button
                      key={s}
                      className={`h-10 min-w-[3.5rem] px-4 rounded-xl font-extrabold text-sm border-2 transition-colors ${
                        idx === 0 // Mocking first as selected for now
                          ? 'bg-[#1668F6] border-[#1668F6] text-white' 
                          : 'bg-white border-surface-200 text-surface-600 hover:border-[#192168] hover:text-[#192168]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Colour Row */}
            <div className={`grid ${colors.length > 0 ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
              {/* Quantity */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-[#192168]">Quantity</h3>
                <div className="flex items-center justify-between w-[120px] h-10 border-2 border-surface-200 rounded-xl px-1">
                  <button className="w-8 h-8 flex items-center justify-center text-surface-400 hover:text-[#192168]">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-extrabold text-[#192168] text-sm">1</span>
                  <button className="w-8 h-8 flex items-center justify-center text-surface-400 hover:text-[#192168]">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Colour */}
              {colors.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-extrabold text-[#192168]">Colour</h3>
                  <div className="flex items-center flex-wrap gap-2">
                    {colors.map((c, i) => (
                      <button
                        key={c}
                        className={`w-9 h-9 rounded-xl border-2 transition-all ${
                          i === 0 ? 'border-[#1668F6] p-[3px]' : 'border-transparent'
                        }`}
                      >
                        <div className="w-full h-full rounded-lg" style={{ backgroundColor: c, border: '1px solid #e5e7eb' }} title={c} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── DESKTOP ACTION BUTTONS (Inline) ── */}
            <div className="hidden md:grid grid-cols-2 gap-4 pt-4">
               <button className="flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-[#1668F6] text-[#1668F6] font-bold text-sm hover:bg-blue-50 transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="flex items-center justify-center gap-2 h-12 rounded-xl bg-[#1668F6] text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                  <Zap className="w-5 h-5 fill-white" />
                  Buy Now
                </button>
            </div>

            {/* Service Badges */}
            <div className="flex items-center justify-between gap-1 p-3 bg-[#f8f9fc] rounded-xl border border-surface-100">
              <div className="flex items-center gap-2 flex-1">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-extrabold text-[#192168]">Secure Payments</span>
                  <span className="text-[9px] font-medium text-surface-500">100% Secure</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-1 justify-center">
                <RotateCcw className="w-6 h-6 text-[#1668F6]" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-extrabold text-[#192168]">Easy Returns</span>
                  <span className="text-[9px] font-medium text-surface-500">7 Days Return</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <Check className="w-6 h-6 text-[#1668F6]" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-extrabold text-[#192168]">Top Quality</span>
                  <span className="text-[9px] font-medium text-surface-500">Trusted Products</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-surface-100" />

            {/* Product Details Accordion */}
            <div className="py-2">
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-between w-full py-2 group"
              >
                <h2 className="text-[15px] font-extrabold text-[#192168]">Product Details</h2>
                {showDetails ? (
                  <ChevronUp className="w-5 h-5 text-[#192168]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#192168]" />
                )}
              </button>
              
              {showDetails && (
                <div className="pt-4 pb-2 space-y-5 animate-fade-in">
                  <div className="grid grid-cols-2 gap-y-5 gap-x-6">
                    <div>
                      <p className="text-[11px] font-extrabold text-[#192168] mb-0.5">Weave Pattern</p>
                      <p className="text-[13px] font-medium text-[#192168]">Regular</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-[#192168] mb-0.5">Transparency</p>
                      <p className="text-[13px] font-medium text-[#192168]">Opaque</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-[#192168] mb-0.5">Fit</p>
                      <p className="text-[13px] font-medium text-[#192168]">Slim Fit</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-[#192168] mb-0.5">Sustainable</p>
                      <p className="text-[13px] font-medium text-[#192168]">Regular</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-[#192168] mb-0.5">Fabric</p>
                      <p className="text-[13px] font-medium text-[#192168]">100% Cotton</p>
                    </div>
                  </div>
                  <p className="text-[13px] font-medium text-[#192168] leading-relaxed pt-2">
                    {product.description || 'Navy blue round neck printed t-shirt with "Explore The Unknown" graphic print.\nMade from soft and breathable cotton fabric for all-day comfort.'}
                  </p>
                </div>
              )}
            </div>

            <div className="h-px bg-surface-100" />

            {/* Delivery Details */}
            <div className="space-y-5 py-2">
              <h2 className="text-[15px] font-extrabold text-[#192168]">Delivery Details</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 pr-4">
                    <p className="text-[13px] font-extrabold text-[#192168] mb-1">Deliver to</p>
                    <p className="text-[11px] font-medium text-[#192168]">123, MG Road, Near City Mall, Indore, Madhya Pradesh - 452001</p>
                  </div>
                  <button className="text-xs font-bold text-[#1668F6]">Change</button>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#f4f5f9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Truck className="w-4 h-4 text-[#192168]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-extrabold text-[#192168] mb-1">Delivery by</p>
                    <p className="text-[11px] font-medium text-[#192168]">Tomorrow, 12 May</p>
                    <p className="text-[11px] font-extrabold text-emerald-600 mt-1">Order within 2h 30m</p>
                  </div>
                  <span className="text-[13px] font-extrabold text-emerald-600 mt-0.5">FREE</span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#f4f5f9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Box className="w-4 h-4 text-[#1668F6]" />
                  </div>
                  <div className="flex-1 pr-4">
                    <p className="text-[13px] font-extrabold text-[#192168] mb-1">Return Policy</p>
                    <p className="text-[11px] font-medium text-[#192168]">7 Days easy return & exchange</p>
                  </div>
                  <button className="text-xs font-bold text-[#1668F6]">Know More</button>
                </div>
              </div>
            </div>

            <div className="h-px bg-surface-100" />

            {/* Ratings & Reviews */}
            <div className="space-y-5 py-2">
               <div className="flex items-center justify-between">
                 <h2 className="text-[15px] font-extrabold text-[#192168]">Ratings & Reviews</h2>
                 <button className="text-xs font-bold text-[#1668F6]">View All</button>
               </div>
               
               <div className="flex items-center gap-6 px-2">
                 {/* Overall */}
                 <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-[#192168]">
                      <span className="text-4xl font-extrabold">4.3</span>
                      <Star className="w-6 h-6 fill-emerald-600 text-emerald-600" />
                    </div>
                    <span className="text-[11px] font-extrabold text-[#192168] mt-1">(1.2K Reviews)</span>
                 </div>
                 
                 {/* Bars */}
                 <div className="flex-1 space-y-2">
                    {[
                      { s: 5, p: 68, c: 'bg-emerald-600' },
                      { s: 4, p: 22, c: 'bg-emerald-600' },
                      { s: 3, p: 7, c: 'bg-emerald-300' },
                      { s: 2, p: 2, c: 'bg-emerald-300' },
                      { s: 1, p: 1, c: 'bg-emerald-300' },
                    ].map(b => (
                      <div key={b.s} className="flex items-center gap-2 text-[11px] font-extrabold text-[#192168]">
                        <span className="w-2">{b.s}</span>
                        <Star className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600 -ml-0.5" />
                        <div className="flex-1 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                          <div className={`h-full ${b.c} rounded-full`} style={{ width: `${b.p}%` }} />
                        </div>
                        <span className="w-6 text-right font-extrabold text-[#192168]">{b.p}%</span>
                      </div>
                    ))}
                 </div>
               </div>

               {/* Reviews List */}
               <div className="space-y-3 pt-2">
                 {[
                   { t: 'Great quality fabric and perfect fit.', a: 'Rahul Sharma', r: 5 },
                   { t: 'Comfortable and stylish. Loved it!', a: 'Amit Verma', r: 4 },
                 ].map((rev, i) => (
                   <div key={i} className="p-3.5 bg-[#f4f5f9] rounded-xl space-y-2">
                     <div className="flex gap-0.5">
                       {Array.from({length: 5}).map((_, j) => (
                         <Star key={j} className={`w-3.5 h-3.5 ${j < rev.r ? 'fill-emerald-600 text-emerald-600' : 'fill-surface-200 text-surface-200'}`} />
                       ))}
                     </div>
                     <p className="text-xs font-extrabold text-[#192168]">{rev.t}</p>
                     <p className="text-[10px] font-medium text-[#192168] opacity-70">- {rev.a}</p>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        <div className="mt-8 space-y-8 px-4 md:px-0">
          <section className="space-y-4">
             <div className="flex items-center justify-between">
               <h2 className="text-[15px] font-extrabold text-[#192168]">More Products For You</h2>
               <button className="text-xs font-bold text-[#1668F6]">View All</button>
             </div>
             <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
               <div className="w-[160px] md:w-[220px] flex-shrink-0">
                 <ProductCard product={product} />
               </div>
               <div className="w-[160px] md:w-[220px] flex-shrink-0">
                 <ProductCard product={product} />
               </div>
             </div>
          </section>

          <section className="space-y-4">
             <div className="flex items-center justify-between">
               <h2 className="text-[15px] font-extrabold text-[#192168]">You May Also Like</h2>
               <button className="text-xs font-bold text-[#1668F6]">View All</button>
             </div>
             <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
               <div className="w-[160px] md:w-[220px] flex-shrink-0">
                 <ProductCard product={product} />
               </div>
               <div className="w-[160px] md:w-[220px] flex-shrink-0">
                 <ProductCard product={product} />
               </div>
             </div>
          </section>
        </div>
      </main>

      {/* ── MOBILE FIXED BOTTOM BAR ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-surface-100 z-50 flex items-center gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-[#1668F6] text-[#1668F6] font-bold text-[15px] bg-white">
          <ShoppingBag className="w-[18px] h-[18px]" />
          Add to Cart
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-[#0457F4] text-white font-bold text-[15px] shadow-lg shadow-blue-500/20">
          <Zap className="w-[18px] h-[18px] fill-white" />
          Buy Now
        </button>
      </div>
      
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}
