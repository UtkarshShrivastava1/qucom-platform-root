import React from 'react';
import { SalesOverview } from '../components/dashboard/SalesOverview.js';
import { LiveOrderAlerts } from '../components/dashboard/LiveOrderAlerts.js';
import { RevenueChart } from '../components/dashboard/RevenueChart.js';
import { CreateNewBillCard } from '../components/dashboard/CreateNewBillCard.js';
import { OrderSummaryCard } from '../components/dashboard/OrderSummaryCard.js';
import { TopProducts } from '../components/dashboard/TopProducts.js';
import { LowStockWarnings } from '../components/dashboard/LowStockWarnings.js';
import { QuickAccessPanel } from '../components/dashboard/QuickAccessPanel.js';
import { AnnouncementsBar } from '../components/dashboard/AnnouncementsBar.js';
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Greeting & Top 3 KPI Cards */}
      <SalesOverview />

      {/* 2. Middle 3-Column Grid: New Orders (Col 1) | Sales Overview (Col 2) | Create Bill + Order Summary (Col 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Col 1: New Orders (approx 3.8 cols) */}
        <div className="lg:col-span-4 flex flex-col">
          <LiveOrderAlerts onNavigateOrders={() => onNavigate('orders')} />
        </div>

        {/* Col 2: Sales Overview Chart (approx 4.5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <RevenueChart />
        </div>

        {/* Col 3: Create New Bill & Order Summary (approx 3.7 cols) */}
        <div className="lg:col-span-3 space-y-5 flex flex-col justify-between">
          <CreateNewBillCard onOpenCreateInvoice={() => onNavigate('billing')} />
          <OrderSummaryCard onNavigateStatus={() => onNavigate('orders')} />
        </div>
      </div>

      {/* 3. Bottom 3-Column Grid: Top Selling Products (Col 1) | Low Stock Alert (Col 2) | Quick Actions (Col 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Col 1: Top Selling Products */}
        <div className="lg:col-span-4">
          <TopProducts />
        </div>

        {/* Col 2: Low Stock Alert */}
        <div className="lg:col-span-4">
          <LowStockWarnings onAddStock={onOpenAddProduct} />
        </div>

        {/* Col 3: Quick Actions */}
        <div className="lg:col-span-4">
          <QuickAccessPanel
            onNavigate={onNavigate}
            onOpenAddProduct={onOpenAddProduct}
            onOpenBulkUpload={onOpenBulkUpload}
          />
        </div>
      </div>

      {/* 4. Footer Announcements Row */}
      <AnnouncementsBar />
    </div>
  );
};
