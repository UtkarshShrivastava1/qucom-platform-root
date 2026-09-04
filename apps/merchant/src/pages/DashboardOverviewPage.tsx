import React from 'react';
import { GreetingHeader, KpiCards } from '../components/dashboard/SalesOverview.js';
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
    <div className="space-y-3.5 max-w-[1600px] mx-auto">
      {/* 1. Greeting & Date Filter */}
      <GreetingHeader />

      {/* 2. Top Level: Left 9 cols (KPIs + New Orders + Sales Overview) | Right 3 cols (Create New Bill + Order Summary) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Left Section (approx 75% width) */}
        <div className="lg:col-span-9 space-y-3.5 flex flex-col justify-between">
          {/* Top 3 KPI Cards */}
          <KpiCards />

          {/* New Orders & Sales Overview Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1 items-stretch">
            <div className="lg:col-span-6 flex flex-col">
              <LiveOrderAlerts onNavigateOrders={() => onNavigate('orders')} />
            </div>
            <div className="lg:col-span-6 flex flex-col">
              <RevenueChart />
            </div>
          </div>
        </div>

        {/* Right Section (approx 25% width) */}
        <div className="lg:col-span-3 space-y-3.5 flex flex-col justify-between">
          <CreateNewBillCard onOpenCreateInvoice={() => onNavigate('billing')} />
          <OrderSummaryCard onNavigateStatus={() => onNavigate('orders')} />
        </div>
      </div>

      {/* 3. Middle 3-Column Grid: Top Selling Products | Low Stock Alert | Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-stretch">
        <div className="flex flex-col">
          <TopProducts />
        </div>
        <div className="flex flex-col">
          <LowStockWarnings onAddStock={onOpenAddProduct} />
        </div>
        <div className="flex flex-col">
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
