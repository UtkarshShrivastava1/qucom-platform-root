import React, { useRef, useEffect } from 'react';
import {
  Eye,
  Edit3,
  Sliders,
  History,
  Copy,
  Printer,
  Trash2,
} from 'lucide-react';
import { InventoryItem, useInventoryStore } from '../../stores/inventoryStore.js';

interface RowActionMenuProps {
  item: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
  anchorRect: DOMRect | null;
}

export const RowActionMenu: React.FC<RowActionMenuProps> = ({
  item,
  isOpen,
  onClose,
  anchorRect,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { openAdjustDrawer, openHistoryDrawer, deleteProduct } = useInventoryStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !anchorRect) return null;

  // Calculate position relative to viewport
  const top = anchorRect.bottom + 6;
  const left = Math.max(16, anchorRect.right - 180);

  return (
    <div
      ref={menuRef}
      style={{ top: `${top}px`, left: `${left}px` }}
      className="fixed z-50 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1 text-xs text-slate-700 animate-in fade-in zoom-in-95 duration-100"
    >
      <button
        onClick={() => {
          alert(`Product Details: ${item.name} (SKU: ${item.sku})`);
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 transition-colors text-slate-700 text-left font-medium"
      >
        <Eye className="w-3.5 h-3.5 text-slate-400" />
        <span>View Details</span>
      </button>

      <button
        onClick={() => {
          alert(`Editing ${item.name}`);
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 transition-colors text-slate-700 text-left font-medium"
      >
        <Edit3 className="w-3.5 h-3.5 text-slate-400" />
        <span>Edit Product</span>
      </button>

      <button
        onClick={() => {
          openAdjustDrawer(item);
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-blue-50/70 transition-colors text-blue-600 text-left font-medium"
      >
        <Sliders className="w-3.5 h-3.5 text-blue-500" />
        <span>Adjust Stock</span>
      </button>

      <button
        onClick={() => {
          openHistoryDrawer(item);
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 transition-colors text-slate-700 text-left font-medium"
      >
        <History className="w-3.5 h-3.5 text-slate-400" />
        <span>Stock History</span>
      </button>

      <button
        onClick={() => {
          alert(`Duplicated product template for: ${item.name}`);
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 transition-colors text-slate-700 text-left font-medium"
      >
        <Copy className="w-3.5 h-3.5 text-slate-400" />
        <span>Duplicate</span>
      </button>

      <button
        onClick={() => {
          alert(`Generating barcode label for SKU: ${item.sku}`);
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 transition-colors text-slate-700 text-left font-medium"
      >
        <Printer className="w-3.5 h-3.5 text-slate-400" />
        <span>Print Label</span>
      </button>

      <div className="my-1 border-t border-slate-100" />

      <button
        onClick={() => {
          if (confirm(`Are you sure you want to remove '${item.name}' from inventory?`)) {
            deleteProduct(item.id);
          }
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-rose-50 transition-colors text-rose-600 text-left font-medium"
      >
        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
        <span>Delete</span>
      </button>
    </div>
  );
};
