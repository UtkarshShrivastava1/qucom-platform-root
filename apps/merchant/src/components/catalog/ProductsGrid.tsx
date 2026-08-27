import React, { useState } from 'react';
import { Card } from '../ui/Card.js';
import { Badge } from '../ui/Badge.js';
import { Button } from '../ui/Button.js';
import { Input } from '../ui/Input.js';
import { Search, Plus, Upload, Trash2, Edit2, Package, Tag } from 'lucide-react';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  mrp: number;
  stock: number;
  imageUrl?: string;
  sizes: string[];
}

const initialProducts: ProductItem[] = [
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

interface ProductsGridProps {
  products: ProductItem[];
  onOpenAddModal: () => void;
  onOpenBulkModal: () => void;
  onDeleteProduct: (id: string) => void;
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  onOpenAddModal,
  onOpenBulkModal,
  onDeleteProduct,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-5">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Product & Catalog Inventory</h2>
          <p className="text-xs text-slate-400">Manage SKUs, variants, prices and stock counts</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button size="sm" variant="outline" onClick={onOpenBulkModal}>
            <Upload className="w-4 h-4 mr-1.5" />
            <span>Bulk Upload</span>
          </Button>

          <Button size="sm" onClick={onOpenAddModal}>
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Add Single SKU</span>
          </Button>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search by product name or SKU..."
            leftIcon={<Search className="w-4 h-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
          {['all', 'fashion', 'footwear', 'jewellery', 'electronics'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold capitalize whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Package className="w-8 h-8 mx-auto mb-2 text-slate-600" />
            <p className="text-sm">No products found matching criteria.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className="p-3 flex flex-col justify-between overflow-hidden group">
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-950 mb-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={product.stock > 10 ? 'success' : 'warning'} size="sm">
                      {product.stock} In Stock
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 backdrop-blur-sm">
                      {product.sku}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{product.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-100">₹ {product.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-500 line-through">₹ {product.mrp.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {product.sizes.map((s) => (
                      <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 capitalize">{product.category}</span>
                <button
                  type="button"
                  onClick={() => onDeleteProduct(product.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete SKU"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
