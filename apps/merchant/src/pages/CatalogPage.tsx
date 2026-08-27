import React, { useState } from 'react';
import { ProductsGrid, ProductItem } from '../components/catalog/ProductsGrid.js';
import { AddProductModal } from '../components/catalog/AddProductModal.js';
import { BulkUploadModal } from '../components/catalog/BulkUploadModal.js';

const initialSampleProducts: ProductItem[] = [
  {
    id: '1',
    name: 'Slim-Fit Linen Formal Shirt',
    category: 'fashion',
    sku: 'SKU-SHR-001',
    price: 1499,
    mrp: 2299,
    stock: 24,
    sizes: ['S', 'M', 'L', 'XL'],
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Handcrafted Oxford Leather Shoes',
    category: 'footwear',
    sku: 'SKU-OXF-002',
    price: 3299,
    mrp: 4999,
    stock: 12,
    sizes: ['UK 8', 'UK 9', 'UK 10'],
    imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    name: 'Classic Indigo Denim Jacket',
    category: 'fashion',
    sku: 'SKU-JCK-003',
    price: 2799,
    mrp: 3999,
    stock: 8,
    sizes: ['M', 'L'],
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    name: 'Stretch Cotton Slim Chinos',
    category: 'fashion',
    sku: 'SKU-CHN-004',
    price: 1199,
    mrp: 1899,
    stock: 35,
    sizes: ['30', '32', '34', '36'],
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80',
  },
];

export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(initialSampleProducts);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  const handleAddProduct = (newProd: ProductItem) => {
    setProducts([newProd, ...products]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleBulkSuccess = (count: number) => {
    const sampleBulk: ProductItem[] = Array.from({ length: 4 }).map((_, i) => ({
      id: `bulk_${Date.now()}_${i}`,
      name: `Imported Apparel Item #${i + 1}`,
      category: 'fashion',
      sku: `SKU-IMP-00${i + 5}`,
      price: 899 + i * 200,
      mrp: 1499 + i * 300,
      stock: 20 + i * 5,
      sizes: ['M', 'L', 'XL'],
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    }));
    setProducts([...sampleBulk, ...products]);
  };

  return (
    <div>
      <ProductsGrid
        products={products}
        onOpenAddModal={() => setIsAddOpen(true)}
        onOpenBulkModal={() => setIsBulkOpen(true)}
        onDeleteProduct={handleDeleteProduct}
      />

      <AddProductModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <BulkUploadModal
        isOpen={isBulkOpen}
        onClose={() => setIsBulkOpen(false)}
        onBulkSuccess={handleBulkSuccess}
      />
    </div>
  );
};
