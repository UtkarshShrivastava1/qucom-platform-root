import { create } from 'zustand';

export type OrderTab =
  | 'new_orders'
  | 'accepted'
  | 'ready_to_ship'
  | 'shipped'
  | 'delivered'
  | 'all_orders'
  | 'cancelled'
  | 'returns';

export type OrderStatus =
  | 'new'
  | 'accepted'
  | 'ready_to_ship'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'return_requested'
  | 'returned';

export interface OrderItemDetail {
  id: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface MerchantOrderRecord {
  id: string;
  orderNumber: string;
  orderType: 'Online Order' | 'Manual In-Store' | 'Express Delivery';
  status: OrderStatus;
  customer: {
    name: string;
    email: string;
    phone: string;
    avatarInitials?: string;
  };
  deliveryAddress: {
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    fullText: string;
  };
  items: OrderItemDetail[];
  itemsSummary: {
    count: number;
    title: string;
    extraCount?: number;
    categoryIconType: 'tshirt' | 'kurti' | 'jeans' | 'saree' | 'dress' | 'shorts';
  };
  pricing: {
    itemsTotal: number;
    packagingFee: number;
    deliveryFee: number;
    discount?: number;
    totalAmount: number;
  };
  payment: {
    status: 'Paid' | 'Pending' | 'Refunded' | 'Failed';
    paymentMethod: 'Online Paid' | 'Cash on Delivery' | 'Card / POS';
    mode: 'UPI' | 'Card' | 'Cash' | 'NetBanking';
  };
  otp: string; // 4-digit runner verification code
  timestamps: {
    createdAt: string; // e.g. "19 May 2024 09:42 AM"
    acceptedAt?: string;
    shippedAt?: string;
    deliveredAt?: string;
    cancelledAt?: string;
    returnRequestedAt?: string;
  };
  courier?: {
    partner: string;
    trackingId: string;
    trackingUrl?: string;
  };
  cancellation?: {
    reason: string;
    refundStatus: string;
  };
  returns?: {
    returnStatus: string;
    refundStatus: string;
    returnReason: string;
  };
  currentStageName?: string;
  notes?: {
    customerInstructions?: string;
    merchantNotes?: string;
  };
}

interface OrderStoreState {
  orders: MerchantOrderRecord[];
  activeTab: OrderTab;
  searchQuery: string;
  paymentStatusFilter: string;
  orderStatusFilter: string;
  fulfillmentTypeFilter: string;
  dateRange: string;
  selectedOrderIds: string[];

  // Actions
  setActiveTab: (tab: OrderTab) => void;
  setSearchQuery: (query: string) => void;
  setPaymentStatusFilter: (status: string) => void;
  setOrderStatusFilter: (status: string) => void;
  setFulfillmentTypeFilter: (type: string) => void;
  setDateRange: (range: string) => void;
  toggleOrderSelection: (orderId: string) => void;
  selectAllOrders: (orderIds: string[]) => void;
  clearSelection: () => void;

