import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Download,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  FileText,
  User,
  Package,
  Layers,
} from 'lucide-react';
import { useInventoryStore } from '../../stores/inventoryStore.js';

export const StockHistoryLedgerPage: React.FC = () => {
  const { transactions, toggleFullHistoryPage } = useInventoryStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedDateRange, setSelectedDateRange] = useState('30d');

  const filteredTransactions = transactions.filter((t) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        t.productName.toLowerCase().includes(q) ||
        t.sku.toLowerCase().includes(q) ||
        t.referenceNo.toLowerCase().includes(q) ||
        t.reason.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedType === 'IN' && t.quantityDelta <= 0) return false;
    if (selectedType === 'OUT' && t.quantityDelta >= 0) return false;
    if (selectedType === 'ADJUSTMENT' && t.type !== 'STOCK_ADJUSTMENT') return false;

    return true;
  });

  const totalIn = transactions
    .filter((t) => t.quantityDelta > 0)
    .reduce((acc, t) => acc + t.quantityDelta, 0);

  const totalOut = transactions
    .filter((t) => t.quantityDelta < 0)
    .reduce((acc, t) => acc + Math.abs(t.quantityDelta), 0);

  const exportCSV = () => {
    const headers = ['Timestamp', 'Product', 'SKU', 'Type', 'Delta', 'BalanceAfter', 'Reason', 'RefNo', 'User'];
    const rows = filteredTransactions.map((t) => [
      t.timestamp,
      `"${t.productName.replace(/"/g, '""')}"`,
      t.sku,
      t.type,
      t.quantityDelta,
      t.balanceAfter,
      `"${t.reason.replace(/"/g, '""')}"`,
      t.referenceNo,
      t.user,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `stock_movement_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleFullHistoryPage(false)}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Stock Movement History & Audit Ledger
            </h2>
            <p className="text-xs text-slate-500">
              Complete chronological audit trail of all warehouse inward, outward, and reconciled movements.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Date range picker selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="bg-transparent border-none text-xs text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last Quarter</option>
              <option value="1y">Full Year</option>
            </select>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 5 Summary KPI Cards (Screen 4.6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Total Movements</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-xl font-bold text-slate-900">{(4820 + transactions.length).toLocaleString('en-IN')}</span>
          <p className="text-2xs text-slate-400 mt-1">Recorded ledger events</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Total Stock In (+)</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-xl font-bold text-emerald-600">+{(8450 + totalIn).toLocaleString('en-IN')}</span>
          <p className="text-2xs text-slate-400 mt-1">Units received / restocked</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Total Stock Out (−)</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <ArrowDownRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-xl font-bold text-rose-600">−{(3630 + totalOut).toLocaleString('en-IN')}</span>
          <p className="text-2xs text-slate-400 mt-1">Units shipped & fulfilled</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Adjustments Audit</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Package className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-xl font-bold text-slate-900">{142 + transactions.filter(t => t.type === 'STOCK_ADJUSTMENT').length}</span>
          <p className="text-2xs text-slate-400 mt-1">Manual stock reconciliations</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Damage / Loss</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-xl font-bold text-slate-900">24 units</span>
          <p className="text-2xs text-slate-400 mt-1">Shrinkage write-offs</p>
        </div>
      </div>

      {/* Main Ledger Table with Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product, SKU, reference #..."
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 focus:border-blue-600 focus:outline-none"
            >
              <option value="ALL">All Movements</option>
              <option value="IN">Stock In (+)</option>
              <option value="OUT">Stock Out (−)</option>
              <option value="ADJUSTMENT">Manual Adjustments</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider font-bold text-slate-500">
                <th className="py-3 px-4 min-w-[150px]">Date & Time</th>
                <th className="py-3 px-4 min-w-[220px]">Product & SKU</th>
                <th className="py-3 px-3 min-w-[140px]">Movement Type</th>
                <th className="py-3 px-3 text-right min-w-[100px]">Delta Qty</th>
                <th className="py-3 px-3 text-right min-w-[100px]">Balance After</th>
                <th className="py-3 px-4 min-w-[180px]">Reason & Ref #</th>
                <th className="py-3 px-4 min-w-[120px]">Recorded By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => {
                const isPositive = tx.quantityDelta > 0;
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 text-slate-500 text-2xs font-mono">
                      {new Date(tx.timestamp).toLocaleString()}
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-900 truncate max-w-[220px]">
                        {tx.productName}
                      </p>
                      <p className="text-2xs font-mono text-blue-600 font-semibold mt-0.5">
                        {tx.sku}
                      </p>
                    </td>

                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-bold bg-slate-100 text-slate-700">
                        {tx.type.replace(/_/g, ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <span
                        className={`font-mono font-bold text-2xs px-2 py-0.5 rounded ${
                          isPositive
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {isPositive ? `+${tx.quantityDelta}` : tx.quantityDelta}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right font-bold text-slate-800">
                      {tx.balanceAfter}
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-800 text-xs">{tx.reason}</p>
                      <p className="text-2xs text-slate-400 font-mono mt-0.5">
                        Ref: {tx.referenceNo}
                      </p>
                    </td>

                    <td className="py-3 px-4 text-slate-600 text-xs font-medium">
                      {tx.user}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
