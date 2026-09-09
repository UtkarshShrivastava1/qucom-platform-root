import React from 'react';
import { Package, ShoppingBag, AlertTriangle, AlertCircle, FileText } from 'lucide-react';
import { useCatalogStore } from '../../stores/catalogStore.js';

export const CatalogKpiCards: React.FC = () => {
  const { kpis, products } = useCatalogStore();

  // Dynamic calculations can also reflect active items in table
  const activeCount = products.filter((p) => p.status === 'active').length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold).length;
  const outOfStockCount = products.filter((p) => p.stock === 0 || p.status === 'out_of_stock').length;
  const draftCount = products.filter((p) => p.status === 'draft').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-5">
      {/* 1. Total Products */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Total Products</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">
              {kpis.totalProducts.toLocaleString()}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Package className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <span className="inline-flex items-center">↑ 12%</span>
          <span className="text-slate-400 font-normal">from last month</span>
        </div>
      </div>

      {/* 2. Active Products */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Active Products</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">
              {kpis.activeProducts.toLocaleString()}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <span className="inline-flex items-center">↑ 8%</span>
          <span className="text-slate-400 font-normal">from last month</span>
        </div>
      </div>

      {/* 3. Low Stock */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Low Stock</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">
              {kpis.lowStock}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-rose-500">
          <span className="inline-flex items-center">↓ 5%</span>
          <span className="text-slate-400 font-normal">from last month</span>
        </div>
      </div>

      {/* 4. Out of Stock */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Out of Stock</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">
              {kpis.outOfStock}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-rose-500">
          <span className="inline-flex items-center">↓ 3%</span>
          <span className="text-slate-400 font-normal">from last month</span>
        </div>
      </div>

      {/* 5. Draft */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Draft</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">
              {kpis.draft}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <FileText className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-slate-400">
          <span>—</span>
        </div>
      </div>
    </div>
  );
};
