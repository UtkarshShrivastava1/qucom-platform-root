import { OrdersClient } from './OrdersClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Orders | Viztore',
  description: 'Track, manage and view all your orders on Viztore.',
};

export default function OrdersPage() {
  return <OrdersClient />;
}
