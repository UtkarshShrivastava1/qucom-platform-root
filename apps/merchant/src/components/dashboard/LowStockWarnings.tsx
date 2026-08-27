import React from 'react';
import { Card } from '../ui/Card.js';
import { Badge } from '../ui/Badge.js';
import { Button } from '../ui/Button.js';
import { AlertTriangle, Plus } from 'lucide-react';

const lowStockItems = [
  { name: 'Oversized Cotton Tee (L)', sku: 'SKU-TEE-001-L', remaining: 2, threshold: 10 },
  { name: 'Classic Silk Tie (Navy)', sku: 'SKU-TIE-042', remaining: 3, threshold: 8 },
  { name: 'Leather Belt (Size 34)', sku: 'SKU-BLT-089-34', remaining: 1, threshold: 6 },
];

export const LowStockWarnings: React.FC<{ onAddStock?: () => void }> = ({ onAddStock }) => {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100">Low Stock Warnings</h3>
        </div>
        <Badge variant="warning" size="sm">
          {lowStockItems.length} SKUs Alert
        </Badge>
      </div>

      <div className="space-y-3">
        {lowStockItems.map((item) => (
          <div
            key={item.sku}
            className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20"
          >
            <div>
              <h4 className="text-xs font-semibold text-slate-200">{item.name}</h4>
              <span className="text-[11px] text-slate-400 font-mono">{item.sku}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-rose-400">{item.remaining} Left</span>
              <Button size="sm" variant="outline" onClick={onAddStock}>
                <Plus className="w-3 h-3 mr-1" />
                <span>Restock</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
