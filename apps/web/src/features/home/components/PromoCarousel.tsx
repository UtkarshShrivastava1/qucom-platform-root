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
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Fresh Electronics Collection',
    cta: 'Explore',
    href: '/products?category=electronics',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
  },
  {
    id: 3,
    title: 'Local Favourites',
    subtitle: 'Best Deals From Nearby Stores',
    cta: 'Discover',
    href: '/products?sort=discount',
    gradient: 'from-amber-600 via-orange-600 to-rose-500',
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
    <div className="relative w-full rounded-2xl overflow-hidden group">
      {/* Slide */}
      <div
        className={`relative h-48 sm:h-64 bg-gradient-to-r ${slide.gradient} flex items-center justify-between px-8 sm:px-12 transition-all duration-500`}
      >
        <div className="space-y-2 sm:space-y-3">
          <p className="text-white/80 text-sm sm:text-base font-medium">{slide.subtitle}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{slide.title}</h2>
          <a
            href={slide.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-surface-900 text-sm font-semibold hover:bg-white/90 transition-colors shadow-lg"
          >
            {slide.cta}
          </a>
        </div>

        {/* Decorative circles */}
        <div className="hidden sm:block absolute right-12 top-1/2 -translate-y-1/2">
          <div className="w-32 h-32 rounded-full bg-white/10 animate-pulse-soft" />
          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/5" />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface-950/40 backdrop-blur-sm text-white hover:bg-surface-950/60 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface-950/40 backdrop-blur-sm text-white hover:bg-surface-950/60 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {promoSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? 'bg-white w-6'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
