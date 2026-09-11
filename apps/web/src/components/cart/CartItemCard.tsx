import React from 'react';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';
import { CartItem } from '../../stores/cart.store';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onMoveToWishlist?: (productId: string) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist,
}) => {
  // Mock MRP to calculate discount based on unit price (for UI purposes)
  const mrp = Math.round(item.unitPrice * 1.15);
  const discountPercent = Math.round(((mrp - item.unitPrice) / mrp) * 100);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-full w-full object-cover object-center p-2"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-1 flex-col">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                {item.name}
              </h3>
              {item.sku && (
                <p className="mt-1 text-xs text-gray-500">{item.sku}</p>
              )}
              {/* Mock stock status */}
              <div className="mt-2 inline-flex items-center rounded bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                In Stock
              </div>
            </div>
            
            <div className="text-right flex-shrink-0">
              <div className="text-base font-bold text-gray-900">
                ₹{item.unitPrice}
              </div>
              <div className="mt-1 flex items-center justify-end gap-1.5 text-[11px]">
                <span className="text-gray-400 line-through">₹{mrp}</span>
                <span className="font-semibold text-green-600">{discountPercent}% OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions & Quantity */}
      <div className="flex items-center justify-between mt-1">
        <button
          onClick={() => onMoveToWishlist?.(item.productId)}
          className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
        >
          <Heart className="h-3.5 w-3.5" />
          Move to Wishlist
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onRemove(item.productId)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <div className="flex h-8 items-center rounded-lg border border-gray-200">
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
              className="flex h-full w-8 items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-semibold text-gray-900">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              className="flex h-full w-8 items-center justify-center text-indigo-600 hover:bg-indigo-50"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
