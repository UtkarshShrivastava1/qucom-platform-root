import React from 'react';
import { Plus, ArrowRight, FileText, Calculator, FileCheck } from 'lucide-react';

interface CreateNewBillCardProps {
  onOpenCreateInvoice?: () => void;
}

export const CreateNewBillCard: React.FC<CreateNewBillCardProps> = ({ onOpenCreateInvoice }) => {
  return (
    <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white shadow-sm flex flex-col justify-between space-y-4">
      <div>
        {/* Top Tag & Title */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white leading-tight">Create New Bill</h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Most Used
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Generate professional invoices in seconds
        </p>

        {/* 3 Action Tiles */}
        <div className="grid grid-cols-3 gap-2 mt-3.5">
          <button
            type="button"
            onClick={onOpenCreateInvoice}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-center transition-all flex flex-col items-center justify-center gap-1 group"
          >
            <FileText className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-slate-100 block leading-tight">Tax Invoice</span>
            <span className="text-[9px] text-slate-400 block leading-none">GST Invoice</span>
          </button>

          <button
            type="button"
            onClick={onOpenCreateInvoice}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-center transition-all flex flex-col items-center justify-center gap-1 group"
          >
            <Calculator className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-slate-100 block leading-tight">Estimate / Quote</span>
            <span className="text-[9px] text-slate-400 block leading-none">Quotation</span>
          </button>

          <button
            type="button"
            onClick={onOpenCreateInvoice}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-center transition-all flex flex-col items-center justify-center gap-1 group"
          >
            <FileCheck className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-slate-100 block leading-tight">Credit Note</span>
            <span className="text-[9px] text-slate-400 block leading-none">Credit / Debit</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          onClick={onOpenCreateInvoice}
          className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Invoice</span>
        </button>

        <button
          type="button"
          onClick={onOpenCreateInvoice}
          className="w-full text-center text-[11px] font-semibold text-slate-400 hover:text-white flex items-center justify-center gap-1 transition-colors"
        >
          <span>View All Invoices</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
