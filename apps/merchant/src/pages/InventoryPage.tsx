import React from 'react';
import { useInventoryStore } from '../stores/inventoryStore.js';
import { InventoryKPIBar } from '../components/inventory/InventoryKPIBar.js';
import { InventoryTable } from '../components/inventory/InventoryTable.js';
import { AdjustStockDrawer } from '../components/inventory/AdjustStockDrawer.js';
import { StockHistoryDrawer } from '../components/inventory/StockHistoryDrawer.js';
import { BulkAdjustStockView } from '../components/inventory/BulkAdjustStockView.js';
import { StockHistoryLedgerPage } from '../components/inventory/StockHistoryLedgerPage.js';

export const InventoryPage: React.FC = () => {
  const { isBulkAdjustMode, isFullStockHistoryPage } = useInventoryStore();

  if (isBulkAdjustMode) {
    return <BulkAdjustStockView />;
  }

  if (isFullStockHistoryPage) {
    return <StockHistoryLedgerPage />;
  }

  return (
    <div className="space-y-6">
      {/* 5 KPI Summary Cards (Screen 4.0) */}
      <InventoryKPIBar />

      {/* Main Inventory Data Table with Toolbar (Screen 4.0 / 4.3) */}
      <InventoryTable />

      {/* Single Product Adjust Stock Slide-Out Drawer (Screen 4.1) */}
      <AdjustStockDrawer />

      {/* Single Product Stock History Slide-Out Drawer (Screen 4.4) */}
      <StockHistoryDrawer />
    </div>
  );
};
