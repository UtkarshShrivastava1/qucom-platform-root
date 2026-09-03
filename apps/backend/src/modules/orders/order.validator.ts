import { z } from 'zod';
import { OrderStatus } from './order.types.js';

export const createOrderSchema = z.object({
  storeId: z.string().min(1, 'Store ID is required'),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'Product ID is required'),
        sku: z.string().optional(),
        name: z.string().min(1, 'Product name is required'),
        quantity: z.number().int().positive('Quantity must be greater than 0'),
        unitPrice: z.number().nonnegative('Unit price must be non-negative'),
        storeId: z.string().min(1, 'Store ID is required'),
      }),
    )
    .min(1, 'Order must contain at least one item'),
  shippingAddress: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().default('IN'),
    phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  }),
});

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  deliveryOtp: z.string().length(4, 'Delivery OTP must be 4 digits').optional(),
});

export const verifyOtpSchema = z.object({
  otp: z.string().length(4, 'OTP must be 4 digits'),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});
