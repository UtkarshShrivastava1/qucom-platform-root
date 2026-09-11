"use client";
import { Heart, ShoppingCart, Search, Mic, Bell, CircleUserRound, MapPin, ChevronDown } from "lucide-react";
import TopBar from '@/components/layout/TopBar';
import LocationBar from '@/components/layout/LocationBar';
import SearchBar from '@/components/layout/SearchBar';
import CategoryTabs from '@/components/layout/CategoryTabs';
import CategoryIcons from '@/features/home/components/CategoryIcons';
import Logo from '@/components/layout/Logo';
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";

export interface HeaderProps {
  userName?: string;
  address?: string;
  wishlistCount?: number;
  cartCount?: number;
  notificationCount?: number;
  searchPlaceholder?: string;
  className?: string;
}

export function Header({
  userName = "Harish Kumar",
  address = "Q No- 6/B, Street -13, Sector -2, Bhilai",
  wishlistCount = 0,
  cartCount = 3,
  notificationCount = 1,
  searchPlaceholder = "Search for products, stores and more...",
  className = "",
}: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isSimpleHeader = pathname === '/checkout' || pathname === '/account/orders' || pathname === '/account/wishlist' || pathname === '/account/addresses' || pathname === '/account/edit-profile' || pathname === '/account/coupons' || pathname === '/account/support' || pathname === '/account/sell' || pathname === '/account/privacy' || pathname === '/account/feedback' || pathname === '/account/terms' || pathname === '/account/logout' || pathname === '/account/logged-out' || pathname?.startsWith('/account/orders/');
  const isAccountPage = pathname?.startsWith('/account') && !isSimpleHeader;

  return (
    <header className={`w-full select-none ${className}`}>
      <div className="relative pt-1.5 pb-2 overflow-hidden">
        {/* Background Gradient */}
        <div 
          className={`absolute inset-0 z-0 ${isSimpleHeader ? 'hidden md:block' : 'block'}`}
          style={{
            background: "linear-gradient(180deg, #011A5D 0%, #011B62 25%, #002070 45%, #01267F 55%, #04318C 62%, #1A49A2 68%, #3A6AC0 73%, #6894D8 78%, #9EBEEC 84%, #D4E3FA 91%, #EEF4FE 96%, #F5F9FE 100%)"
          }}
        />
        {/* White Background for Mobile Simple Header */}
        {isSimpleHeader && (
          <div className="absolute inset-0 z-0 bg-white md:hidden" />
        )}
        {/* Soft misty fog / glow behind the categories */}
        {!isAccountPage && !isSimpleHeader && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-44 opacity-80"
            style={{
              background:
                "radial-gradient(ellipse 95% 75% at 50% 90%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 80%)",
            }}
            aria-hidden="true"
          />
        )}

        <div className="relative z-10 max-w-[1920px] mx-auto">
          {/* Mobile View (< md) */}
          <div className="md:hidden max-w-2xl mx-auto">
            {!isSimpleHeader ? (
              <>
                <TopBar wishlistCount={wishlistCount} cartCount={cartCount} />
                <LocationBar name={userName} address={address} />
                <SearchBar
                  placeholder={searchPlaceholder}
                  notificationCount={notificationCount}
                />
                {!isAccountPage && <CategoryTabs />}
              </>
            ) : (
              <div className="flex items-center justify-between px-4 py-1 pb-2">
                <button onClick={() => router.push('/account')} className="p-1 -ml-1 text-[#192168]">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <div className="scale-90">
                  <Logo theme="dark" />
                </div>
                <div className="flex items-center gap-4">
                  <button type="button" className="text-[#192168]" onClick={() => router.push('/account/wishlist')}>
                    <Heart className="h-6 w-6" strokeWidth={1.5} />
                  </button>
                  <button type="button" className="relative text-[#192168]" onClick={() => router.push('/cart')}>
                    <ShoppingCart className="h-6 w-6" strokeWidth={1.5} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 flex h-[18px] min-w-[18px] px-1 items-center justify-center rounded-full bg-[#1668F6] text-[10.5px] font-bold text-white shadow-sm border border-white">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop View (>= md) */}
          <div className="hidden md:flex flex-col px-6 pt-4 pb-2">
            {/* Top Row */}
            <div className="flex items-center justify-between gap-8 mb-2">
              <Logo />

              {/* Location */}
              <button
                type="button"
                className="flex items-center gap-2.5 rounded-full bg-[#021d5c]/60 hover:bg-[#021d5c]/80 transition-colors border border-white/10 px-4 py-2.5 backdrop-blur-md shadow-sm max-w-[280px]"
              >
                <MapPin className="h-4 w-4 shrink-0 text-[#4C82FB]" fill="#4C82FB" strokeWidth={0} />
                <span className="flex-1 truncate text-[12px] text-white text-left">
                  <span className="font-normal">Deliver to </span>
                  <span className="font-medium">{userName}</span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-white" strokeWidth={2.2} />
              </button>

              {/* Search */}
              <div className="flex flex-1 items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-sm max-w-2xl">
                <Search className="h-5 w-5 shrink-0 text-[#1E293B]" strokeWidth={2} />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="w-full truncate bg-transparent text-[13px] text-slate-900 placeholder:text-slate-500/90 font-normal focus:outline-none"
                />
                <button type="button" aria-label="Voice search" className="shrink-0 text-[#1E293B] hover:opacity-80">
                  <Mic className="h-5 w-5" strokeWidth={1.8} />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-5">
                {/* Wishlist */}
                <button type="button" className="relative text-white hover:opacity-85 transition-opacity" onClick={() => router.push('/account/wishlist')}>
                  <Heart className="h-[25px] w-[25px]" strokeWidth={1.75} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button type="button" className="relative text-white hover:opacity-85 transition-opacity" onClick={() => router.push('/cart')}>
                  <ShoppingCart className="h-[25px] w-[25px]" strokeWidth={1.75} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-[18px] min-w-[18px] px-1 items-center justify-center rounded-full bg-[#1668F6] text-[10.5px] font-bold text-white shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Notifications */}
                <button type="button" className="relative text-white hover:opacity-85 transition-opacity">
                  <Bell className="h-[25px] w-[25px]" strokeWidth={1.75} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] px-1 items-center justify-center rounded-full bg-[#FF3B30] text-[10px] font-bold text-white shadow-sm">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {/* Profile */}
                <button type="button" className="text-white hover:opacity-85 transition-opacity" onClick={() => router.push('/account')}>
                  <CircleUserRound className="h-[25px] w-[25px]" strokeWidth={1.6} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Icons under the gradient for Mobile */}
      {!isAccountPage && !isSimpleHeader && (
        <div className="md:hidden bg-gradient-to-b from-[#F5F9FE] to-white pt-2 pb-1">
          <CategoryIcons />
        </div>
      )}
    </header>
  );
}

export default Header;
