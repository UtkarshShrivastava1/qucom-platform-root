import React, { useState } from 'react';
import { X, ArrowUpRight, ArrowDownRight, Clock, User, FileText } from 'lucide-react';
import { useInventoryStore } from '../../stores/inventoryStore.js';

export const StockHistoryDrawer: React.FC = () => {
  const {
    selectedItem,
    isStockHistoryDrawerOpen,
    closeHistoryDrawer,
    transactions,
  } = useInventoryStore();

  const [activeTab, setActiveTab] = useState<'all' | 'in' | 'out'>('all');

  if (!isStockHistoryDrawerOpen || !selectedItem) return null;

  const productTransactions = transactions.filter(
    (t) => t.productId === selectedItem.id
  );

  const filteredTransactions = productTransactions.filter((t) => {
    if (activeTab === 'in') return t.quantityDelta > 0;
    if (activeTab === 'out') return t.quantityDelta < 0;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeHistoryDrawer}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Stock Movement History</h2>
            <p className="text-2xs text-slate-500 truncate max-w-[320px]">
              {selectedItem.name}
            </p>
          </div>
          <button
            onClick={closeHistoryDrawer}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Snapshot */}
        <div className="p-4 border-b border-slate-100 bg-white">
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
              <div className="flex items-center gap-3 mt-1 text-2xs text-slate-500">
                <span>In Stock: <strong className="text-slate-900">{selectedItem.currentStock}</strong></span>
                <span>•</span>
                <span>Barcode: <span className="font-mono">{selectedItem.barcode}</span></span>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 mt-3">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-2xs font-semibold transition-colors ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({productTransactions.length})
            </button>
            <button
              onClick={() => setActiveTab('in')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-2xs font-semibold transition-colors ${
                activeTab === 'in'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ArrowUpRight className="w-3 h-3" />
              <span>Stock In (+)</span>
            </button>
            <button
              onClick={() => setActiveTab('out')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-2xs font-semibold transition-colors ${
                activeTab === 'out'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ArrowDownRight className="w-3 h-3" />
              <span>Stock Out (−)</span>
            </button>
          </div>
        </div>

        {/* Chronological Timeline */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-medium">No stock movements found for this filter.</p>
            </div>
          ) : (
            filteredTransactions.map((tx) => {
              const isPositive = tx.quantityDelta > 0;
              return (
                <div
                  key={tx.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all shadow-2xs"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isPositive
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-rose-50 text-rose-600'
                        }`}
                      >
                        {isPositive ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{tx.reason}</h4>
                        <p className="text-2xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(tx.timestamp).toLocaleString()}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                          isPositive
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {isPositive ? `+${tx.quantityDelta}` : tx.quantityDelta} units
                      </span>
                      <p className="text-2xs text-slate-500 mt-1 font-medium">
                        Balance: <strong>{tx.balanceAfter}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3 text-slate-400" />
                      <span>Ref: <strong className="text-slate-700">{tx.referenceNo}</strong></span>
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>{tx.user}</span>
                    </span>
                  </div>

                  {tx.notes && (
                    <div className="mt-2 p-2 rounded-lg bg-slate-50 text-2xs text-slate-600 italic">
                      "{tx.notes}"
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={closeHistoryDrawer}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
