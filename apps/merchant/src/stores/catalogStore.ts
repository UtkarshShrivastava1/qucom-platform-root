import { create } from 'zustand';

export interface StorageLocation {
  warehouse: string;
  room?: string;
  rack?: string;
  shelf?: string;
  bin?: string;
  description?: string;
}

export interface TaxConfig {
  category: string;
  rate: number;
  inclusive: boolean;
  amount?: number;
}

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  subCategory: string;
  productType: string;
  brand: string;
  stock: number;
  lowStockThreshold: number;
  status: 'active' | 'inactive' | 'draft' | 'out_of_stock';
  price: number;
  costPrice?: number;
  mrp?: number;
  images: string[];
  attributes: Record<string, string>;
  storageLocation: StorageLocation;
  tax: TaxConfig;
  updatedAt: string;
  // Step 1-3 extended fields
  productIdentification?: 'new' | 'existing';
  existingSearchTerm?: string;
  hsnCode?: string;
  description?: string;
  tags?: string[];
  trackInventory?: boolean;
  countryOfOrigin?: string;
  warranty?: string;
  isReturnable?: boolean;
  weight?: string;
  dimensions?: {
    length: string;
    width: string;
    height: string;
  };
  material?: string;
  careInstructions?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface CatalogKPIs {
  totalProducts: number;
  activeProducts: number;
  lowStock: number;
  outOfStock: number;
  draft: number;
  totalChangePct: number;
  activeChangePct: number;
  lowStockChangePct: number;
  outOfStockChangePct: number;
}

export type CatalogViewMode = 'list' | 'wizard' | 'preview';
export type WizardStep = 1 | 2 | 3;

interface CatalogStoreState {
  products: ProductItem[];
  kpis: CatalogKPIs;

  // Table filtering & search
  searchQuery: string;
  categoryFilter: string;
  subCategoryFilter: string;
  productTypeFilter: string;
  brandFilter: string;
  statusFilter: string;

  // Table Selection & Pagination
  selectedProductIds: string[];
  currentPage: number;
  pageSize: number;

  // View state
  activeView: CatalogViewMode;
  wizardStep: WizardStep;
  draftProduct: Partial<ProductItem>;

  // Modals
  isStockModalOpen: boolean;
  selectedProductForStock: ProductItem | null;
  isPrintLabelModalOpen: boolean;
  selectedProductForLabel: ProductItem | null;
  isDeleteModalOpen: boolean;
  selectedProductForDelete: ProductItem | null;

  // Actions
  setSearchQuery: (q: string) => void;
  setCategoryFilter: (c: string) => void;
  setSubCategoryFilter: (sc: string) => void;
  setProductTypeFilter: (pt: string) => void;
  setBrandFilter: (b: string) => void;
  setStatusFilter: (s: string) => void;
  clearFilters: () => void;

  setSelectedProductIds: (ids: string[]) => void;
  toggleSelectProduct: (id: string) => void;
  toggleSelectAll: () => void;
  setCurrentPage: (page: number) => void;

  setActiveView: (view: CatalogViewMode) => void;
  setWizardStep: (step: WizardStep) => void;
  updateDraftProduct: (updates: Partial<ProductItem>) => void;
  resetDraftProduct: () => void;
  loadProductIntoDraft: (product: ProductItem) => void;

  saveDraftAsProduct: () => ProductItem;
  duplicateProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;
  updateStock: (id: string, newStock: number, lowStockThreshold?: number) => void;
  deleteProduct: (id: string) => void;

  // Modal controls
  openStockModal: (product: ProductItem) => void;
  closeStockModal: () => void;
  openPrintLabelModal: (product: ProductItem) => void;
  closePrintLabelModal: () => void;
  openDeleteModal: (product: ProductItem) => void;
  closeDeleteModal: () => void;
}

