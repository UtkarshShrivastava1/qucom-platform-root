'use client';

import React from 'react';
import { useCartStore } from '../../stores/cart.store';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Store, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    conflictItem,
    resolveConflict,
    storeName,
    getSubtotal,
    getTax,
    getShippingFee,
    getGrandTotal,
    getItemCount,
  } = useCartStore();

  if (!isOpen && !conflictItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Cart Drawer Shell */}
      {/* @intern-task(Vinay): Refine drawer styling, transitions, elevations, and responsive widths */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600">
              {getItemCount()} items
            </span>
          </div>
          <button
            onClick={closeCart}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Store Indicator */}
        {storeName && (
          <div className="flex items-center justify-between bg-gray-50 px-5 py-2.5 text-xs font-medium text-gray-600 border-b">
            <span className="flex items-center gap-1.5 truncate">
              <Store className="h-3.5 w-3.5 text-gray-400" />
              Ordering from: <strong className="text-gray-900">{storeName}</strong>
            </span>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 font-semibold"
            >
              Clear
            </button>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="rounded-full bg-gray-100 p-4 text-gray-400 mb-3">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <p className="text-base font-medium text-gray-900">Your cart is empty</p>
              <p className="text-sm text-gray-500 mt-1">Discover items from nearby local shops</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                // @intern-task(Vinay): Style the item card (thumbnail image, pill steppers, typography)
                <div
                  key={item.productId}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold text-gray-800 mt-0.5">
                        ₹{item.unitPrice}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1.5 text-gray-600 hover:text-gray-900"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1.5 text-gray-600 hover:text-gray-900"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-1.5 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bill Summary & Checkout Button */}
        {items.length > 0 && (
          // @intern-task(Vinay): Refine bill summary card and sticky CTA button
          <div className="border-t bg-gray-50 p-5">
            <div className="space-y-1.5 text-xs text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{getSubtotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{getShippingFee() === 0 ? 'FREE' : `₹${getShippingFee()}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (5% GST)</span>
                <span>₹{getTax()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t">
                <span>Grand Total</span>
                <span>₹{getGrandTotal()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Single-Store Conflict Modal */}
      {conflictItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Replace Cart Items?</h3>
            <p className="mt-2 text-xs text-gray-600 leading-relaxed">
              Your cart contains items from <strong>{storeName}</strong>. You can only order from one store at a time.
              Would you like to discard your current cart and start fresh from <strong>{conflictItem.storeName}</strong>?
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => resolveConflict(false)}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Keep Current
              </button>
              <button
                onClick={() => resolveConflict(true)}
                className="flex-1 rounded-xl bg-amber-600 py-2.5 text-xs font-semibold text-white hover:bg-amber-700"
              >
                Replace Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
