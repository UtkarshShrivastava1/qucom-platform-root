import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  sku?: string;
  name: string;
  imageUrl?: string;
  unitPrice: number;
  quantity: number;
  storeId: string;
  storeName: string;
}

interface CartStore {
  items: CartItem[];
  storeId: string | null;
  storeName: string | null;
  isOpen: boolean;
  conflictItem: CartItem | null;

  // Drawer Controls
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Cart Operations
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => boolean;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  resolveConflict: (confirmReplace: boolean) => void;

  // Computed Totals
  getSubtotal: () => number;
  getTax: () => number;
  getShippingFee: () => number;
  getGrandTotal: () => number;
  getItemCount: () => number;
}

const TAX_RATE = 0.05; // 5% GST
const STANDARD_SHIPPING_FEE = 49;
const FREE_SHIPPING_THRESHOLD = 499;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      storeId: null,
      storeName: null,
      isOpen: false,
      conflictItem: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (item, quantity = 1) => {
        const { items, storeId } = get();

        // Single-Store Cart Invariant Check
        if (storeId && storeId !== item.storeId && items.length > 0) {
          // Trigger conflict state
          set({
            conflictItem: { ...item, quantity },
          });
          return false;
        }

        // Existing item in cart -> increment quantity
        const existingIndex = items.findIndex((i) => i.productId === item.productId);
        if (existingIndex > -1) {
          const updated = [...items];
          const currentItem = updated[existingIndex];
          if (currentItem) {
            updated[existingIndex] = {
              ...currentItem,
              quantity: currentItem.quantity + quantity,
            };
          }
          set({ items: updated, storeId: item.storeId, storeName: item.storeName });
        } else {
          // New item from the same store
          set({
            items: [...items, { ...item, quantity }],
            storeId: item.storeId,
            storeName: item.storeName,
          });
        }

        return true;
      },

      removeItem: (productId) => {
        const remaining = get().items.filter((i) => i.productId !== productId);
        set({
          items: remaining,
          storeId: remaining.length === 0 ? null : get().storeId,
          storeName: remaining.length === 0 ? null : get().storeName,
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const updated = get().items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        );
        set({ items: updated });
      },

      clearCart: () => {
        set({ items: [], storeId: null, storeName: null, conflictItem: null });
      },

      resolveConflict: (confirmReplace) => {
        const { conflictItem } = get();
        if (confirmReplace && conflictItem) {
          set({
            items: [conflictItem],
            storeId: conflictItem.storeId,
            storeName: conflictItem.storeName,
            conflictItem: null,
            isOpen: true,
          });
        } else {
          set({ conflictItem: null });
        }
      },

      getSubtotal: () => {
        return Number(
          get().items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2),
        );
      },

      getTax: () => {
        return Number((get().getSubtotal() * TAX_RATE).toFixed(2));
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
      },

      getGrandTotal: () => {
        return Number(
          (get().getSubtotal() + get().getTax() + get().getShippingFee()).toFixed(2),
        );
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'platform-cart-storage',
      partialize: (state) => ({
        items: state.items,
        storeId: state.storeId,
        storeName: state.storeName,
      }),
    },
  ),
);
