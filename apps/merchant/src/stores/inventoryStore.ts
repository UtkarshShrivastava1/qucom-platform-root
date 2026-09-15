import { create } from 'zustand';

export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  subCategory: string;
  productType: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderPoint: number;
  costPrice: number;
  sellingPrice: number;
  imageUrl: string;
  status: StockStatus;
  variantDetails: string;
  lastRestockedAt: string;
}

export type TransactionType =
  | 'PURCHASE_RECEIPT'
  | 'SALES_ORDER'
  | 'STOCK_ADJUSTMENT'
  | 'RETURN_INWARD'
  | 'DAMAGE_WRITE_OFF'
  | 'TRANSFER';

export interface StockTransaction {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  type: TransactionType;
  quantityDelta: number; // e.g. +50 or -12
  balanceAfter: number;
  reason: string;
  referenceNo: string;
  notes?: string;
  user: string;
  timestamp: string;
}

export interface InventoryFilterState {
  searchQuery: string;
  category: string;
  subCategory: string;
  productType: string;
  brand: string;
  stockStatus: string;
}

export interface BulkAdjustmentItem {
  id: string;
  adjustmentType: 'add' | 'reduce';
  quantityDelta: number;
  reason: string;
  referenceNo: string;
  notes?: string;
}

interface InventoryState {
  items: InventoryItem[];
  selectedItem: InventoryItem | null;
  filters: InventoryFilterState;
  
  // View and Modal States
  isAdjustStockDrawerOpen: boolean;
  isStockHistoryDrawerOpen: boolean;
  isBulkAdjustMode: boolean;
  isFullStockHistoryPage: boolean;
  
  // Transaction Log
  transactions: StockTransaction[];
  
  // Actions
  setSearchQuery: (query: string) => void;
  setFilter: (key: keyof InventoryFilterState, value: string) => void;
  clearFilters: () => void;
  
  openAdjustDrawer: (item: InventoryItem) => void;
  closeAdjustDrawer: () => void;
  
  openHistoryDrawer: (item: InventoryItem) => void;
  closeHistoryDrawer: () => void;
  
  toggleBulkAdjustMode: (enabled?: boolean) => void;
  toggleFullHistoryPage: (enabled?: boolean) => void;
  
  adjustStock: (
    itemId: string,
    type: 'add' | 'reduce',
    quantity: number,
    reason: string,
    referenceNo: string,
    notes?: string
  ) => void;
  
  bulkAdjustStock: (adjustments: BulkAdjustmentItem[]) => void;
  deleteProduct: (id: string) => void;
}

const INITIAL_ITEMS: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Men Regular Fit Solid Spread Collar Casual Shirt',
    sku: 'PRD-SHIRT-M-BLK',
    barcode: '8901234567890',
    category: 'Men',
    subCategory: 'Shirts',
    productType: 'Casual Shirts',
    currentStock: 145,
    reservedStock: 15,
    availableStock: 130,
    reorderPoint: 30,
    costPrice: 450,
    sellingPrice: 899,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=120&auto=format&fit=crop&q=80',
    status: 'IN_STOCK',
    variantDetails: 'Size: L | Color: Black',
    lastRestockedAt: '2026-09-12T10:30:00Z',
  },
  {
    id: 'inv-2',
    name: 'Women Pure Cotton Printed Anarkali Kurta',
    sku: 'PRD-KURTA-W-IND',
    barcode: '8901234567891',
    category: 'Women',
    subCategory: 'Ethnic Wear',
    productType: 'Kurtas & Kurtis',
    currentStock: 22,
    reservedStock: 8,
    availableStock: 14,
    reorderPoint: 25,
    costPrice: 650,
    sellingPrice: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=120&auto=format&fit=crop&q=80',
    status: 'LOW_STOCK',
    variantDetails: 'Size: M | Color: Indigo Blue',
    lastRestockedAt: '2026-09-08T14:15:00Z',
  },
  {
    id: 'inv-3',
    name: 'Unisex Wireless Earbuds with ANC & 40H Playtime',
    sku: 'PRD-AUDIO-EBD-BLK',
    barcode: '8901234567892',
    category: 'Electronics',
    subCategory: 'Audio',
    productType: 'Earbuds',
    currentStock: 0,
    reservedStock: 0,
    availableStock: 0,
    reorderPoint: 15,
    costPrice: 1200,
    sellingPrice: 2499,
    imageUrl: 'https://images.unsplash.com/photo-1590658268033-6bf12165a8df?w=120&auto=format&fit=crop&q=80',
    status: 'OUT_OF_STOCK',
    variantDetails: 'Color: Matte Black',
    lastRestockedAt: '2026-08-25T09:00:00Z',
  },
  {
    id: 'inv-4',
    name: 'Premium Leather Bifold RFID Protected Wallet',
    sku: 'PRD-WALLET-LTH-BRN',
    barcode: '8901234567893',
    category: 'Accessories',
    subCategory: 'Wallets',
    productType: 'Leather Wallets',
    currentStock: 88,
    reservedStock: 6,
    availableStock: 82,
    reorderPoint: 20,
    costPrice: 380,
    sellingPrice: 799,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=120&auto=format&fit=crop&q=80',
    status: 'IN_STOCK',
    variantDetails: 'Material: Genuine Leather | Color: Brown',
    lastRestockedAt: '2026-09-14T11:20:00Z',
  },
  {
    id: 'inv-5',
    name: 'Stainless Steel Insulated Water Bottle (1000ml)',
    sku: 'PRD-BOTTLE-SS-1L',
    barcode: '8901234567894',
    category: 'Home & Kitchen',
    subCategory: 'Drinkware',
    productType: 'Water Bottles',
    currentStock: 19,
    reservedStock: 5,
    availableStock: 14,
    reorderPoint: 25,
    costPrice: 320,
    sellingPrice: 599,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=120&auto=format&fit=crop&q=80',
    status: 'LOW_STOCK',
    variantDetails: 'Capacity: 1000ml | Color: Silver',
    lastRestockedAt: '2026-09-02T16:40:00Z',
  },
  {
    id: 'inv-6',
    name: 'Organic Raw Wild Forest Honey (500g Glass Jar)',
    sku: 'PRD-HONEY-WLD-500',
    barcode: '8901234567895',
    category: 'Grocery',
    subCategory: 'Organic & Natural',
    productType: 'Honey',
    currentStock: 64,
    reservedStock: 4,
    availableStock: 60,
    reorderPoint: 15,
    costPrice: 220,
    sellingPrice: 399,
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=120&auto=format&fit=crop&q=80',
    status: 'IN_STOCK',
    variantDetails: 'Weight: 500g | Packaging: Glass Jar',
    lastRestockedAt: '2026-09-10T12:00:00Z',
  },
];

