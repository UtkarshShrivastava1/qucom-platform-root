import React, { useState } from 'react';
import { Modal } from '../ui/Modal.js';
import { Input } from '../ui/Input.js';
import { Button } from '../ui/Button.js';
import { StoreCategory } from '@repo/shared-types';
import { Image, Plus, Trash2, Check, IndianRupee } from 'lucide-react';

interface ProductItem {
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

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: ProductItem) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>(StoreCategory.FASHION);
  const [sku, setSku] = useState(`SKU-${Date.now().toString().slice(-5)}`);
  const [price, setPrice] = useState<number>(1299);
  const [mrp, setMrp] = useState<number>(1999);
  const [stock, setStock] = useState<number>(25);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['M', 'L']);

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddProduct({
      id: `prod_${Date.now()}`,
      name,
      category,
      sku,
      price,
      mrp,
      stock,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      sizes: selectedSizes,
    });

    onClose();
    setName('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product / SKU" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input
          label="Product Name"
          placeholder="e.g. Classic Oxford Cotton Shirt"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {Object.values(StoreCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace(/_/g, ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="SKU Code"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="Unique SKU identifier"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Selling Price (₹)"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            leftIcon={<IndianRupee className="w-3.5 h-3.5" />}
            required
          />

          <Input
            label="Original MRP (₹)"
            type="number"
            value={mrp}
            onChange={(e) => setMrp(Number(e.target.value))}
            leftIcon={<IndianRupee className="w-3.5 h-3.5" />}
            required
          />

          <Input
            label="Initial Stock Quantity"
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
          />
        </div>

        {/* Size Variant Chips */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Available Sizes / Variants
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((sz) => {
              const isSelected = selectedSizes.includes(sz);
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => toggleSize(sz)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-brand-500/10 text-brand-400'
                      : 'border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>

        <Input
          label="Product Image URL (Optional)"
          placeholder="https://..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          leftIcon={<Image className="w-4 h-4" />}
        />

        <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Create Product SKU</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
};
