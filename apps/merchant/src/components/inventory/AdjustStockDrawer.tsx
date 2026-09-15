import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useInventoryStore } from '../../stores/inventoryStore.js';

export const AdjustStockDrawer: React.FC = () => {
  const {
    selectedItem,
    isAdjustStockDrawerOpen,
    closeAdjustDrawer,
    adjustStock,
  } = useInventoryStore();

  const [adjustmentType, setAdjustmentType] = useState<'add' | 'reduce'>('add');
  const [quantity, setQuantity] = useState<number>(10);
  const [reason, setReason] = useState<string>('New Stock Received');
  const [referenceNo, setReferenceNo] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (selectedItem) {
      setAdjustmentType('add');
      setQuantity(10);
      setReason('New Stock Received');
      setReferenceNo(`PO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setNotes('');
    }
  }, [selectedItem]);

  if (!isAdjustStockDrawerOpen || !selectedItem) return null;

  const currentStock = selectedItem.currentStock;
  const delta = adjustmentType === 'add' ? quantity : -quantity;
  const newStock = Math.max(0, currentStock + delta);
  const newAvailable = Math.max(0, newStock - selectedItem.reservedStock);

  const addReasons = [
    'New Stock Received',
    'Supplier Inward Shipment',
    'Customer Return Restock',
    'Inventory Reconciliation (+)',
    'Internal Store Transfer',
  ];

  const reduceReasons = [
    'Damaged / Broken in Transit',
    'Expired Product Write-off',
    'Inventory Reconciliation (-)',
    'Theft / Stock Shrinkage',
    'Sample / Store Display',
  ];

  const currentReasons = adjustmentType === 'add' ? addReasons : reduceReasons;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) return;
    adjustStock(selectedItem.id, adjustmentType, quantity, reason, referenceNo, notes);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeAdjustDrawer}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Adjust Stock Level</h2>
            <p className="text-2xs text-slate-500 truncate max-w-[280px]">
              {selectedItem.name}
            </p>
          </div>
          <button
            onClick={closeAdjustDrawer}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Product Pill Card */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.name}
              className="w-12 h-12 rounded-lg object-cover border border-slate-200"
            />
            <div className="flex-1 min-w-0">
              <span className="text-2xs font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                {selectedItem.sku}
              </span>
              <h4 className="text-xs font-semibold text-slate-800 truncate mt-0.5">
                {selectedItem.name}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-2xs text-slate-500">
                <span>Current: <strong className="text-slate-700">{selectedItem.currentStock}</strong></span>
                <span>•</span>
                <span>Reserved: <strong className="text-amber-600">{selectedItem.reservedStock}</strong></span>
                <span>•</span>
                <span>Available: <strong className="text-emerald-600">{selectedItem.availableStock}</strong></span>
              </div>
            </div>
          </div>

          {/* Adjustment Type Selector */}
          <div>
            <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Adjustment Type
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setAdjustmentType('add');
                  setReason('New Stock Received');
                }}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  adjustmentType === 'add'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-700 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Plus className="w-3.5 h-3.5 text-blue-600" />
                <span>Add Stock (+)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAdjustmentType('reduce');
                  setReason('Damaged / Broken in Transit');
                }}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  adjustmentType === 'reduce'
                    ? 'border-rose-600 bg-rose-50/60 text-rose-700 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Minus className="w-3.5 h-3.5 text-rose-600" />
                <span>Reduce Stock (−)</span>
              </button>
            </div>
          </div>

          {/* Quantity Stepper */}
          <div>
            <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Quantity to {adjustmentType === 'add' ? 'Add' : 'Reduce'}
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                className="flex-1 h-10 rounded-xl border border-slate-200 text-center font-bold text-slate-800 text-base focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />

              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick preset chips */}
            <div className="flex items-center gap-1.5 mt-2">
              {[5, 10, 25, 50, 100].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setQuantity(preset)}
                  className="px-2.5 py-1 text-2xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  +{preset}
                </button>
              ))}
            </div>
          </div>

          {/* Reason Selector */}
          <div>
            <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Reason for Adjustment
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-700 bg-white focus:border-blue-600 focus:outline-none"
            >
              {currentReasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Reference # */}
          <div>
            <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Reference / PO / Invoice Number
            </label>
            <input
              type="text"
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
              placeholder="e.g. PO-2026-0915 or INV-8921"
              className="w-full h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Additional Audit Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Add details for team record..."
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:outline-none resize-none"
            />
          </div>

          {/* Live Dynamic Recomputed Stock Alert */}
          <div
            className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
              adjustmentType === 'add'
                ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900'
                : 'bg-amber-50/70 border-amber-200/80 text-amber-900'
            }`}
          >
            {adjustmentType === 'add' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            )}
            <div className="text-2xs leading-relaxed">
              <p className="font-semibold">
                Calculation Preview:
              </p>
              <p className="mt-0.5">
                Current Stock ({currentStock}) {adjustmentType === 'add' ? '+' : '−'} Delta ({quantity}) ={' '}
                <strong className="underline text-xs">{newStock} units</strong>.
              </p>
              <p className="text-slate-500 mt-0.5">
                Available for online sale will update to <strong>{newAvailable} units</strong>.
              </p>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closeAdjustDrawer}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs"
          >
            <span>Apply Adjustment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
