import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  MoreVertical,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Sliders,
  Upload,
  History,
} from 'lucide-react';
import {
  InventoryItem,
  useInventoryStore,
} from '../../stores/inventoryStore.js';
import { RowActionMenu } from './RowActionMenu.js';

export const InventoryTable: React.FC = () => {
  const {
    items,
    filters,
    setSearchQuery,
    setFilter,
    clearFilters,
    openAdjustDrawer,
    toggleBulkAdjustMode,
    toggleFullHistoryPage,
  } = useInventoryStore();

  // Menu and Popover state
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [menuAnchorRect, setMenuAnchorRect] = useState<DOMRect | null>(null);
  const [reservedPopoverId, setReservedPopoverId] = useState<string | null>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // Filtered dataset
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search Query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matches =
          item.name.toLowerCase().includes(q) ||
          item.sku.toLowerCase().includes(q) ||
          item.barcode.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category filter
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }

      // Sub-category filter
      if (filters.subCategory !== 'all' && item.subCategory !== filters.subCategory) {
        return false;
      }

      // Stock status filter
      if (filters.stockStatus !== 'all' && item.status !== filters.stockStatus) {
        return false;
      }

      return true;
    });
  }, [items, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / rowsPerPage));
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRowIds(filteredItems.map((i) => i.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const openMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuAnchorRect(rect);
    setActiveMenuId(id);
  };

  const activeItem = items.find((i) => i.id === activeMenuId);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
      {/* Header with Title & Action Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Inventory Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track and manage your stock across all products in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBulkAdjustMode(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>Adjust Stock</span>
          </button>

          <button
            onClick={() => alert('Bulk stock import: Excel/CSV ingestion template ready')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Import Stock</span>
          </button>

          <button
            onClick={() => toggleFullHistoryPage(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition-colors shadow-2xs"
          >
            <History className="w-3.5 h-3.5" />
            <span>Stock History</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, SKU, barcode..."
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => setFilter('category', e.target.value)}
            className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 focus:border-blue-600 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Grocery">Grocery</option>
          </select>

          {/* Status Filter */}
          <select
            value={filters.stockStatus}
            onChange={(e) => setFilter('stockStatus', e.target.value)}
            className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 focus:border-blue-600 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="IN_STOCK">In Stock</option>
            <option value="LOW_STOCK">Low Stock</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
          </select>

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 h-9 px-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider font-bold text-slate-500">
              <th className="p-3.5 pl-4 w-10">
                <input
                  type="checkbox"
                  checked={
                    paginatedItems.length > 0 &&
                    paginatedItems.every((i) => selectedRowIds.includes(i.id))
                  }
                  onChange={handleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="py-3.5 px-2 w-8">#</th>
              <th className="py-3.5 px-3 min-w-[240px]">Product</th>
              <th className="py-3.5 px-3 min-w-[140px]">SKU</th>
              <th className="py-3.5 px-3 min-w-[120px]">Barcode</th>
              <th className="py-3.5 px-3 min-w-[140px]">Category</th>
              <th className="py-3.5 px-3 min-w-[100px]">Status</th>
              <th className="py-3.5 px-3 text-right">Current Stock</th>
              <th className="py-3.5 px-3 text-right">Reserved</th>
              <th className="py-3.5 px-3 text-right">Available</th>
              <th className="py-3.5 px-3 pr-4 text-center w-12">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-12 text-center text-slate-400">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="font-semibold text-xs text-slate-600">No inventory products found.</p>
                  <p className="text-2xs text-slate-400 mt-1">
                    Try adjusting your search criteria or clear active filters.
                  </p>
                </td>
              </tr>
            ) : (
              paginatedItems.map((item, idx) => {
                const isSelected = selectedRowIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-blue-50/20 transition-colors ${
                      isSelected ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <td className="p-3.5 pl-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(item.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-3 px-2 text-slate-400 text-2xs font-mono">
                      {(currentPage - 1) * rowsPerPage + idx + 1}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 truncate max-w-[200px]">
                            {item.name}
                          </p>
                          <p className="text-2xs text-slate-400 mt-0.5 truncate">
                            {item.variantDetails}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-slate-700 text-2xs">
                      {item.sku}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500 text-2xs">
                      {item.barcode}
                    </td>
                    <td className="py-3 px-3 text-slate-600 text-2xs">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {item.category} &gt; {item.subCategory}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {item.status === 'IN_STOCK' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          In Stock
                        </span>
                      )}
                      {item.status === 'LOW_STOCK' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Low Stock
                        </span>
                      )}
                      {item.status === 'OUT_OF_STOCK' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">
                      {item.currentStock}
                    </td>
                    <td className="py-3 px-3 text-right relative">
                      <div className="inline-flex items-center gap-1 font-semibold text-amber-600">
                        <span>{item.reservedStock}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setReservedPopoverId(
                              reservedPopoverId === item.id ? null : item.id
                            )
                          }
                          className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <HelpCircle className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Reserved Stock Popover */}
                      {reservedPopoverId === item.id && (
                        <div className="absolute right-0 top-10 z-30 w-52 p-3 bg-slate-900 text-white rounded-xl shadow-xl text-left text-2xs leading-relaxed animate-in fade-in duration-150">
                          <p className="font-bold text-amber-400 mb-1">
                            Reserved Stock Info
                          </p>
                          <p className="text-slate-300">
                            <strong>{item.reservedStock} units</strong> are currently held for incoming customer orders in packing & verification.
                          </p>
                          <div className="mt-2 pt-1.5 border-t border-slate-800 text-right">
                            <button
                              onClick={() => setReservedPopoverId(null)}
                              className="text-2xs text-blue-400 hover:underline"
                            >
                              Got it
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-600">
                      {item.availableStock}
                    </td>
                    <td className="py-3 px-3 pr-4 text-center">
                      <button
                        onClick={(e) => openMenu(e, item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Showing{' '}
          <strong className="text-slate-800">
            {filteredItems.length === 0
              ? 0
              : (currentPage - 1) * rowsPerPage + 1}
          </strong>{' '}
          to{' '}
          <strong className="text-slate-800">
            {Math.min(currentPage * rowsPerPage, filteredItems.length)}
          </strong>{' '}
          of <strong className="text-slate-800">{filteredItems.length}</strong> items
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contextual Row Action Menu (Screen 4.2) */}
      {activeItem && (
        <RowActionMenu
          item={activeItem}
          isOpen={!!activeMenuId}
          onClose={() => setActiveMenuId(null)}
          anchorRect={menuAnchorRect}
        />
      )}
    </div>
  );
};
