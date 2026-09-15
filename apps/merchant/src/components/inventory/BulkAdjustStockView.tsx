import React, { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Minus,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  useInventoryStore,
  BulkAdjustmentItem,
} from '../../stores/inventoryStore.js';

export const BulkAdjustStockView: React.FC = () => {
  const { items, bulkAdjustStock, toggleBulkAdjustMode } = useInventoryStore();

  const [adjustments, setAdjustments] = useState<BulkAdjustmentItem[]>(
    items.map((item) => ({
      id: item.id,
      adjustmentType: 'add',
      quantityDelta: 0,
      reason: 'Physical Stock Count Audit',
      referenceNo: `BLK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      notes: '',
    }))
  );

  const [globalReason, setGlobalReason] = useState('Physical Stock Count Audit');

  const handleUpdateDelta = (id: string, delta: number) => {
    setAdjustments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, quantityDelta: Math.max(0, delta) } : a))
    );
  };

  const handleUpdateType = (id: string, type: 'add' | 'reduce') => {
    setAdjustments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, adjustmentType: type } : a))
    );
  };

  const handleApplyGlobalReason = () => {
    setAdjustments((prev) =>
      prev.map((a) => ({ ...a, reason: globalReason }))
    );
  };

  const handleSave = () => {
    const activeAdjustments = adjustments.filter((a) => a.quantityDelta > 0);
    if (activeAdjustments.length === 0) {
      alert('No quantity changes detected to apply.');
      return;
    }
    bulkAdjustStock(activeAdjustments);
  };

  const totalModifiedCount = adjustments.filter((a) => a.quantityDelta > 0).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden pb-20 relative">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleBulkAdjustMode(false)}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Bulk Adjust Stock (Batch Mode)
            </h2>
            <p className="text-xs text-slate-500">
              Update inventory levels across multiple catalog items in a single operation.
            </p>
          </div>
        </div>

        {/* Global Reason Apply */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-2xs font-semibold text-slate-500">Batch Reason:</span>
          <select
            value={globalReason}
            onChange={(e) => setGlobalReason(e.target.value)}
            className="h-8 rounded-lg border border-slate-200 px-2.5 text-xs text-slate-700 bg-white"
          >
            <option value="Physical Stock Count Audit">Physical Stock Count Audit</option>
            <option value="Supplier Bulk Inward Shipment">Supplier Bulk Inward Shipment</option>
            <option value="Store Reorganization">Store Reorganization</option>
            <option value="Damaged Goods Write-off">Damaged Goods Write-off</option>
          </select>
          <button
            type="button"
            onClick={handleApplyGlobalReason}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-2xs font-semibold text-slate-700 transition-colors"
          >
            Apply to All
          </button>
        </div>
      </div>

      {/* Batch Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider font-bold text-slate-500">
              <th className="py-3.5 px-4 min-w-[240px]">Product & SKU</th>
              <th className="py-3.5 px-3 text-right">Current Stock</th>
              <th className="py-3.5 px-3 text-center min-w-[120px]">Type</th>
              <th className="py-3.5 px-3 text-center min-w-[160px]">Adjust Qty</th>
              <th className="py-3.5 px-3 text-right">New Stock</th>
              <th className="py-3.5 px-3 min-w-[180px]">Reason</th>
              <th className="py-3.5 px-4 min-w-[140px]">Reference #</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const adj = adjustments.find((a) => a.id === item.id) || {
                adjustmentType: 'add',
                quantityDelta: 0,
                reason: 'Physical Stock Count Audit',
                referenceNo: '',
              };

              const delta = adj.adjustmentType === 'add' ? adj.quantityDelta : -adj.quantityDelta;
              const newStock = Math.max(0, item.currentStock + delta);
              const isChanged = adj.quantityDelta > 0;

              return (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate max-w-[220px]">
                          {item.name}
                        </p>
                        <p className="text-2xs font-mono text-blue-600 font-semibold mt-0.5">
                          {item.sku}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right font-bold text-slate-800">
                    {item.currentStock}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                      <button
                        type="button"
                        onClick={() => handleUpdateType(item.id, 'add')}
                        className={`px-2 py-0.5 rounded text-2xs font-bold transition-colors ${
                          adj.adjustmentType === 'add'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        + Add
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateType(item.id, 'reduce')}
                        className={`px-2 py-0.5 rounded text-2xs font-bold transition-colors ${
                          adj.adjustmentType === 'reduce'
                            ? 'bg-rose-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        − Reduce
                      </button>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleUpdateDelta(item.id, adj.quantityDelta - 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <input
                        type="number"
                        min="0"
                        value={adj.quantityDelta}
                        onChange={(e) =>
                          handleUpdateDelta(item.id, parseInt(e.target.value) || 0)
                        }
                        className="w-16 h-7 rounded-lg border border-slate-200 text-center font-bold text-xs focus:border-blue-600 focus:outline-none"
                      />

                      <button
                        type="button"
                        onClick={() => handleUpdateDelta(item.id, adj.quantityDelta + 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right">
                    {isChanged ? (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-bold font-mono ${
                          adj.adjustmentType === 'add'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {newStock} ({adj.adjustmentType === 'add' ? `+${adj.quantityDelta}` : `-${adj.quantityDelta}`})
                      </span>
                    ) : (
                      <span className="text-slate-500 font-semibold">{newStock}</span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <input
                      type="text"
                      value={adj.reason}
                      onChange={(e) =>
                        setAdjustments((prev) =>
                          prev.map((a) =>
                            a.id === item.id ? { ...a, reason: e.target.value } : a
                          )
                        )
                      }
                      className="w-full h-8 rounded-lg border border-slate-200 px-2 text-xs focus:border-blue-600 focus:outline-none"
                    />
                  </td>

                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={adj.referenceNo}
                      onChange={(e) =>
                        setAdjustments((prev) =>
                          prev.map((a) =>
                            a.id === item.id ? { ...a, referenceNo: e.target.value } : a
                          )
                        )
                      }
                      placeholder="PO / Ref #"
                      className="w-full h-8 rounded-lg border border-slate-200 px-2 text-xs focus:border-blue-600 focus:outline-none"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 sm:left-64 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 px-6 flex items-center justify-between z-20 shadow-lg">
        <div className="flex items-center gap-2">
          {totalModifiedCount > 0 ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{totalModifiedCount} products ready to update</span>
            </span>
          ) : (
            <span className="text-xs text-slate-500">No adjustments modified yet.</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toggleBulkAdjustMode(false)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Discard Changes</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={totalModifiedCount === 0}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save All Adjustments</span>
          </button>
        </div>
      </div>
    </div>
  );
};
