import React from 'react';
import { SalesOverview } from '../components/dashboard/SalesOverview.js';
import { RevenueChart } from '../components/dashboard/RevenueChart.js';
import { LiveOrderAlerts } from '../components/dashboard/LiveOrderAlerts.js';
import { TopProducts } from '../components/dashboard/TopProducts.js';
import { LowStockWarnings } from '../components/dashboard/LowStockWarnings.js';
import { QuickAccessPanel } from '../components/dashboard/QuickAccessPanel.js';
import { DashboardTab } from '../components/dashboard/Sidebar.js';

interface DashboardOverviewPageProps {
  onNavigate: (tab: DashboardTab) => void;
  onOpenAddProduct: () => void;
  onOpenBulkUpload: () => void;
}

export const DashboardOverviewPage: React.FC<DashboardOverviewPageProps> = ({
  onNavigate,
  onOpenAddProduct,
  onOpenBulkUpload,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Quick Access Shortcut Tiles */}
      <QuickAccessPanel
        onNavigate={onNavigate}
        onOpenAddProduct={onOpenAddProduct}
        onOpenBulkUpload={onOpenBulkUpload}
      />

      {/* 2. Key Sales Metrics */}
      <SalesOverview />

      {/* 3. Analytics Chart & Live Orders Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <LiveOrderAlerts onNavigateOrders={() => onNavigate('orders')} />
      </div>

      {/* 4. Top Selling Products & Low Stock Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProducts />
        <LowStockWarnings onAddStock={onOpenAddProduct} />
      </div>
    </div>
  );
};
