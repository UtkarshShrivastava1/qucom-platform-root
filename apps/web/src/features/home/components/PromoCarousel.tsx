'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const promoSlides = [
  {
    id: 1,
    title: 'Up to 50% Off',
    subtitle: 'Summer Fashion Sale',
    cta: 'Shop Now',
    href: '/products?category=fashion',
    gradient: 'from-brand-600 via-purple-600 to-pink-500',
    imageUrl: 'https://picsum.photos/seed/promo1/600/400',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Fresh Electronics Collection',
    cta: 'Explore',
    href: '/products?category=electronics',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    imageUrl: 'https://picsum.photos/seed/promo2/600/400',
  },
  {
    id: 3,
    title: 'Local Favourites',
    subtitle: 'Best Deals From Nearby Stores',
    cta: 'Discover',
    href: '/products?sort=discount',
    gradient: 'from-amber-600 via-orange-600 to-rose-500',
    imageUrl: 'https://picsum.photos/seed/promo3/600/400',
  },
];

export function PromoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slide = promoSlides[currentSlide];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden group shadow-md">
      {/* Slide */}
      <div
        className={`relative h-48 sm:h-72 bg-gradient-to-r ${slide.gradient} flex items-center justify-between px-8 sm:px-16 transition-all duration-500`}
      >
        <div className="relative z-10 space-y-2 sm:space-y-4 max-w-sm sm:max-w-xl">
          <p className="text-white/90 text-sm sm:text-lg font-semibold tracking-wide uppercase">{slide.subtitle}</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">{slide.title}</h2>
          <a
            href={slide.href}
            className="inline-flex items-center gap-2 px-6 py-3 mt-2 rounded-xl bg-white text-surface-900 text-sm sm:text-base font-bold hover:bg-white/90 transition-colors shadow-lg"
          >
            {slide.cta}
          </a>
        </div>

        {/* Banner Image */}
        <div className="absolute right-0 bottom-0 h-full w-1/2 max-w-md hidden sm:block">
          {/* Subtle gradient overlay to blend image edge with the solid color */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-transparent to-transparent z-10" 
               style={{ background: `linear-gradient(to right, var(--tw-gradient-from) 0%, transparent 100%)` }} 
          />
          <img 
            src={slide.imageUrl} 
            alt={slide.title} 
            className="h-full w-full object-cover object-left opacity-90 drop-shadow-2xl mix-blend-overlay"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-surface-950/20 backdrop-blur-md text-white hover:bg-surface-950/40 transition-all opacity-0 group-hover:opacity-100 z-20"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-surface-950/20 backdrop-blur-md text-white hover:bg-surface-950/40 transition-all opacity-0 group-hover:opacity-100 z-20"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {promoSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
              idx === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/80 w-2.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
