'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Search, Heart, ShoppingBag, Bell, User, ChevronDown } from 'lucide-react';
import { branding } from '@repo/shared-types';

interface HeaderProps {
  address?: string;
  cartCount?: number;
}

export function Header({ address = 'New Delhi, India', cartCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-surface-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Row */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo + Location */}
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-gradient">{branding.appName}</span>
            </Link>

            <button className="hidden sm:flex items-center gap-1.5 text-sm text-surface-300 hover:text-surface-100 transition-colors min-w-0">
              <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span className="truncate max-w-[180px]">{address}</span>
              <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search products, stores & categories..."
                className="w-full pl-10 pr-4 py-2.5 bg-surface-900/80 border border-surface-700/50 rounded-xl text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/50 transition-all"
              />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            <Link href="/wishlist" className="p-2.5 rounded-xl hover:bg-surface-800/60 transition-colors relative group">
              <Heart className="w-5 h-5 text-surface-400 group-hover:text-brand-400 transition-colors" />
            </Link>

            <Link href="/cart" className="p-2.5 rounded-xl hover:bg-surface-800/60 transition-colors relative group">
              <ShoppingBag className="w-5 h-5 text-surface-400 group-hover:text-brand-400 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="p-2.5 rounded-xl hover:bg-surface-800/60 transition-colors relative group">
              <Bell className="w-5 h-5 text-surface-400 group-hover:text-brand-400 transition-colors" />
            </button>

            <Link href="/account" className="p-2.5 rounded-xl hover:bg-surface-800/60 transition-colors group">
              <User className="w-5 h-5 text-surface-400 group-hover:text-brand-400 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search products, stores..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface-900/80 border border-surface-700/50 rounded-xl text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
