import React, { useState } from 'react';
import { Modal } from '../ui/Modal.js';
import { Button } from '../ui/Button.js';
import { Upload, FileSpreadsheet, Download, CheckCircle2, AlertCircle } from 'lucide-react';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBulkSuccess: (count: number) => void;
}

export const BulkUploadModal: React.FC<BulkUploadModalProps> = ({
  isOpen,
  onClose,
  onBulkSuccess,
}) => {
  const [fileSelected, setFileSelected] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileSelected(e.target.files[0].name);
    }
  };

  const handleStartUpload = () => {
    if (!fileSelected) return;
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => {
        onBulkSuccess(35); // simulated 35 imported SKUs
        onClose();
        setUploadSuccess(false);
        setFileSelected(null);
      }, 1200);
    }, 1500);
  };

  const downloadSampleCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Name,Category,SKU,Price,MRP,Stock,Sizes,Description\n' +
      'Polo T-Shirt,fashion,SKU-TSH-001,899,1499,50,"M,L,XL",100% Organic Pique Cotton\n' +
      'Leather Chelsea Boots,footwear,SKU-BOT-002,3499,4999,15,"UK 8,UK 9",Genuine Full Grain Leather\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'catalog_import_sample.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Bulk Product Catalog Upload" maxWidth="md">
      <div className="space-y-4 text-xs">
        <p className="text-slate-400 leading-relaxed">
          Upload your product inventory in bulk via CSV or Excel sheets. Our system auto-creates SKUs and size variants.
        </p>

        {/* Download template helper */}
        <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="font-semibold text-slate-200 block">Catalog Template (.CSV)</span>
              <span className="text-[11px] text-slate-500">Includes columns: Name, Category, SKU, Price, MRP</span>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={downloadSampleCsv}>
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Sample</span>
          </Button>
        </div>

        {/* Drag and Drop Box */}
        <label className="border-2 border-dashed border-slate-700 hover:border-brand-500 rounded-2xl p-6 bg-slate-950/80 flex flex-col items-center justify-center cursor-pointer transition-all">
          <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} className="hidden" />
          <Upload className="w-8 h-8 text-brand-400 mb-2 animate-bounce" />
          <span className="font-semibold text-slate-200 text-sm">
            {fileSelected ? fileSelected : 'Click to Browse or Drag & Drop'}
          </span>
          <span className="text-[11px] text-slate-500 mt-1">Supports CSV, XLSX up to 25 MB</span>
        </label>

        {uploadSuccess && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Successfully processed 35 products into your inventory!</span>
          </div>
        )}

        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
          <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={!fileSelected || isUploading}
            isLoading={isUploading}
            onClick={handleStartUpload}
          >
            <span>Start Import Process</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