const initialMockProducts: ProductItem[] = [
  {
    id: 'prd-1',
    name: 'Men Black Round Neck T-Shirt',
    sku: 'PRD-TSHIRT-RD-BLK-M',
    barcode: '8901234567890',
    category: 'Men',
    subCategory: 'T-Shirts',
    productType: 'Round Neck T-Shirt',
    brand: 'Roadster',
    stock: 120,
    lowStockThreshold: 15,
    status: 'active',
    price: 599,
    costPrice: 350,
    mrp: 899,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1622445268121-ac30457e24cb?auto=format&fit=crop&w=600&q=80',
    ],
    attributes: {
      fit: 'Regular',
      sleeve: 'Half Sleeve',
      neck: 'Round Neck',
      fabric: 'Cotton',
      pattern: 'Solid',
      occasion: 'Casual',
      gender: 'Men',
      season: 'Summer',
      color: 'Black',
      size: 'M',
      sizeType: 'Standard Size',
      hasVariants: 'true',
    },
    storageLocation: {
      warehouse: 'Main Warehouse',
      room: 'Room 101',
      rack: 'R-05',
      shelf: 'S-02',
      bin: 'B-03',
      description: 'Near window side, second rack',
    },
    tax: {
      category: 'Apparel (5%)',
      rate: 5,
      inclusive: false,
      amount: 28.52,
    },
    updatedAt: '10 May 2024 10:30 AM',
    productIdentification: 'new',
    hsnCode: '61091000',
    description: 'Premium quality cotton round neck t-shirt for men. Highly breathable fabric with reinforced double stitching, tailored for daily smart casual comfort.',
    tags: ['men t-shirt', 'round neck t-shirt', 'black t-shirt', 'summer wear', 'casual wear', 'cotton'],
    trackInventory: true,
    countryOfOrigin: 'India',
    warranty: 'No Warranty',
    isReturnable: true,
    weight: '0.250',
    dimensions: { length: '30', width: '20', height: '2' },
    material: '100% Combed Cotton',
    careInstructions: 'Machine wash cold, tumble dry low, do not bleach or iron directly on print.',
    metaTitle: 'Men Black Round Neck T-Shirt - Cotton Casual Wear',
    metaDescription: 'Buy premium quality men black round neck t-shirt made with 100% cotton. Perfect for summer and everyday casual wear.',
  },
  {
    id: 'prd-2',
    name: 'Men White Round Neck T-Shirt',
    sku: 'PRD-TSHIRT-RD-WHT-M',
    barcode: '8901234567891',
    category: 'Men',
    subCategory: 'T-Shirts',
    productType: 'Round Neck T-Shirt',
    brand: 'Roadster',
    stock: 80,
    lowStockThreshold: 15,
    status: 'active',
    price: 599,
    costPrice: 340,
    mrp: 899,
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    ],
    attributes: {
      fit: 'Regular',
      sleeve: 'Half Sleeve',
      neck: 'Round Neck',
      fabric: 'Cotton',
      pattern: 'Solid',
      occasion: 'Casual',
      gender: 'Men',
      season: 'Summer',
      color: 'White',
      size: 'M',
      sizeType: 'Standard Size',
      hasVariants: 'true',
    },
    storageLocation: {
      warehouse: 'Main Warehouse',
      room: 'Room 101',
      rack: 'R-05',
      shelf: 'S-03',
      bin: 'B-04',
      description: 'Central shelf rack A',
    },
    tax: {
      category: 'Apparel (5%)',
      rate: 5,
      inclusive: false,
      amount: 28.52,
    },
    updatedAt: '10 May 2024 10:15 AM',
    productIdentification: 'new',
    hsnCode: '61091000',
    description: 'Classic plain white round neck t-shirt in pure breathable cotton fabric.',
    tags: ['white t-shirt', 'men essentials', 'plain white', 'casual wear'],
    trackInventory: true,
    countryOfOrigin: 'India',
    warranty: 'No Warranty',
    isReturnable: true,
    weight: '0.240',
    dimensions: { length: '30', width: '20', height: '2' },
    material: '100% Super-combed Cotton',
    careInstructions: 'Machine wash warm with like colors.',
    metaTitle: 'Men White Round Neck T-Shirt - Pure Cotton Essential',
    metaDescription: 'Crisp and comfortable white crewneck t-shirt for daily styling.',
  },
  {
    id: 'prd-3',
    name: 'Men Navy Blue Round Neck T-Shirt',
    sku: 'PRD-TSHIRT-RD-NVY-L',
    barcode: '8901234567892',
    category: 'Men',
    subCategory: 'T-Shirts',
    productType: 'Round Neck T-Shirt',
    brand: 'Roadster',
    stock: 60,
    lowStockThreshold: 10,
    status: 'active',
    price: 599,
    costPrice: 350,
    mrp: 899,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80',
    ],
    attributes: {
      fit: 'Regular',
      sleeve: 'Half Sleeve',
      neck: 'Round Neck',
      fabric: 'Cotton',
      pattern: 'Solid',
      occasion: 'Casual',
      gender: 'Men',
      season: 'Summer',
      color: 'Navy Blue',
      size: 'L',
      sizeType: 'Standard Size',
      hasVariants: 'true',
    },
    storageLocation: {
      warehouse: 'Main Warehouse',
      room: 'Room 102',
      rack: 'R-02',
      shelf: 'S-01',
      bin: 'B-01',
      description: 'Section Navy Bins',
    },
    tax: {
      category: 'Apparel (5%)',
      rate: 5,
      inclusive: false,
      amount: 28.52,
    },
    updatedAt: '09 May 2024 05:45 PM',
    productIdentification: 'new',
    hsnCode: '61091000',
    description: 'Deep navy blue crewneck t-shirt with bio-wash finish for extra smoothness.',
    tags: ['navy t-shirt', 'men navy blue', 'cotton t-shirt'],
    trackInventory: true,
    countryOfOrigin: 'India',
    warranty: 'No Warranty',
    isReturnable: true,
    weight: '0.260',
    dimensions: { length: '32', width: '22', height: '2' },
    material: '100% Cotton Bio-Washed',
    careInstructions: 'Machine wash cold inside out.',
    metaTitle: 'Men Navy Blue Round Neck T-Shirt',
    metaDescription: 'Comfortable navy blue t-shirt for men.',
  },
  {
    id: 'prd-4',
    name: 'Men Grey Round Neck T-Shirt',
    sku: 'PRD-TSHIRT-RD-GRY-M',
    barcode: '8901234567893',
    category: 'Men',
    subCategory: 'T-Shirts',
    productType: 'Round Neck T-Shirt',
    brand: 'Roadster',
    stock: 45,
    lowStockThreshold: 10,
    status: 'active',
    price: 599,
    costPrice: 350,
    mrp: 899,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
    ],
    attributes: {
      fit: 'Regular',
      sleeve: 'Half Sleeve',
      neck: 'Round Neck',
      fabric: 'Cotton Blend',
      pattern: 'Melange',
      occasion: 'Casual',
      gender: 'Men',
      season: 'Summer',
      color: 'Grey',
      size: 'M',
      sizeType: 'Standard Size',
      hasVariants: 'true',
    },
    storageLocation: {
      warehouse: 'Main Warehouse',
      room: 'Room 101',
      rack: 'R-03',
      shelf: 'S-04',
      bin: 'B-09',
    },
    tax: {
      category: 'Apparel (5%)',
      rate: 5,
      inclusive: false,
      amount: 28.52,
    },
    updatedAt: '09 May 2024 04:20 PM',
    productIdentification: 'new',
    hsnCode: '61091000',
    description: 'Heather grey casual round neck tee.',
    tags: ['grey tee', 'melange t-shirt', 'casual'],
    trackInventory: true,
    countryOfOrigin: 'India',
    warranty: 'No Warranty',
    isReturnable: true,
    weight: '0.245',
    dimensions: { length: '30', width: '20', height: '2' },
  },
  {
    id: 'prd-5',
    name: 'Men Black Polo T-Shirt',
    sku: 'PRD-POLO-BLK-M',
    barcode: '8901234567894',
    category: 'Men',
    subCategory: 'T-Shirts',
    productType: 'Polo T-Shirt',
    brand: 'Roadster',
    stock: 30,
    lowStockThreshold: 10,
    status: 'inactive',
    price: 649,
    costPrice: 390,
    mrp: 999,
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=600&q=80',
    ],
    attributes: {
      fit: 'Slim Fit',
      sleeve: 'Half Sleeve',
      neck: 'Polo Neck',
      fabric: 'Pique Cotton',
      pattern: 'Solid',
      occasion: 'Smart Casual',
      gender: 'Men',
      season: 'All-Season',
      color: 'Black',
      size: 'M',
      sizeType: 'Standard Size',
      hasVariants: 'true',
    },
    storageLocation: {
      warehouse: 'Main Warehouse',
      room: 'Room 103',
      rack: 'R-08',
      shelf: 'S-02',
      bin: 'B-12',
    },
    tax: {
      category: 'Apparel (5%)',
      rate: 5,
      inclusive: false,
      amount: 30.9,
    },
    updatedAt: '08 May 2024 11:10 AM',
    productIdentification: 'new',
    hsnCode: '61051000',
    description: 'Refined pique polo shirt featuring ribbed collar and two-button placket.',
    tags: ['polo t-shirt', 'black polo', 'smart casual'],
    trackInventory: true,
    countryOfOrigin: 'India',
    warranty: 'No Warranty',
    isReturnable: true,
    weight: '0.290',
  },
  {
    id: 'prd-6',
    name: 'Men Maroon Polo T-Shirt',
    sku: 'PRD-POLO-MRN-L',
    barcode: '8901234567895',
    category: 'Men',
    subCategory: 'T-Shirts',
    productType: 'Polo T-Shirt',
    brand: 'Roadster',
    stock: 25,
    lowStockThreshold: 10,
    status: 'active',
    price: 649,
    costPrice: 390,
    mrp: 999,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80',
    ],
    attributes: {
      fit: 'Slim Fit',
      sleeve: 'Half Sleeve',
      neck: 'Polo Neck',
      fabric: 'Pique Cotton',
      pattern: 'Solid',
      occasion: 'Smart Casual',
      gender: 'Men',
      season: 'All-Season',
      color: 'Maroon',
      size: 'L',
      sizeType: 'Standard Size',
      hasVariants: 'true',
    },
    storageLocation: {
      warehouse: 'Main Warehouse',
      room: 'Room 103',
      rack: 'R-08',
      shelf: 'S-03',
      bin: 'B-14',
    },
    tax: {
      category: 'Apparel (5%)',
      rate: 5,
      inclusive: false,
      amount: 30.9,
    },
    updatedAt: '08 May 2024 10:05 AM',
    productIdentification: 'new',
    hsnCode: '61051000',
    description: 'Deep maroon pique polo shirt with collar tipping.',
    tags: ['maroon polo', 'polo t-shirt'],
    trackInventory: true,
    countryOfOrigin: 'India',
    isReturnable: true,
  },
  {
    id: 'prd-7',
    name: 'Men Blue Henley T-Shirt',
    sku: 'PRD-HENLEY-BLU-M',
    barcode: '8901234567896',
    category: 'Men',
    subCategory: 'T-Shirts',
    productType: 'Henley T-Shirt',
    brand: 'Roadster',
    stock: 20,
    lowStockThreshold: 10,
    status: 'active',
    price: 699,
    costPrice: 420,
    mrp: 1099,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
    ],
    attributes: {
      fit: 'Regular',
      sleeve: 'Full Sleeve',
      neck: 'Henley Neck',
      fabric: 'Waffle Knit Cotton',
      pattern: 'Solid',
      occasion: 'Casual',
      gender: 'Men',
      season: 'Winter/Fall',
      color: 'Blue',
      size: 'M',
      sizeType: 'Standard Size',
      hasVariants: 'true',
    },
    storageLocation: {
      warehouse: 'Main Warehouse',
      room: 'Room 102',
      rack: 'R-06',
      shelf: 'S-01',
      bin: 'B-07',
    },
    tax: {
      category: 'Apparel (5%)',
      rate: 5,
      inclusive: false,
      amount: 33.28,
    },
    updatedAt: '07 May 2024 03:30 PM',
    productIdentification: 'new',
    hsnCode: '61091000',
    description: 'Comfortable waffle knit Henley tee with 3-button neckline.',
    tags: ['henley', 'blue t-shirt', 'full sleeve'],
    trackInventory: true,
  },
  {
    id: 'prd-8',
    name: 'Men Striped Round Neck T-Shirt',
    sku: 'PRD-TSHIRT-RD-STP-M',
    barcode: '8901234567897',
    category: 'Men',
    subCategory: 'T-Shirts',
    productType: 'Round Neck T-Shirt',
    brand: 'Roadster',
    stock: 15,
    lowStockThreshold: 20,
    status: 'inactive',
    price: 599,
    costPrice: 350,
    mrp: 899,
    images: [
      'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=600&q=80',
    ],
    attributes: {
      fit: 'Regular',
      sleeve: 'Half Sleeve',
      neck: 'Round Neck',
      fabric: 'Cotton',
      pattern: 'Striped',
      occasion: 'Casual',
      gender: 'Men',
      season: 'Summer',
      color: 'White/Black',
      size: 'M',
      sizeType: 'Standard Size',
      hasVariants: 'true',
    },
    storageLocation: {
      warehouse: 'Main Warehouse',
      room: 'Room 101',
      rack: 'R-04',
      shelf: 'S-02',
      bin: 'B-10',
    },
    tax: {
      category: 'Apparel (5%)',
      rate: 5,
      inclusive: false,
      amount: 28.52,
    },
    updatedAt: '07 May 2024 02:15 PM',
    productIdentification: 'new',
    hsnCode: '61091000',
    description: 'Horizontal black and white nautical striped round neck tee.',
    tags: ['striped tee', 'nautical t-shirt'],
    trackInventory: true,
  },
];