const INITIAL_TRANSACTIONS: StockTransaction[] = [
  {
    id: 'tx-101',
    productId: 'inv-1',
    productName: 'Men Regular Fit Solid Spread Collar Casual Shirt',
    sku: 'PRD-SHIRT-M-BLK',
    type: 'STOCK_ADJUSTMENT',
    quantityDelta: 50,
    balanceAfter: 145,
    reason: 'New Stock Received',
    referenceNo: 'PO-2026-0912',
    notes: 'Direct delivery from distributor warehouse batch #402',
    user: 'Store Manager',
    timestamp: '2026-09-12T10:30:00Z',
  },
  {
    id: 'tx-102',
    productId: 'inv-1',
    productName: 'Men Regular Fit Solid Spread Collar Casual Shirt',
    sku: 'PRD-SHIRT-M-BLK',
    type: 'SALES_ORDER',
    quantityDelta: -5,
    balanceAfter: 95,
    reason: 'Customer Online Purchase',
    referenceNo: '#ORD-89412',
    user: 'System Bot',
    timestamp: '2026-09-11T16:20:00Z',
  },
  {
    id: 'tx-103',
    productId: 'inv-2',
    productName: 'Women Pure Cotton Printed Anarkali Kurta',
    sku: 'PRD-KURTA-W-IND',
    type: 'SALES_ORDER',
    quantityDelta: -8,
    balanceAfter: 22,
    reason: 'Online Flash Sale Fulfillments',
    referenceNo: '#ORD-89240',
    user: 'System Bot',
    timestamp: '2026-09-08T14:15:00Z',
  },
  {
    id: 'tx-104',
    productId: 'inv-3',
    productName: 'Unisex Wireless Earbuds with ANC & 40H Playtime',
    sku: 'PRD-AUDIO-EBD-BLK',
    type: 'SALES_ORDER',
    quantityDelta: -15,
    balanceAfter: 0,
    reason: 'Local Store Counter Clearance',
    referenceNo: '#ORD-88110',
    user: 'Store Cashier',
    timestamp: '2026-08-25T09:00:00Z',
  },
  {
    id: 'tx-105',
    productId: 'inv-4',
    productName: 'Premium Leather Bifold RFID Protected Wallet',
    sku: 'PRD-WALLET-LTH-BRN',
    type: 'STOCK_ADJUSTMENT',
    quantityDelta: 40,
    balanceAfter: 88,
    reason: 'Restock Batch Shipment',
    referenceNo: 'PO-2026-0914',
    notes: 'Imported artisanal leather lot',
    user: 'Store Manager',
    timestamp: '2026-09-14T11:20:00Z',
  },
];

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: INITIAL_ITEMS,
  selectedItem: null,
  filters: {
    searchQuery: '',
    category: 'all',
    subCategory: 'all',
    productType: 'all',
    brand: 'all',
    stockStatus: 'all',
  },
  
  isAdjustStockDrawerOpen: false,
  isStockHistoryDrawerOpen: false,
  isBulkAdjustMode: false,
  isFullStockHistoryPage: false,
  
  transactions: INITIAL_TRANSACTIONS,

  setSearchQuery: (query) =>
    set((state) => ({
      filters: { ...state.filters, searchQuery: query },
    })),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  clearFilters: () =>
    set({
      filters: {
        searchQuery: '',
        category: 'all',
        subCategory: 'all',
        productType: 'all',
        brand: 'all',
        stockStatus: 'all',
      },
    }),

  openAdjustDrawer: (item) =>
    set({
      selectedItem: item,
      isAdjustStockDrawerOpen: true,
      isStockHistoryDrawerOpen: false,
    }),

  closeAdjustDrawer: () =>
    set({
      isAdjustStockDrawerOpen: false,
    }),

  openHistoryDrawer: (item) =>
    set({
      selectedItem: item,
      isStockHistoryDrawerOpen: true,
      isAdjustStockDrawerOpen: false,
    }),

  closeHistoryDrawer: () =>
    set({
      isStockHistoryDrawerOpen: false,
    }),

  toggleBulkAdjustMode: (enabled) =>
    set((state) => ({
      isBulkAdjustMode: enabled !== undefined ? enabled : !state.isBulkAdjustMode,
      isFullStockHistoryPage: false,
    })),

  toggleFullHistoryPage: (enabled) =>
    set((state) => ({
      isFullStockHistoryPage: enabled !== undefined ? enabled : !state.isFullStockHistoryPage,
      isBulkAdjustMode: false,
    })),

  adjustStock: (itemId, type, quantity, reason, referenceNo, notes) => {
    const { items, transactions } = get();
    const targetItem = items.find((i) => i.id === itemId);
    if (!targetItem) return;

    const delta = type === 'add' ? quantity : -quantity;
    const newStock = Math.max(0, targetItem.currentStock + delta);
    const newAvailable = Math.max(0, newStock - targetItem.reservedStock);

    let newStatus: StockStatus = 'IN_STOCK';
    if (newStock === 0) {
      newStatus = 'OUT_OF_STOCK';
    } else if (newStock <= targetItem.reorderPoint) {
      newStatus = 'LOW_STOCK';
    }

    const updatedItem: InventoryItem = {
      ...targetItem,
      currentStock: newStock,
      availableStock: newAvailable,
      status: newStatus,
      lastRestockedAt: new Date().toISOString(),
    };

    const newTransaction: StockTransaction = {
      id: `tx-${Date.now()}`,
      productId: targetItem.id,
      productName: targetItem.name,
      sku: targetItem.sku,
      type: 'STOCK_ADJUSTMENT',
      quantityDelta: delta,
      balanceAfter: newStock,
      reason,
      referenceNo: referenceNo || `REF-${Math.floor(10000 + Math.random() * 90000)}`,
      notes,
      user: 'Store Manager',
      timestamp: new Date().toISOString(),
    };

    set({
      items: items.map((i) => (i.id === itemId ? updatedItem : i)),
      selectedItem: updatedItem,
      transactions: [newTransaction, ...transactions],
      isAdjustStockDrawerOpen: false,
    });
  },

  bulkAdjustStock: (adjustments) => {
    const { items, transactions } = get();
    const newTransactions: StockTransaction[] = [];
    const updatedItems = items.map((item) => {
      const adj = adjustments.find((a) => a.id === item.id);
      if (!adj || adj.quantityDelta === 0) return item;

      const delta = adj.adjustmentType === 'add' ? adj.quantityDelta : -adj.quantityDelta;
      const newStock = Math.max(0, item.currentStock + delta);
      const newAvailable = Math.max(0, newStock - item.reservedStock);

      let newStatus: StockStatus = 'IN_STOCK';
      if (newStock === 0) {
        newStatus = 'OUT_OF_STOCK';
      } else if (newStock <= item.reorderPoint) {
        newStatus = 'LOW_STOCK';
      }

      newTransactions.push({
        id: `tx-${Date.now()}-${item.id}`,
        productId: item.id,
        productName: item.name,
        sku: item.sku,
        type: 'STOCK_ADJUSTMENT',
        quantityDelta: delta,
        balanceAfter: newStock,
        reason: adj.reason || 'Bulk Stock Adjustment',
        referenceNo: adj.referenceNo || `BLK-${Date.now().toString().slice(-6)}`,
        notes: adj.notes,
        user: 'Store Manager',
        timestamp: new Date().toISOString(),
      });

      return {
        ...item,
        currentStock: newStock,
        availableStock: newAvailable,
        status: newStatus,
        lastRestockedAt: new Date().toISOString(),
      };
    });

    set({
      items: updatedItems,
      transactions: [...newTransactions, ...transactions],
      isBulkAdjustMode: false,
    });
  },

  deleteProduct: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));
