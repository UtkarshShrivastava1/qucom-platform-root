import { OrdersClient } from './OrdersClient';
import { Metadata } from 'next';
import { branding } from '@repo/shared-types';

export const metadata: Metadata = {
  title: `My Orders | ${branding.appName}`,
  description: `Track, manage and view all your orders on ${branding.appName}.`,
};

export default function OrdersPage() {
  return <OrdersClient />;
}
