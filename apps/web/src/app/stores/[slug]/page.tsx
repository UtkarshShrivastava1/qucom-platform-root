import React from 'react';
import type { Metadata } from 'next';
import { StoreStorefrontClient } from './StoreStorefrontClient';

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `Store — ${params.slug}`,
    description: `Browse products and deals from this local store.`,
  };
}

export default function StoreStorefrontPage({ params }: { params: { slug: string } }) {
  return <StoreStorefrontClient slug={params.slug} />;
}