  // Pipeline transitions
  acceptOrder: (orderId: string) => void;
  acceptAllNewOrders: () => void;
  rejectOrder: (orderId: string) => void;
  markReadyToShip: (orderId: string) => void;
  dispatchOrder: (orderId: string) => void;
  addManualOrder: (newOrder: Partial<MerchantOrderRecord>) => void;
}

const initialMockOrders: MerchantOrderRecord[] = [
  // 1. New Orders
  {
    id: 'ord-1',
    orderNumber: '#ORD-10325',
    orderType: 'Online Order',
    status: 'new',
    customer: {
      name: 'Rohan Verma',
      email: 'rohanverma@gmail.com',
      phone: '+91 98765 43210',
      avatarInitials: 'RV',
    },
    deliveryAddress: {
      street: '123, Green Park, Lajpat Nagar',
      locality: 'Lajpat Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024',
      fullText: 'Rohan Verma\n123, Green Park, Lajpat Nagar\nNew Delhi - 110024',
    },
    items: [
      { id: 'i1', name: 'Men Graphic Print T-shirt', variant: 'Navy Blue, L', price: 999, quantity: 1 },
      { id: 'i2', name: 'Slim Fit Denim Jeans', variant: 'Dark Blue, 32', price: 1800, quantity: 2 },
    ],
    itemsSummary: {
      count: 3,
      title: 'Men T-shirt, Jeans',
      extraCount: 1,
      categoryIconType: 'tshirt',
    },
    pricing: {
      itemsTotal: 2799,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 2799,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '4827',
    timestamps: {
      createdAt: '19 May 2024\n09:42 AM',
    },
    currentStageName: 'New Order (19 May)',
  },
  {
    id: 'ord-2',
    orderNumber: '#ORD-10324',
    orderType: 'Online Order',
    status: 'new',
    customer: {
      name: 'Sneha Kapoor',
      email: 'snehakapoor@gmail.com',
      phone: '+91 91234 56789',
      avatarInitials: 'SK',
    },
    deliveryAddress: {
      street: 'Flat 4B, Shanti Apartments',
      locality: 'Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400058',
      fullText: 'Sneha Kapoor\nFlat 4B, Shanti Apartments\nAndheri West, Mumbai - 400058',
    },
    items: [
      { id: 'i3', name: 'Embroidered Anarkali Kurti', variant: 'Red, M', price: 1199, quantity: 1 },
      { id: 'i4', name: 'Chiffon Printed Dupatta', variant: 'Red, Free Size', price: 450, quantity: 1 },
    ],
    itemsSummary: {
      count: 2,
      title: 'Kurti, Dupatta',
      categoryIconType: 'kurti',
    },
    pricing: {
      itemsTotal: 1649,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 1649,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '3194',
    timestamps: {
      createdAt: '19 May 2024\n09:37 AM',
    },
    currentStageName: 'New Order (19 May)',
  },
  {
    id: 'ord-3',
    orderNumber: '#ORD-10323',
    orderType: 'Online Order',
    status: 'new',
    customer: {
      name: 'Arjun Mehta',
      email: 'arjunmehta@gmail.com',
      phone: '+91 99887 66554',
      avatarInitials: 'AM',
    },
    deliveryAddress: {
      street: '56, Sector 15',
      locality: 'Sector 15',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      fullText: 'Arjun Mehta\n56, Sector 15\nGurgaon - 122001',
    },
    items: [
      { id: 'i5', name: 'Men Straight Fit Jeans', variant: 'Grey, 34', price: 899, quantity: 1 },
    ],
    itemsSummary: {
      count: 1,
      title: 'Men Jeans',
      categoryIconType: 'jeans',
    },
    pricing: {
      itemsTotal: 899,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 899,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '7641',
    timestamps: {
      createdAt: '19 May 2024\n09:22 AM',
    },
    currentStageName: 'New Order (19 May)',
  },
  {
    id: 'ord-4',
    orderNumber: '#ORD-10322',
    orderType: 'Online Order',
    status: 'new',
    customer: {
      name: 'Neha Singh',
      email: 'nehasingh@gmail.com',
      phone: '+91 88990 12233',
      avatarInitials: 'NS',
    },
    deliveryAddress: {
      street: '23, Lotus Residency',
      locality: 'Kothrud',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411014',
      fullText: 'Neha Singh\n23, Lotus Residency\nPune - 411014',
    },
    items: [
      { id: 'i6', name: 'Casual Crop Top', variant: 'Coral, S', price: 899, quantity: 2 },
      { id: 'i7', name: 'Cotton Wide Palazzo Pants', variant: 'White, Free Size', price: 1701, quantity: 2 },
    ],
    itemsSummary: {
      count: 4,
      title: 'Top, Palazzo',
      extraCount: 2,
      categoryIconType: 'kurti',
    },
    pricing: {
      itemsTotal: 3499,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 3499,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'Card',
    },
    otp: '2058',
    timestamps: {
      createdAt: '19 May 2024\n08:58 AM',
    },
    currentStageName: 'New Order (19 May)',
  },
  {
    id: 'ord-5',
    orderNumber: '#ORD-10321',
    orderType: 'Online Order',
    status: 'new',
    customer: {
      name: 'Rahul Sharma',
      email: 'rahulsharma@gmail.com',
      phone: '+91 77660 33445',
      avatarInitials: 'RS',
    },
    deliveryAddress: {
      street: 'B-12, Vivek Vihar',
      locality: 'Vivek Vihar',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302019',
      fullText: 'Rahul Sharma\nB-12, Vivek Vihar\nJaipur - 302019',
    },
    items: [
      { id: 'i8', name: 'Pure Linen Full Sleeve Shirt', variant: 'Beige, 42', price: 2199, quantity: 1 },
      { id: 'i9', name: 'Graphic Crewneck T-shirt', variant: 'Grey, L', price: 1698, quantity: 1 },
    ],
    itemsSummary: {
      count: 2,
      title: 'Shirt, T-shirt',
      categoryIconType: 'tshirt',
    },
    pricing: {
      itemsTotal: 3897,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 3897,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '5932',
    timestamps: {
      createdAt: '19 May 2024\n08:30 AM',
    },
    currentStageName: 'New Order (19 May)',
  },
  {
    id: 'ord-6',
    orderNumber: '#ORD-10320',
    orderType: 'Online Order',
    status: 'new',
    customer: {
      name: 'Priya Patel',
      email: 'priyapatel@gmail.com',
      phone: '+91 81234 56789',
      avatarInitials: 'PP',
    },
    deliveryAddress: {
      street: '9, Shreeji Society',
      locality: 'Alkapuri',
      city: 'Vadodara',
      state: 'Gujarat',
      pincode: '390007',
      fullText: 'Priya Patel\n9, Shreeji Society\nVadodara - 390007',
    },
    items: [
      { id: 'i10', name: 'Bandhani Printed Silk Saree', variant: 'Yellow / Gold', price: 2199, quantity: 1 },
    ],
    itemsSummary: {
      count: 1,
      title: 'Saree',
      categoryIconType: 'saree',
    },
    pricing: {
      itemsTotal: 2199,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 2199,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '8716',
    timestamps: {
      createdAt: '19 May 2024\n08:15 AM',
    },
    currentStageName: 'New Order (19 May)',
  },

  // 2. Accepted Orders
  {
    id: 'ord-acc-1',
    orderNumber: '#ORD-10098',
    orderType: 'Online Order',
    status: 'accepted',
    customer: {
      name: 'Rohan Verma',
      email: 'rohanverma@gmail.com',
      phone: '+91 98765 43210',
      avatarInitials: 'RV',
    },
    deliveryAddress: {
      street: '123, Green Park, Lajpat Nagar',
      locality: 'Lajpat Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024',
      fullText: 'Rohan Verma\n123, Green Park, Lajpat Nagar\nNew Delhi - 110024',
    },
    items: [
      { id: 'i1', name: 'Men T-shirt', variant: 'Navy, L', price: 999, quantity: 1 },
      { id: 'i2', name: 'Slim Fit Jeans', variant: '32', price: 1800, quantity: 2 },
    ],
    itemsSummary: {
      count: 3,
      title: 'Men T-shirt, Jeans',
      extraCount: 1,
      categoryIconType: 'tshirt',
    },
    pricing: {
      itemsTotal: 2799,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 2799,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '4827',
    timestamps: {
      createdAt: '19 May 2024\n09:42 AM',
      acceptedAt: '19 May 2024 09:50 AM',
    },
    currentStageName: 'Accepted (19 May)',
  },
  {
    id: 'ord-acc-2',
    orderNumber: '#ORD-10097',
    orderType: 'Online Order',
    status: 'accepted',
    customer: {
      name: 'Sneha Kapoor',
      email: 'snehakapoor@gmail.com',
      phone: '+91 91234 56789',
      avatarInitials: 'SK',
    },
    deliveryAddress: {
      street: 'Flat 4B, Shanti Apartments',
      locality: 'Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400058',
      fullText: 'Sneha Kapoor\nFlat 4B, Shanti Apartments\nAndheri West, Mumbai - 400058',
    },
    items: [
      { id: 'i3', name: 'Kurti', variant: 'Red, M', price: 1199, quantity: 1 },
      { id: 'i4', name: 'Dupatta', variant: 'Red', price: 450, quantity: 1 },
    ],
    itemsSummary: {
      count: 2,
      title: 'Kurti, Dupatta',
      categoryIconType: 'kurti',
    },
    pricing: {
      itemsTotal: 1649,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 1649,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '3194',
    timestamps: {
      createdAt: '19 May 2024\n09:37 AM',
      acceptedAt: '19 May 2024 09:45 AM',
    },
    currentStageName: 'Accepted (19 May)',
  },
  {
    id: 'ord-acc-3',
    orderNumber: '#ORD-10096',
    orderType: 'Online Order',
    status: 'accepted',
    customer: {
      name: 'Arjun Mehta',
      email: 'arjunmehta@gmail.com',
      phone: '+91 99887 66554',
      avatarInitials: 'AM',
    },
    deliveryAddress: {
      street: '56, Sector 15',
      locality: 'Sector 15',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      fullText: 'Arjun Mehta\n56, Sector 15\nGurgaon - 122001',
    },
    items: [
      { id: 'i5', name: 'Men Jeans', variant: 'Grey, 34', price: 899, quantity: 1 },
    ],
    itemsSummary: {
      count: 1,
      title: 'Men Jeans',
      categoryIconType: 'jeans',
    },
    pricing: {
      itemsTotal: 899,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 899,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '7641',
    timestamps: {
      createdAt: '19 May 2024\n09:22 AM',
      acceptedAt: '19 May 2024 09:30 AM',
    },
    currentStageName: 'Accepted (19 May)',
  },

  // 3. Ready to Ship Orders
  {
    id: 'ord-rts-1',
    orderNumber: '#ORD-10098',
    orderType: 'Online Order',
    status: 'ready_to_ship',
    customer: {
      name: 'Rohan Verma',
      email: 'rohanverma@gmail.com',
      phone: '+91 98765 43210',
      avatarInitials: 'RV',
    },
    deliveryAddress: {
      street: '123, Green Park, Lajpat Nagar',
      locality: 'Lajpat Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024',
      fullText: 'Rohan Verma\n123, Green Park, Lajpat Nagar\nNew Delhi - 110024',
    },
    items: [
      { id: 'i1', name: 'Men T-shirt', variant: 'Navy, L', price: 999, quantity: 1 },
      { id: 'i2', name: 'Slim Fit Jeans', variant: '32', price: 1800, quantity: 2 },
    ],
    itemsSummary: {
      count: 3,
      title: 'Men T-shirt, Jeans',
      extraCount: 1,
      categoryIconType: 'tshirt',
    },
    pricing: {
      itemsTotal: 2799,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 2799,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '4827',
    timestamps: {
      createdAt: '19 May 2024\n10:15 AM',
      acceptedAt: '19 May 2024 10:20 AM',
    },
    currentStageName: 'Ready to Ship (19 May)',
  },
  {
    id: 'ord-rts-2',
    orderNumber: '#ORD-10097',
    orderType: 'Online Order',
    status: 'ready_to_ship',
    customer: {
      name: 'Sneha Kapoor',
      email: 'snehakapoor@gmail.com',
      phone: '+91 91234 56789',
      avatarInitials: 'SK',
    },
    deliveryAddress: {
      street: 'Flat 4B, Shanti Apartments',
      locality: 'Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400058',
      fullText: 'Sneha Kapoor\nFlat 4B, Shanti Apartments\nAndheri West, Mumbai - 400058',
    },
    items: [
      { id: 'i3', name: 'Kurti', variant: 'Red, M', price: 1199, quantity: 1 },
      { id: 'i4', name: 'Dupatta', variant: 'Red', price: 450, quantity: 1 },
    ],
    itemsSummary: {
      count: 2,
      title: 'Kurti, Dupatta',
      categoryIconType: 'kurti',
    },
    pricing: {
      itemsTotal: 1649,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 1649,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '3194',
    timestamps: {
      createdAt: '19 May 2024\n10:08 AM',
      acceptedAt: '19 May 2024 10:12 AM',
    },
    currentStageName: 'Ready to Ship (19 May)',
  },
  {
    id: 'ord-rts-3',
    orderNumber: '#ORD-10096',
    orderType: 'Online Order',
    status: 'ready_to_ship',
    customer: {
      name: 'Arjun Mehta',
      email: 'arjunmehta@gmail.com',
      phone: '+91 99887 66554',
      avatarInitials: 'AM',
    },
    deliveryAddress: {
      street: '56, Sector 15',
      locality: 'Sector 15',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      fullText: 'Arjun Mehta\n56, Sector 15\nGurgaon - 122001',
    },
    items: [
      { id: 'i5', name: 'Men Jeans', variant: 'Grey, 34', price: 899, quantity: 1 },
    ],
    itemsSummary: {
      count: 1,
      title: 'Men Jeans',
      categoryIconType: 'jeans',
    },
    pricing: {
      itemsTotal: 899,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 899,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '7641',
    timestamps: {
      createdAt: '19 May 2024\n09:55 AM',
      acceptedAt: '19 May 2024 10:00 AM',
    },
    currentStageName: 'Ready to Ship (19 May)',
  },

  // 4. Shipped Orders
  {
    id: 'ord-shp-1',
    orderNumber: '#ORD-10089',
    orderType: 'Online Order',
    status: 'shipped',
    customer: {
      name: 'Rohan Verma',
      email: 'rohanverma@gmail.com',
      phone: '+91 98765 43210',
      avatarInitials: 'RV',
    },
    deliveryAddress: {
      street: '123, Green Park, Lajpat Nagar',
      locality: 'Lajpat Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024',
      fullText: 'Rohan Verma\n123, Green Park, Lajpat Nagar\nNew Delhi - 110024',
    },
    items: [
      { id: 'i1', name: 'Men T-shirt', variant: 'Navy, L', price: 999, quantity: 1 },
      { id: 'i2', name: 'Slim Fit Jeans', variant: '32', price: 1800, quantity: 2 },
    ],
    itemsSummary: {
      count: 3,
      title: 'Men T-shirt, Jeans',
      extraCount: 1,
      categoryIconType: 'tshirt',
    },
    pricing: {
      itemsTotal: 2799,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 2799,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '4827',
    timestamps: {
      createdAt: '19 May 2024 08:30 AM',
      shippedAt: '19 May 2024\n10:20 AM',
    },
    courier: {
      partner: 'Delhivery',
      trackingId: '1234567890123',
      trackingUrl: '#track',
    },
    currentStageName: 'Shipped (19 May)',
  },
  {
    id: 'ord-shp-2',
    orderNumber: '#ORD-10088',
    orderType: 'Online Order',
    status: 'shipped',
    customer: {
      name: 'Sneha Kapoor',
      email: 'snehakapoor@gmail.com',
      phone: '+91 91234 56789',
      avatarInitials: 'SK',
    },
    deliveryAddress: {
      street: 'Flat 4B, Shanti Apartments',
      locality: 'Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400058',
      fullText: 'Sneha Kapoor\nFlat 4B, Shanti Apartments\nAndheri West, Mumbai - 400058',
    },
    items: [
      { id: 'i3', name: 'Kurti', variant: 'Red, M', price: 1199, quantity: 1 },
      { id: 'i4', name: 'Dupatta', variant: 'Red', price: 450, quantity: 1 },
    ],
    itemsSummary: {
      count: 2,
      title: 'Kurti, Dupatta',
      categoryIconType: 'kurti',
    },
    pricing: {
      itemsTotal: 1649,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 1649,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '3194',
    timestamps: {
      createdAt: '19 May 2024 08:20 AM',
      shippedAt: '19 May 2024\n10:05 AM',
    },
    courier: {
      partner: 'Delhivery',
      trackingId: '1234567890124',
      trackingUrl: '#track',
    },
    currentStageName: 'Shipped (19 May)',
  },
  {
    id: 'ord-shp-3',
    orderNumber: '#ORD-10087',
    orderType: 'Online Order',
    status: 'shipped',
    customer: {
      name: 'Arjun Mehta',
      email: 'arjunmehta@gmail.com',
      phone: '+91 99887 66554',
      avatarInitials: 'AM',
    },
    deliveryAddress: {
      street: '56, Sector 15',
      locality: 'Sector 15',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      fullText: 'Arjun Mehta\n56, Sector 15\nGurgaon - 122001',
    },
    items: [
      { id: 'i5', name: 'Men Jeans', variant: 'Grey, 34', price: 899, quantity: 1 },
    ],
    itemsSummary: {
      count: 1,
      title: 'Men Jeans',
      categoryIconType: 'jeans',
    },
    pricing: {
      itemsTotal: 899,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 899,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '7641',
    timestamps: {
      createdAt: '19 May 2024 08:10 AM',
      shippedAt: '19 May 2024\n09:58 AM',
    },
    courier: {
      partner: 'Delhivery',
      trackingId: '1234567890456',
      trackingUrl: '#track',
    },
    currentStageName: 'Shipped (19 May)',
  },

  // 5. Delivered Orders
  {
    id: 'ord-del-1',
    orderNumber: '#ORD-10089',
    orderType: 'Online Order',
    status: 'delivered',
    customer: {
      name: 'Rohan Verma',
      email: 'rohanverma@gmail.com',
      phone: '+91 98765 43210',
      avatarInitials: 'RV',
    },
    deliveryAddress: {
      street: '123, Green Park, Lajpat Nagar',
      locality: 'Lajpat Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024',
      fullText: 'Rohan Verma\n123, Green Park, Lajpat Nagar\nNew Delhi - 110024',
    },
    items: [
      { id: 'i1', name: 'Men T-shirt', variant: 'Navy, L', price: 999, quantity: 1 },
      { id: 'i2', name: 'Slim Fit Jeans', variant: '32', price: 1800, quantity: 2 },
    ],
    itemsSummary: {
      count: 3,
      title: 'Men T-shirt, Jeans',
      extraCount: 1,
      categoryIconType: 'tshirt',
    },
    pricing: {
      itemsTotal: 2799,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 2799,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '4827',
    timestamps: {
      createdAt: '19 May 2024 08:00 AM',
      deliveredAt: '19 May 2024\n12:30 PM',
    },
    currentStageName: 'Delivered (19 May)',
  },
  {
    id: 'ord-del-2',
    orderNumber: '#ORD-10088',
    orderType: 'Online Order',
    status: 'delivered',
    customer: {
      name: 'Sneha Kapoor',
      email: 'snehakapoor@gmail.com',
      phone: '+91 91234 56789',
      avatarInitials: 'SK',
    },
    deliveryAddress: {
      street: 'Flat 4B, Shanti Apartments',
      locality: 'Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400058',
      fullText: 'Sneha Kapoor\nFlat 4B, Shanti Apartments\nAndheri West, Mumbai - 400058',
    },
    items: [
      { id: 'i3', name: 'Kurti', variant: 'Red, M', price: 1199, quantity: 1 },
      { id: 'i4', name: 'Dupatta', variant: 'Red', price: 450, quantity: 1 },
    ],
    itemsSummary: {
      count: 2,
      title: 'Kurti, Dupatta',
      categoryIconType: 'kurti',
    },
    pricing: {
      itemsTotal: 1649,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 1649,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '3194',
    timestamps: {
      createdAt: '19 May 2024 07:50 AM',
      deliveredAt: '19 May 2024\n12:05 PM',
    },
    currentStageName: 'Delivered (19 May)',
  },
  {
    id: 'ord-del-3',
    orderNumber: '#ORD-10087',
    orderType: 'Online Order',
    status: 'delivered',
    customer: {
      name: 'Arjun Mehta',
      email: 'arjunmehta@gmail.com',
      phone: '+91 99887 66554',
      avatarInitials: 'AM',
    },
    deliveryAddress: {
      street: '56, Sector 15',
      locality: 'Sector 15',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      fullText: 'Arjun Mehta\n56, Sector 15\nGurgaon - 122001',
    },
    items: [
      { id: 'i5', name: 'Men Jeans', variant: 'Grey, 34', price: 899, quantity: 1 },
    ],
    itemsSummary: {
      count: 1,
      title: 'Men Jeans',
      categoryIconType: 'jeans',
    },
    pricing: {
      itemsTotal: 899,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 899,
    },
    payment: {
      status: 'Paid',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '7641',
    timestamps: {
      createdAt: '19 May 2024 07:30 AM',
      deliveredAt: '19 May 2024\n11:45 AM',
    },
    currentStageName: 'Delivered (19 May)',
  },

  // 6. Cancelled Orders
  {
    id: 'ord-can-1',
    orderNumber: '#ORD-10072',
    orderType: 'Online Order',
    status: 'cancelled',
    customer: {
      name: 'Vikram Sengupta',
      email: 'vikram.s@outlook.com',
      phone: '+91 98450 11223',
      avatarInitials: 'VS',
    },
    deliveryAddress: {
      street: '14, Palm Avenue',
      locality: 'Ballygunge',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700019',
      fullText: 'Vikram Sengupta\n14, Palm Avenue\nKolkata - 700019',
    },
    items: [
      { id: 'i11', name: 'Leather Formal Loafers', variant: 'Tan, 42', price: 2499, quantity: 1 },
    ],
    itemsSummary: {
      count: 1,
      title: 'Leather Loafers',
      categoryIconType: 'jeans',
    },
    pricing: {
      itemsTotal: 2499,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 2499,
    },
    payment: {
      status: 'Refunded',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '9120',
    timestamps: {
      createdAt: '18 May 2024 11:20 AM',
      cancelledAt: '18 May 2024\n01:15 PM',
    },
    cancellation: {
      reason: 'Customer requested cancellation before shipment',
      refundStatus: 'Refunded to UPI (₹2,499)',
    },
    currentStageName: 'Cancelled (18 May)',
  },
  {
    id: 'ord-can-2',
    orderNumber: '#ORD-10071',
    orderType: 'Online Order',
    status: 'cancelled',
    customer: {
      name: 'Ananya Roy',
      email: 'ananya.roy@gmail.com',
      phone: '+91 97312 44556',
      avatarInitials: 'AR',
    },
    deliveryAddress: {
      street: '88, 7th Main',
      locality: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      fullText: 'Ananya Roy\n88, 7th Main\nBengaluru - 560038',
    },
    items: [
      { id: 'i12', name: 'Cotton Summer Maxi Dress', variant: 'Floral, M', price: 1899, quantity: 1 },
    ],
    itemsSummary: {
      count: 1,
      title: 'Summer Dress',
      categoryIconType: 'dress',
    },
    pricing: {
      itemsTotal: 1899,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 1899,
    },
    payment: {
      status: 'Refunded',
      paymentMethod: 'Online Paid',
      mode: 'Card',
    },
    otp: '6543',
    timestamps: {
      createdAt: '18 May 2024 10:05 AM',
      cancelledAt: '18 May 2024\n11:00 AM',
    },
    cancellation: {
      reason: 'Item variant unavailable in store inventory',
      refundStatus: 'Refunded to Card (₹1,899)',
    },
    currentStageName: 'Cancelled (18 May)',
  },

  // 7. Returns
  {
    id: 'ord-ret-1',
    orderNumber: '#ORD-10065',
    orderType: 'Online Order',
    status: 'return_requested',
    customer: {
      name: 'Manoj Tiwari',
      email: 'manoj.tiwari@gmail.com',
      phone: '+91 99100 88221',
      avatarInitials: 'MT',
    },
    deliveryAddress: {
      street: 'Flat 102, Silver Oak Heights',
      locality: 'Noida Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201309',
      fullText: 'Manoj Tiwari\nFlat 102, Silver Oak Heights\nNoida - 201309',
    },
    items: [
      { id: 'i13', name: 'Tailored Blazer Jacket', variant: 'Black, 40', price: 3499, quantity: 1 },
    ],
    itemsSummary: {
      count: 1,
      title: 'Tailored Blazer',
      categoryIconType: 'tshirt',
    },
    pricing: {
      itemsTotal: 3499,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 3499,
    },
    payment: {
      status: 'Pending',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '1829',
    timestamps: {
      createdAt: '17 May 2024 02:30 PM',
      deliveredAt: '18 May 2024 01:10 PM',
      returnRequestedAt: '19 May 2024\n09:15 AM',
    },
    returns: {
      returnStatus: 'Pickup Scheduled',
      refundStatus: 'Pending Inspection',
      returnReason: 'Size did not fit (too tight on shoulders)',
    },
    currentStageName: 'Return Requested (19 May)',
  },
  {
    id: 'ord-ret-2',
    orderNumber: '#ORD-10064',
    orderType: 'Online Order',
    status: 'return_requested',
    customer: {
      name: 'Kavita Joshi',
      email: 'kavita.j@yahoo.com',
      phone: '+91 98220 33991',
      avatarInitials: 'KJ',
    },
    deliveryAddress: {
      street: '45, Deccan Gymkhana',
      locality: 'FC Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411004',
      fullText: 'Kavita Joshi\n45, Deccan Gymkhana\nPune - 411004',
    },
    items: [
      { id: 'i14', name: 'Handcrafted Silk Dupatta', variant: 'Emerald Green', price: 1299, quantity: 1 },
    ],
    itemsSummary: {
      count: 1,
      title: 'Silk Dupatta',
      categoryIconType: 'kurti',
    },
    pricing: {
      itemsTotal: 1299,
      packagingFee: 0,
      deliveryFee: 0,
      totalAmount: 1299,
    },
    payment: {
      status: 'Pending',
      paymentMethod: 'Online Paid',
      mode: 'UPI',
    },
    otp: '4288',
    timestamps: {
      createdAt: '17 May 2024 10:15 AM',
      deliveredAt: '18 May 2024 11:30 AM',
      returnRequestedAt: '18 May 2024\n05:40 PM',
    },
    returns: {
      returnStatus: 'Under Inspection',
      refundStatus: 'Refund Initiated',
      returnReason: 'Color shade differs from website photo',
    },
    currentStageName: 'Return Requested (18 May)',
  },
];

export const useOrderStore = create<OrderStoreState>((set, get) => ({
  orders: initialMockOrders,
  activeTab: 'new_orders',
  searchQuery: '',
  paymentStatusFilter: 'all',
  orderStatusFilter: 'all',
  fulfillmentTypeFilter: 'all',
  dateRange: '13 May 2024 - 19 May 2024',
  selectedOrderIds: ['ord-1'], // Pre-selected row 1 matching mockup!

  setActiveTab: (tab) => set({ activeTab: tab, selectedOrderIds: [] }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setPaymentStatusFilter: (status) => set({ paymentStatusFilter: status }),
  setOrderStatusFilter: (status) => set({ orderStatusFilter: status }),
  setFulfillmentTypeFilter: (type) => set({ fulfillmentTypeFilter: type }),
  setDateRange: (range) => set({ dateRange: range }),

  toggleOrderSelection: (orderId) =>
    set((state) => ({
      selectedOrderIds: state.selectedOrderIds.includes(orderId)
        ? state.selectedOrderIds.filter((id) => id !== orderId)
        : [...state.selectedOrderIds, orderId],
    })),

  selectAllOrders: (orderIds) => set({ selectedOrderIds: orderIds }),
  clearSelection: () => set({ selectedOrderIds: [] }),

  acceptOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? { ...o, status: 'accepted', currentStageName: 'Accepted (Just now)' }
          : o
      ),
    })),

  acceptAllNewOrders: () =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.status === 'new'
          ? { ...o, status: 'accepted', currentStageName: 'Accepted (Just now)' }
          : o
      ),
    })),

  rejectOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'cancelled',
              cancellation: {
                reason: 'Rejected by Merchant',
                refundStatus: 'Refund Initiated',
              },
              currentStageName: 'Cancelled (Just now)',
            }
          : o
      ),
    })),

  markReadyToShip: (orderId) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? { ...o, status: 'ready_to_ship', currentStageName: 'Ready to Ship (Just now)' }
          : o
      ),
    })),

  dispatchOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'shipped',
              courier: {
                partner: 'Delhivery',
                trackingId: `1234567${Math.floor(100000 + Math.random() * 900000)}`,
                trackingUrl: '#track',
              },
              timestamps: {
                ...o.timestamps,
                shippedAt: 'Just now',
              },
              currentStageName: 'Shipped (Just now)',
            }
          : o
      ),
    })),

  addManualOrder: (newOrder) => {
    const nextNum = Math.floor(10330 + Math.random() * 50);
    const fullOrder: MerchantOrderRecord = {
      id: `ord-man-${Date.now()}`,
      orderNumber: `#ORD-${nextNum}`,
      orderType: newOrder.orderType || 'Manual In-Store',
      status: newOrder.status || 'new',
      customer: newOrder.customer || {
        name: 'Walk-in Customer',
        email: 'customer@example.com',
        phone: '+91 99999 00000',
        avatarInitials: 'WC',
      },
      deliveryAddress: newOrder.deliveryAddress || {
        street: 'Store Self-Pickup',
        locality: 'In-Store',
        city: 'Local Store',
        state: 'Local',
        pincode: '000000',
        fullText: 'In-Store Customer Pickup',
      },
      items: newOrder.items || [],
      itemsSummary: newOrder.itemsSummary || {
        count: newOrder.items?.length || 1,
        title: newOrder.items?.[0]?.name || 'Manual Item',
        categoryIconType: 'tshirt',
      },
      pricing: newOrder.pricing || {
        itemsTotal: 1000,
        packagingFee: 20,
        deliveryFee: 40,
        totalAmount: 1060,
      },
      payment: newOrder.payment || {
        status: 'Paid',
        paymentMethod: 'Online Paid',
        mode: 'UPI',
      },
      otp: String(Math.floor(1000 + Math.random() * 9000)),
      timestamps: {
        createdAt: 'Just now',
      },
      currentStageName: 'New Order (Just now)',
      notes: newOrder.notes,
    };

    set((state) => ({
      orders: [fullOrder, ...state.orders],
      activeTab: 'new_orders',
    }));
  },
}));
