import React from 'react';
import type { Metadata } from 'next';
import { ProductDetailClient } from './ProductDetailClient';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `Product — ${params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}`,
    description: 'View product details, select variants, and shop from local stores.',
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductDetailClient slug={params.slug} />;
}