const initialDefaultDraft: Partial<ProductItem> = {
  id: '',
  name: 'Men Black Round Neck T-Shirt',
  sku: 'PRD-2025-06-28-000124',
  barcode: '8901234567890',
  category: 'Men',
  subCategory: 'T-Shirts',
  productType: 'Round Neck T-Shirt',
  brand: 'PUMA',
  stock: 120,
  lowStockThreshold: 10,
  status: 'active',
  price: 599,
  costPrice: 350,
  mrp: 699,
  images: [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1622445268121-ac30457e24cb?auto=format&fit=crop&w=600&q=80',
  ],
  attributes: {
    fit: 'Regular',
    sleeve: 'Half Sleeve',
    neck: 'Round Neck',
    fabric: 'Cotton',
    pattern: 'Solid',
    occasion: 'Casual',
    gender: 'Men',
    season: 'Summer',
    color: 'Black',
    size: 'M',
    sizeType: 'Standard Size',
    hasVariants: 'true',
  },
  storageLocation: {
    warehouse: 'Main Warehouse',
    room: 'Room 101',
    rack: 'R-05',
    shelf: 'S-02',
    bin: 'B-03',
    description: 'Near window side, second rack',
  },
  tax: {
    category: 'Apparel (5%)',
    rate: 5,
    inclusive: false,
    amount: 28.52,
  },
  productIdentification: 'new',
  hsnCode: '61091000',
  description: 'Premium quality cotton round neck t-shirt for men.',
  tags: ['men t-shirt', 'round neck t-shirt', 'black t-shirt', 'summer wear', 'casual wear', 'cotton'],
  trackInventory: true,
  countryOfOrigin: 'India',
  warranty: 'No Warranty',
  isReturnable: true,
  weight: '0.250',
  dimensions: { length: '30', width: '20', height: '2' },
  material: '100% Cotton',
  careInstructions: 'Machine wash cold, tumble dry low.',
  metaTitle: 'Men Black Round Neck T-Shirt - Cotton Casual Wear',
  metaDescription: 'Buy premium quality men black round neck t-shirt made with 100% cotton. Perfect for summer.',
};

