import { Heart, ShoppingCart } from "lucide-react";
import Logo from '@/components/layout/Logo';
import { useRouter } from 'next/navigation';

interface TopBarProps {
  wishlistCount?: number;
  cartCount?: number;
}

export default function TopBar({ wishlistCount = 0, cartCount = 3 }: TopBarProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 pt-1 pb-3">
      <Logo />

      <div className="flex items-center gap-5">
        {/* Wishlist */}
        <button
          type="button"
          aria-label="Wishlist"
          className="relative text-white hover:opacity-85 transition-opacity"
          onClick={() => router.push('/account/wishlist')}
        >
          <Heart className="h-[25px] w-[25px]" strokeWidth={1.75} />
          {wishlistCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          type="button"
          aria-label="Cart"
          className="relative text-white hover:opacity-85 transition-opacity"
          onClick={() => router.push('/cart')}
        >
          <ShoppingCart className="h-[25px] w-[25px]" strokeWidth={1.75} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 flex h-[18px] min-w-[18px] px-1 items-center justify-center rounded-full bg-[#1668F6] text-[10.5px] font-bold text-white shadow-sm">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
