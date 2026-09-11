import mongoose from 'mongoose';
import { UserModel } from '../modules/auth/auth.model.js';
import { StoreModel } from '../modules/stores/store.model.js';
import { ProductModel } from '../modules/catalog/product.model.js';
import { OrderModel } from '../modules/orders/order.model.js';
import { env } from '../shared/config/env.config.js';
import { logger } from '../shared/utils/logger.js';
import {
  UserRole,
  StoreCategory,
  StoreApprovalStatus,
  ProductCategory,
  ProductSubType,
} from '@repo/shared-types';
import { OrderStatus } from '../modules/orders/order.types.js';

interface MerchantSeedDefinition {
  user: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role: UserRole;
    isVerified: boolean;
    isActive: boolean;
  };
  store: {
    name: string;
    slug: string;
    description: string;
    category: StoreCategory;
    logoUrl: string;
    bannerUrl: string;
    location: {
      type: 'Point';
      coordinates: [number, number]; // [lng, lat]
    };
    address: {
      street: string;
      landmark: string;
      city: string;
      state: string;
      pincode: string;
    };
    operatingHours: any;
    deliveryRadiusKm: number;
    approvalStatus: StoreApprovalStatus;
    isActive: boolean;
    rating: number;
    reviewCount: number;
    legalDetails: {
      gstin: string;
      pan: string;
      legalBusinessName: string;
      isGstVerified: boolean;
    };
    bankDetails: {
      accountNumber: string;
      ifscCode: string;
      accountHolderName: string;
      bankName: string;
      isVerified: boolean;
    };
  };
  products?: Array<{
    name: string;
    slug: string;
    description: string;
    category: ProductCategory;
    subCategory: string;
    subType: ProductSubType;
    brand: string;
    tags: string[];
    isFeatured: boolean;
    variants: Array<{
      sku: string;
      size: string;
      color: string;
      colorHex: string;
      price: number;
      mrp: number;
      stock: number;
      images: string[];
      isActive: boolean;
    }>;
  }>;
}