export const useCatalogStore = create<CatalogStoreState>((set, get) => ({
  products: initialMockProducts,
  kpis: {
    totalProducts: 1248,
    activeProducts: 1132,
    lowStock: 78,
    outOfStock: 38,
    draft: 12,
    totalChangePct: 12,
    activeChangePct: 8,
    lowStockChangePct: -5,
    outOfStockChangePct: -3,
  },

  // Table filtering & search
  searchQuery: '',
  categoryFilter: 'All Categories',
  subCategoryFilter: 'All Sub-categories',
  productTypeFilter: 'All Product Types',
  brandFilter: 'All Brands',
  statusFilter: 'All Status',

  // Table Selection & Pagination
  selectedProductIds: [],
  currentPage: 1,
  pageSize: 8,

  // View state
  activeView: 'list',
  wizardStep: 1,
  draftProduct: initialDefaultDraft,

  // Modals
  isStockModalOpen: false,
  selectedProductForStock: null,
  isPrintLabelModalOpen: false,
  selectedProductForLabel: null,
  isDeleteModalOpen: false,
  selectedProductForDelete: null,

  setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter, currentPage: 1 }),
  setSubCategoryFilter: (subCategoryFilter) => set({ subCategoryFilter, currentPage: 1 }),
  setProductTypeFilter: (productTypeFilter) => set({ productTypeFilter, currentPage: 1 }),
  setBrandFilter: (brandFilter) => set({ brandFilter, currentPage: 1 }),
  setStatusFilter: (statusFilter) => set({ statusFilter, currentPage: 1 }),
  clearFilters: () =>
    set({
      searchQuery: '',
      categoryFilter: 'All Categories',
      subCategoryFilter: 'All Sub-categories',
      productTypeFilter: 'All Product Types',
      brandFilter: 'All Brands',
      statusFilter: 'All Status',
      currentPage: 1,
    }),

  setSelectedProductIds: (selectedProductIds) => set({ selectedProductIds }),
  toggleSelectProduct: (id) =>
    set((state) => {
      const exists = state.selectedProductIds.includes(id);
      return {
        selectedProductIds: exists
          ? state.selectedProductIds.filter((item) => item !== id)
          : [...state.selectedProductIds, id],
      };
    }),
  toggleSelectAll: () =>
    set((state) => {
      if (state.selectedProductIds.length === state.products.length) {
        return { selectedProductIds: [] };
      }
      return { selectedProductIds: state.products.map((p) => p.id) };
    }),
  setCurrentPage: (currentPage) => set({ currentPage }),

  setActiveView: (activeView) => set({ activeView }),
  setWizardStep: (wizardStep) => set({ wizardStep }),
  updateDraftProduct: (updates) =>
    set((state) => ({
      draftProduct: { ...state.draftProduct, ...updates },
    })),
  resetDraftProduct: () =>
    set({
      draftProduct: {
        ...initialDefaultDraft,
        id: '',
        sku: `PRD-${new Date().toISOString().slice(0, 10)}-${Math.floor(100000 + Math.random() * 900000)}`,
        name: '',
        barcode: String(Math.floor(8900000000000 + Math.random() * 99999999999)),
      },
      wizardStep: 1,
    }),
  loadProductIntoDraft: (product) =>
    set({
      draftProduct: { ...product },
      wizardStep: 1,
      activeView: 'wizard',
    }),

  saveDraftAsProduct: () => {
    const { draftProduct, products } = get();
    const existingIndex = products.findIndex((p) => p.id === draftProduct.id);

    const nowStr = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date());

    const finalizedProduct: ProductItem = {
      id: draftProduct.id || `prd-${Date.now()}`,
      name: draftProduct.name || 'Untitled Product',
      sku: draftProduct.sku || `PRD-${Date.now()}`,
      barcode: draftProduct.barcode || '8901234567890',
      category: draftProduct.category || 'Men',
      subCategory: draftProduct.subCategory || 'T-Shirts',
      productType: draftProduct.productType || 'Round Neck T-Shirt',
      brand: draftProduct.brand || 'Roadster',
      stock: Number(draftProduct.stock ?? 100),
      lowStockThreshold: Number(draftProduct.lowStockThreshold ?? 10),
      status: draftProduct.status || 'active',
      price: Number(draftProduct.price ?? 599),
      costPrice: Number(draftProduct.costPrice ?? 350),
      mrp: Number(draftProduct.mrp ?? 899),
      images: draftProduct.images?.length
        ? draftProduct.images
        : ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'],
      attributes: draftProduct.attributes || {
        fit: 'Regular',
        sleeve: 'Half Sleeve',
        neck: 'Round Neck',
        fabric: 'Cotton',
        color: 'Black',
        size: 'M',
      },
      storageLocation: draftProduct.storageLocation || {
        warehouse: 'Main Warehouse',
        room: 'Room 101',
        rack: 'R-05',
        shelf: 'S-02',
        bin: 'B-03',
      },
      tax: draftProduct.tax || {
        category: 'Apparel (5%)',
        rate: 5,
        inclusive: false,
        amount: 28.52,
      },
      updatedAt: nowStr,
      hsnCode: draftProduct.hsnCode || '61091000',
      description: draftProduct.description || '',
      tags: draftProduct.tags || [],
      countryOfOrigin: draftProduct.countryOfOrigin || 'India',
      warranty: draftProduct.warranty || 'No Warranty',
      isReturnable: draftProduct.isReturnable ?? true,
      weight: draftProduct.weight || '0.250',
      dimensions: draftProduct.dimensions || { length: '30', width: '20', height: '2' },
      material: draftProduct.material || '100% Cotton',
      careInstructions: draftProduct.careInstructions || 'Machine wash cold',
      metaTitle: draftProduct.metaTitle || draftProduct.name,
      metaDescription: draftProduct.metaDescription || draftProduct.description,
    };

    if (existingIndex >= 0) {
      const updatedList = [...products];
      updatedList[existingIndex] = finalizedProduct;
      set({ products: updatedList, activeView: 'list' });
    } else {
      set({ products: [finalizedProduct, ...products], activeView: 'list' });
    }

    return finalizedProduct;
  },

  duplicateProduct: (id) =>
    set((state) => {
      const target = state.products.find((p) => p.id === id);
      if (!target) return {};
      const newSku = `${target.sku.replace(/-copy.*$/, '')}-copy-${Math.floor(100 + Math.random() * 900)}`;
      const duplicated: ProductItem = {
        ...target,
        id: `prd-${Date.now()}`,
        name: `${target.name} (Copy)`,
        sku: newSku,
        status: 'draft',
        barcode: String(Math.floor(8900000000000 + Math.random() * 99999999999)),
        updatedAt: 'Just now',
      };
      return { products: [duplicated, ...state.products] };
    }),

  toggleProductStatus: (id) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
      ),
    })),

  updateStock: (id, newStock, lowStockThreshold) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id
          ? {
              ...p,
              stock: newStock,
              status: newStock <= 0 ? 'out_of_stock' : p.status === 'out_of_stock' ? 'active' : p.status,
              lowStockThreshold: lowStockThreshold !== undefined ? lowStockThreshold : p.lowStockThreshold,
              updatedAt: 'Just now',
            }
          : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
      selectedProductIds: state.selectedProductIds.filter((item) => item !== id),
    })),

  openStockModal: (product) =>
    set({ isStockModalOpen: true, selectedProductForStock: product }),
  closeStockModal: () =>
    set({ isStockModalOpen: false, selectedProductForStock: null }),

  openPrintLabelModal: (product) =>
    set({ isPrintLabelModalOpen: true, selectedProductForLabel: product }),
  closePrintLabelModal: () =>
    set({ isPrintLabelModalOpen: false, selectedProductForLabel: null }),

  openDeleteModal: (product) =>
    set({ isDeleteModalOpen: true, selectedProductForDelete: product }),
  closeDeleteModal: () =>
    set({ isDeleteModalOpen: false, selectedProductForDelete: null }),
}));
