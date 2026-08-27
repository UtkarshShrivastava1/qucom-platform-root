/**
 * Order domain stub types (Expanded in Phase 4)
 */

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PACKED = 'packed',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  READY_FOR_PICKUP = 'ready_for_pickup',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum FulfilmentMode {
  DELIVER = 'deliver',
  PICKUP = 'pickup',
  RESERVE = 'reserve',
}

export enum PaymentMethod {
  UPI = 'upi',
  CARD = 'card',
  NET_BANKING = 'net_banking',
  CASH_ON_DELIVERY = 'cod',
}