const SEED_DATA: MerchantSeedDefinition[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. Fashion Merchant (Approved - Mumbai)
  // ──────────────────────────────────────────────────────────────────────────
  {
    user: {
      fullName: 'RaHul Sharma',
      email: 'rahul.merchant@example.com',
      phone: '9876543210',
      password: 'Password@123',
      role: UserRole.MERCHANT,
      isVerified: true,
      isActive: true,
    },
    store: {
      name: 'Urban Vogue Studio',
      slug: 'urban-vogue-studio',
      description: 'Premium curated men and women ethnic & contemporary fashion collection from local artisans.',
      category: StoreCategory.FASHION,
      logoUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop',
      bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop',
      location: {
        type: 'Point',
        coordinates: [72.8362, 19.0596], // Bandra West, Mumbai
      },
      address: {
        street: 'Plot 42, Hill Road, Bandra West',
        landmark: 'Opposite Elco Arcade',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
      },
      operatingHours: {
        monday: { open: '10:00', close: '22:00', isOpen: true },
        tuesday: { open: '10:00', close: '22:00', isOpen: true },
        wednesday: { open: '10:00', close: '22:00', isOpen: true },
        thursday: { open: '10:00', close: '22:00', isOpen: true },
        friday: { open: '10:00', close: '22:30', isOpen: true },
        saturday: { open: '10:00', close: '23:00', isOpen: true },
        sunday: { open: '11:00', close: '22:00', isOpen: true },
      },
      deliveryRadiusKm: 4.5,
      approvalStatus: StoreApprovalStatus.APPROVED,
      isActive: true,
      rating: 4.8,
      reviewCount: 42,
      legalDetails: {
        gstin: '27AABCS1429B1ZB',
        pan: 'AABCS1429B',
        legalBusinessName: 'Urban Vogue Studio Retail LLP',
        isGstVerified: true,
      },
      bankDetails: {
        accountNumber: '91820038472910',
        ifscCode: 'HDFC0000240',
        accountHolderName: 'Urban Vogue Studio Retail LLP',
        bankName: 'HDFC Bank Ltd',
        isVerified: true,
      },
    },
    products: [
      {
        name: 'Slim Fit Handloom Linen Shirt',
        slug: 'slim-fit-handloom-linen-shirt',
        description: 'Breathable, 100% natural organic handloom linen shirt with mandarin collar. Perfect for formal or semi-casual wear.',
        category: ProductCategory.MEN,
        subCategory: 'Shirts',
        subType: ProductSubType.FORMAL,
        brand: 'Urban Vogue',
        tags: ['linen', 'handloom', 'summer', 'formal', 'men'],
        isFeatured: true,
        variants: [
          {
            sku: 'UVS-SH-WHT-M',
            size: 'M',
            color: 'Crisp White',
            colorHex: '#ffffff',
            price: 1499,
            mrp: 2499,
            stock: 18,
            images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop'],
            isActive: true,
          },
          {
            sku: 'UVS-SH-WHT-L',
            size: 'L',
            color: 'Crisp White',
            colorHex: '#ffffff',
            price: 1499,
            mrp: 2499,
            stock: 24,
            images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop'],
            isActive: true,
          },
          {
            sku: 'UVS-SH-BLU-M',
            size: 'M',
            color: 'Powder Blue',
            colorHex: '#93c5fd',
            price: 1599,
            mrp: 2699,
            stock: 12,
            images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop'],
            isActive: true,
          },
        ],
      },
      {
        name: 'Embroidered Chanderi Silk Kurta',
        slug: 'embroidered-chanderi-silk-kurta',
        description: 'Artisanal hand-embroidered Chanderi silk kurta with zari detailing. Features lightweight inner cotton lining.',
        category: ProductCategory.WOMEN,
        subCategory: 'Ethnic Wear',
        subType: ProductSubType.ETHNIC,
        brand: 'Vogue Heritage',
        tags: ['silk', 'ethnic', 'festive', 'women', 'kurta'],
        isFeatured: true,
        variants: [
          {
            sku: 'UVS-KRT-MRN-S',
            size: 'S',
            color: 'Deep Maroon',
            colorHex: '#800000',
            price: 2899,
            mrp: 4500,
            stock: 8,
            images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop'],
            isActive: true,
          },
          {
            sku: 'UVS-KRT-MRN-M',
            size: 'M',
            color: 'Deep Maroon',
            colorHex: '#800000',
            price: 2899,
            mrp: 4500,
            stock: 15,
            images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop'],
            isActive: true,
          },
        ],
      },
      {
        name: 'Comfort-Stretch Relaxed Fit Chinos',
        slug: 'comfort-stretch-relaxed-fit-chinos',
        description: 'Premium stretch twill cotton chinos designed for all-day comfort with deep welt pockets and tailored hem.',
        category: ProductCategory.MEN,
        subCategory: 'Trousers',
        subType: ProductSubType.CASUAL,
        brand: 'Urban Vogue',
        tags: ['chinos', 'cotton', 'casual', 'trousers'],
        isFeatured: false,
        variants: [
          {
            sku: 'UVS-CHN-OLV-32',
            size: '32',
            color: 'Olive Green',
            colorHex: '#556b2f',
            price: 1899,
            mrp: 2999,
            stock: 20,
            images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop'],
            isActive: true,
          },
          {
            sku: 'UVS-CHN-KHK-34',
            size: '34',
            color: 'Khaki Beige',
            colorHex: '#f0e68c',
            price: 1899,
            mrp: 2999,
            stock: 14,
            images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop'],
            isActive: true,
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. Electronics Merchant (Approved - Bengaluru)
  // ──────────────────────────────────────────────────────────────────────────
  {
    user: {
      fullName: 'Priya Patel',
      email: 'priya.merchant@example.com',
      phone: '9876543211',
      password: 'Password@123',
      role: UserRole.MERCHANT,
      isVerified: true,
      isActive: true,
    },
    store: {
      name: 'NexGen Gadget Hub',
      slug: 'nexgen-gadget-hub',
      description: 'Your authorized neighborhood consumer electronics, smartphone accessories, audio gear & smart wearables showroom.',
      category: StoreCategory.ELECTRONICS,
      logoUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&auto=format&fit=crop',
      bannerUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&auto=format&fit=crop',
      location: {
        type: 'Point',
        coordinates: [77.6412, 12.9716], // 100ft Road, Indiranagar, Bengaluru
      },
      address: {
        street: '784, 100ft Road, HAL 2nd Stage, Indiranagar',
        landmark: 'Near Metro Pillar 84',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
      },
      operatingHours: {
        monday: { open: '09:30', close: '21:30', isOpen: true },
        tuesday: { open: '09:30', close: '21:30', isOpen: true },
        wednesday: { open: '09:30', close: '21:30', isOpen: true },
        thursday: { open: '09:30', close: '21:30', isOpen: true },
        friday: { open: '09:30', close: '22:00', isOpen: true },
        saturday: { open: '09:30', close: '22:00', isOpen: true },
        sunday: { open: '10:00', close: '21:00', isOpen: true },
      },
      deliveryRadiusKm: 5.0,
      approvalStatus: StoreApprovalStatus.APPROVED,
      isActive: true,
      rating: 4.9,
      reviewCount: 88,
      legalDetails: {
        gstin: '29AAACP9832K1ZR',
        pan: 'AAACP9832K',
        legalBusinessName: 'NexGen Digital Electronics Pvt Ltd',
        isGstVerified: true,
      },
      bankDetails: {
        accountNumber: '50200049281726',
        ifscCode: 'ICIC0000045',
        accountHolderName: 'NexGen Digital Electronics Pvt Ltd',
        bankName: 'ICICI Bank',
        isVerified: true,
      },
    },
    products: [
      {
        name: 'Pro ANC Wireless Earbuds (Spatial Audio)',
        slug: 'pro-anc-wireless-earbuds-spatial-audio',
        description: 'Active Noise Cancellation up to 42dB, low-latency gaming mode, 36h total battery with Qi wireless charging case.',
        category: ProductCategory.ELECTRONICS,
        subCategory: 'Audio',
        subType: ProductSubType.OTHER,
        brand: 'SoundPulse',
        tags: ['earbuds', 'audio', 'bluetooth', 'anc', 'wireless'],
        isFeatured: true,
        variants: [
          {
            sku: 'NXG-TWS-BLK',
            size: 'Standard',
            color: 'Matte Graphite',
            colorHex: '#1f2937',
            price: 2999,
            mrp: 4999,
            stock: 35,
            images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop'],
            isActive: true,
          },
          {
            sku: 'NXG-TWS-WHT',
            size: 'Standard',
            color: 'Ceramic White',
            colorHex: '#f9fafb',
            price: 2999,
            mrp: 4999,
            stock: 22,
            images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&auto=format&fit=crop'],
            isActive: true,
          },
        ],
      },
      {
        name: 'AMOLED Ultra Smartwatch (Health Suite)',
        slug: 'amoled-ultra-smartwatch-health-suite',
        description: '1.96-inch high-definition AMOLED curved display, continuous SpO2/HR heart rate monitor, Bluetooth phone calls and IP68 waterproof rating.',
        category: ProductCategory.ELECTRONICS,
        subCategory: 'Wearables',
        subType: ProductSubType.SPORTS,
        brand: 'AeroTrack',
        tags: ['smartwatch', 'amoled', 'fitness', 'wearables', 'bluetooth'],
        isFeatured: true,
        variants: [
          {
            sku: 'NXG-WCH-SLV',
            size: '45mm',
            color: 'Titanium Silver',
            colorHex: '#9ca3af',
            price: 3499,
            mrp: 6999,
            stock: 19,
            images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop'],
            isActive: true,
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. Grocery & Staples Merchant (Approved - Delhi)
  // ──────────────────────────────────────────────────────────────────────────
  {
    user: {
      fullName: 'Amit Verma',
      email: 'amit.merchant@example.com',
      phone: '9876543212',
      password: 'Password@123',
      role: UserRole.MERCHANT,
      isVerified: true,
      isActive: true,
    },
    store: {
      name: 'GreenValley Organics',
      slug: 'greenvalley-organics',
      description: 'Pure certified organic farm-fresh staples, stone-ground flours, cold-pressed oils, and artisanal spices.',
      category: StoreCategory.GROCERY_STAPLES,
      logoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format&fit=crop',
      bannerUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&auto=format&fit=crop',
      location: {
        type: 'Point',
        coordinates: [77.2167, 28.6315], // Connaught Place, New Delhi
      },
      address: {
        street: 'Block B, Inner Circle, Connaught Place',
        landmark: 'Near Rajiv Chowk Metro Gate 3',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
      },
      operatingHours: {
        monday: { open: '08:00', close: '22:00', isOpen: true },
        tuesday: { open: '08:00', close: '22:00', isOpen: true },
        wednesday: { open: '08:00', close: '22:00', isOpen: true },
        thursday: { open: '08:00', close: '22:00', isOpen: true },
        friday: { open: '08:00', close: '22:00', isOpen: true },
        saturday: { open: '08:00', close: '22:30', isOpen: true },
        sunday: { open: '08:00', close: '22:00', isOpen: true },
      },
      deliveryRadiusKm: 4.0,
      approvalStatus: StoreApprovalStatus.APPROVED,
      isActive: true,
      rating: 4.7,
      reviewCount: 65,
      legalDetails: {
        gstin: '07AAACV4120M1ZQ',
        pan: 'AAACV4120M',
        legalBusinessName: 'GreenValley Agro Naturals LLP',
        isGstVerified: true,
      },
      bankDetails: {
        accountNumber: '00210200039485',
        ifscCode: 'SBIN0000691',
        accountHolderName: 'GreenValley Agro Naturals LLP',
        bankName: 'State Bank of India',
        isVerified: true,
      },
    },
    products: [
      {
        name: 'Wild Forest Raw Organic Honey 500g',
        slug: 'wild-forest-raw-organic-honey-500g',
        description: 'Unpasteurized, unprocessed multi-floral forest honey sustainably harvested by tribal beekeepers.',
        category: ProductCategory.GROCERY_STAPLES,
        subCategory: 'Honey & Preserves',
        subType: ProductSubType.OTHER,
        brand: 'GreenValley',
        tags: ['organic', 'raw', 'honey', 'natural', 'grocery'],
        isFeatured: true,
        variants: [
          {
            sku: 'GVO-HNY-500G',
            size: '500g',
            color: 'Golden Amber',
            colorHex: '#d97706',
            price: 449,
            mrp: 599,
            stock: 45,
            images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop'],
            isActive: true,
          },
        ],
      },
      {
        name: 'Cold-Pressed Extra Virgin Mustard Oil 1L',
        slug: 'cold-pressed-extra-virgin-mustard-oil-1l',
        description: 'Traditional wood-pressed (Kachi Ghani) golden mustard oil from certified organic seeds. Rich in natural Omega-3.',
        category: ProductCategory.GROCERY_STAPLES,
        subCategory: 'Edible Oils',
        subType: ProductSubType.OTHER,
        brand: 'GreenValley',
        tags: ['oil', 'mustard', 'cold-pressed', 'organic', 'cooking'],
        isFeatured: true,
        variants: [
          {
            sku: 'GVO-OIL-1L',
            size: '1 Litre',
            color: 'Rich Mustard',
            colorHex: '#eab308',
            price: 279,
            mrp: 350,
            stock: 60,
            images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop'],
            isActive: true,
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Home Living Merchant (Pending Review - Pune)
  // ──────────────────────────────────────────────────────────────────────────
  {
    user: {
      fullName: 'Sneha Kulkarni',
      email: 'sneha.merchant@example.com',
      phone: '9876543213',
      password: 'Password@123',
      role: UserRole.MERCHANT,
      isVerified: true,
      isActive: true,
    },
    store: {
      name: 'Artisan Pottery & Decor',
      slug: 'artisan-pottery-decor',
      description: 'Handcrafted ceramic tableware, terracotta planters, and bespoke home decor artifacts.',
      category: StoreCategory.HOME_LIVING,
      logoUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&auto=format&fit=crop',
      bannerUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop',
      location: {
        type: 'Point',
        coordinates: [73.8967, 18.5362], // Koregaon Park, Pune
      },
      address: {
        street: 'Lane 7, Koregaon Park',
        landmark: 'Behind German Bakery',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
      },
      operatingHours: {
        monday: { open: '11:00', close: '20:00', isOpen: true },
        tuesday: { open: '11:00', close: '20:00', isOpen: true },
        wednesday: { open: '11:00', close: '20:00', isOpen: true },
        thursday: { open: '11:00', close: '20:00', isOpen: true },
        friday: { open: '11:00', close: '21:00', isOpen: true },
        saturday: { open: '10:00', close: '21:00', isOpen: true },
        sunday: { open: '10:00', close: '20:00', isOpen: true },
      },
      deliveryRadiusKm: 3.5,
      approvalStatus: StoreApprovalStatus.PENDING, // Pending approval test case
      isActive: true,
      rating: 5.0,
      reviewCount: 0,
      legalDetails: {
        gstin: '27AABCK8192A1Z3',
        pan: 'AABCK8192A',
        legalBusinessName: 'Artisan Clay & Crafts Studio',
        isGstVerified: false,
      },
      bankDetails: {
        accountNumber: '10293847561029',
        ifscCode: 'UTIB0000138',
        accountHolderName: 'Artisan Clay & Crafts Studio',
        bankName: 'Axis Bank Ltd',
        isVerified: false,
      },
    },
  },
];

const CUSTOMER_USER = {
  fullName: 'Arjun Mehta',
  email: 'arjun.customer@example.com',
  phone: '9876543299',
  password: 'Password@123',
  role: UserRole.CUSTOMER,
  isVerified: true,
  isActive: true,
  addresses: [
    {
      label: 'Home',
      recipientName: 'Arjun Mehta',
      phone: '9876543299',
      street: '12-B, Sea Breeze Apts, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      isDefault: true,
      coordinates: [72.8362, 19.0596],
    },
  ],
};

export async function seedMerchantsAndData(): Promise<void> {
  logger.info('🌱 Starting database merchant injection...');

  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(env.MONGODB_URI);
    logger.info(`📦 Connected to MongoDB: ${env.MONGODB_URI}`);
  }

  // 1. Seed Customer User
  let customer = await UserModel.findOne({ email: CUSTOMER_USER.email });
  if (!customer) {
    customer = await UserModel.create(CUSTOMER_USER);
    logger.info(`✅ Created test customer: ${customer.email}`);
  } else {
    logger.info(`ℹ️ Test customer already exists: ${customer.email}`);
  }

  const seededMerchants: Array<{
    name: string;
    email: string;
    phone: string;
    storeName: string;
    storeSlug: string;
    status: string;
    category: string;
  }> = [];

  for (const item of SEED_DATA) {
    // 2. Seed or update Merchant User
    let merchantUser = await UserModel.findOne({ email: item.user.email });
    if (!merchantUser) {
      merchantUser = await UserModel.create(item.user);
      logger.info(`👤 Created merchant user: ${item.user.fullName} (${item.user.email})`);
    } else {
      logger.info(`👤 Found existing merchant user: ${merchantUser.email}`);
    }

    // 3. Seed or update Store
    let store = await StoreModel.findOne({ slug: item.store.slug });
    if (!store) {
      store = await StoreModel.create({
        ...item.store,
        ownerId: merchantUser._id,
      });
      logger.info(`🏪 Created store: "${store.name}" (${store.slug}) - Status: ${store.approvalStatus}`);
    } else {
      store.ownerId = merchantUser._id as any;
      store.approvalStatus = item.store.approvalStatus;
      store.isActive = item.store.isActive;
      await store.save();
      logger.info(`🏪 Updated existing store: "${store.name}"`);
    }

    // 4. Seed Products if defined
    if (item.products && item.products.length > 0) {
      for (const prodData of item.products) {
        let product = await ProductModel.findOne({ slug: prodData.slug, storeId: store._id });
        if (!product) {
          product = new ProductModel({
            ...prodData,
            storeId: store._id,
            storeName: store.name,
          });
          await product.save();
          logger.info(`   📦 Seeded product: "${product.name}" (${product.variants.length} variants)`);
        }
      }
    }

    // 5. Seed Mock Orders for Approved Stores (To populate merchant dashboard metrics)
    if (store.approvalStatus === StoreApprovalStatus.APPROVED && customer) {
      const existingOrders = await OrderModel.find({ storeId: store._id.toString() });
      if (existingOrders.length === 0) {
        const products = await ProductModel.find({ storeId: store._id }).limit(2);
        const sampleProd = products[0];
        const variant = sampleProd?.variants?.[0];
        if (sampleProd && variant) {

          // Create 3 sample orders in different states
          const sampleOrders = [
            {
              userId: customer._id.toString(),
              storeId: store._id.toString(),
              orderNumber: `#ORD-${Math.floor(10000 + Math.random() * 90000)}`,
              items: [
                {
                  productId: sampleProd._id.toString(),
                  sku: variant.sku,
                  name: sampleProd.name,
                  quantity: 1,
                  unitPrice: variant.price,
                  storeId: store._id.toString(),
                },
              ],
              shippingAddress: {
                fullName: customer.fullName,
                street: 'Hill Road, Bandra West',
                city: store.address.city,
                state: store.address.state,
                postalCode: store.address.pincode,
                country: 'IN',
                phone: customer.phone,
              },
              subtotal: variant.price,
              tax: Math.round(variant.price * 0.18),
              shippingFee: 49,
              grandTotal: variant.price + Math.round(variant.price * 0.18) + 49,
              status: OrderStatus.PENDING,
              deliveryOtp: '4921',
            },
            {
              userId: customer._id.toString(),
              storeId: store._id.toString(),
              orderNumber: `#ORD-${Math.floor(10000 + Math.random() * 90000)}`,
              items: [
                {
                  productId: sampleProd._id.toString(),
                  sku: variant.sku,
                  name: sampleProd.name,
                  quantity: 2,
                  unitPrice: variant.price,
                  storeId: store._id.toString(),
                },
              ],
              shippingAddress: {
                fullName: customer.fullName,
                street: 'Pali Hill, Bandra West',
                city: store.address.city,
                state: store.address.state,
                postalCode: store.address.pincode,
                country: 'IN',
                phone: customer.phone,
              },
              subtotal: variant.price * 2,
              tax: Math.round(variant.price * 2 * 0.18),
              shippingFee: 0,
              grandTotal: variant.price * 2 + Math.round(variant.price * 2 * 0.18),
              status: OrderStatus.CONFIRMED,
              deliveryOtp: '8172',
            },
            {
              userId: customer._id.toString(),
              storeId: store._id.toString(),
              orderNumber: `#ORD-${Math.floor(10000 + Math.random() * 90000)}`,
              items: [
                {
                  productId: sampleProd._id.toString(),
                  sku: variant.sku,
                  name: sampleProd.name,
                  quantity: 1,
                  unitPrice: variant.price,
                  storeId: store._id.toString(),
                },
              ],
              shippingAddress: {
                fullName: customer.fullName,
                street: 'Turner Road, Bandra West',
                city: store.address.city,
                state: store.address.state,
                postalCode: store.address.pincode,
                country: 'IN',
                phone: customer.phone,
              },
              subtotal: variant.price,
              tax: Math.round(variant.price * 0.18),
              shippingFee: 49,
              grandTotal: variant.price + Math.round(variant.price * 0.18) + 49,
              status: OrderStatus.DELIVERED,
              deliveryOtp: '3391',
              deliveredAt: new Date(Date.now() - 86400000), // Yesterday
            },
          ];

          await OrderModel.insertMany(sampleOrders);
          logger.info(`   🛒 Created ${sampleOrders.length} test orders for store: "${store.name}"`);
        }
      }
    }

    seededMerchants.push({
      name: item.user.fullName,
      email: item.user.email,
      phone: item.user.phone,
      storeName: item.store.name,
      storeSlug: item.store.slug,
      status: item.store.approvalStatus,
      category: item.store.category,
    });
  }

  logger.info('🎉 Seed completed successfully!');
}

// Direct execution guard
if (process.argv[1]?.endsWith('seed-merchants.ts') || process.argv[1]?.endsWith('seed-merchants.js')) {
  seedMerchantsAndData()
    .then(async () => {
      await mongoose.disconnect();
      process.exit(0);
    })
    .catch(async (err) => {
      logger.error('❌ Seed execution failed:', err);
      await mongoose.disconnect();
      process.exit(1);
    });
}
