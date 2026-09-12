'use client';

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cart.store';
import { CartItemCard } from '@/components/cart/CartItemCard';
import { ArrowRight, ChevronRight, Percent, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTax,
    getShippingFee,
    getGrandTotal,
    getItemCount,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  // Mock UI calculations
  const totalItemCount = getItemCount();
  const subtotal = getSubtotal();
  const tax = getTax();
  const shippingFee = getShippingFee();
  const grandTotal = getGrandTotal();

  // Mock MRP and discount logic based on items
  const totalMrp = items.reduce((sum, item) => sum + Math.round(item.unitPrice * 1.15) * item.quantity, 0);
  const discountOnMrp = totalMrp - subtotal;

  return (
    <main className="min-h-screen bg-transparent pb-24 pt-4">
      <div className="mx-auto max-w-[1920px] rounded-t-3xl bg-white px-4 py-6 shadow-sm min-h-screen border-t">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-[#192168]">My Cart ({totalItemCount})</h1>
          <p className="text-sm text-gray-500 mt-1">Review your items and proceed to checkout</p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500">Your cart is empty.</p>
            <Link href="/" className="mt-4 rounded-lg bg-indigo-600 px-6 py-2 text-white font-medium">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start mt-6">
            <div className="flex-1 w-full">
              {/* Savings Banner */}
              {discountOnMrp > 0 && (
                <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  You're saving ₹{discountOnMrp} on this order!
                </div>
              )}

            {/* Cart Items */}
            <div className="mb-6 flex flex-col gap-4">
              {items.map((item) => (
                <CartItemCard
                  key={item.productId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  onMoveToWishlist={(id) => {
                    // Mock move to wishlist
                    removeItem(id);
                  }}
                />
              ))}
            </div>

            {/* Coupon Section */}
            <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <Percent className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Apply Coupon / Offer</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Save more on your order</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            </div>

            {/* Right Column: Order Summary & Checkout */}
            <div className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-24">
              {/* Price Details */}
              <div className="mb-6 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <h3 className="mb-4 text-sm font-bold text-gray-900 flex justify-between">
                Price Details <span className="font-normal text-gray-500">{totalItemCount} Items</span>
              </h3>
              
              <div className="flex flex-col gap-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span>₹{totalMrp}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount on MRP</span>
                  <span>-₹{discountOnMrp}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className={shippingFee === 0 ? "text-green-600" : ""}>
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
              </div>

              <div className="my-4 border-t border-gray-100 border-dashed"></div>

              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span className="text-xl">₹{grandTotal}</span>
              </div>
            </div>

              {/* Free Delivery Banner */}
              {shippingFee === 0 && (
                <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11h2"/><path d="M15 18H9"/><path d="M19 18h2v-6l-3.4-5.4A2 2 0 0 0 15.9 4H14v9h5z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
                  Yay! You get FREE delivery on this order.
                </div>
              )}

              {/* Desktop Checkout Button */}
              <button
                onClick={() => router.push('/checkout')}
                className="hidden lg:flex w-full items-center justify-center gap-2 rounded-xl bg-[#1668F6] py-3.5 text-base font-bold text-white shadow-md hover:bg-blue-700 transition mb-6"
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Checkout Button (Mobile Only) */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-[72px] left-0 right-0 z-40 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:bottom-0">
          <div className="mx-auto max-w-3xl">
            <button
              onClick={() => router.push('/checkout')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1668F6] py-3.5 text-base font-bold text-white shadow-md hover:bg-blue-700 transition"
            >
              Proceed to Checkout
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
