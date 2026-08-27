import React, { useState, useEffect } from 'react';
import { useAuthStore } from './stores/authStore.js';
import { useOnboardingStore } from './stores/onboardingStore.js';
import { OnboardingPage } from './pages/OnboardingPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { DashboardOverviewPage } from './pages/DashboardOverviewPage.js';
import { OrdersPage } from './pages/OrdersPage.js';
import { CatalogPage } from './pages/CatalogPage.js';
import { StoreSettingsPage } from './pages/StoreSettingsPage.js';
import { Sidebar, DashboardTab } from './components/dashboard/Sidebar.js';
import { Header } from './components/dashboard/Header.js';
import { AddProductModal } from './components/catalog/AddProductModal.js';
import { BulkUploadModal } from './components/catalog/BulkUploadModal.js';

export const App: React.FC = () => {
  const { isAuthenticated, initialize } = useAuthStore();
  const { isUnderReview } = useOnboardingStore();

  const [currentView, setCurrentView] = useState<'onboarding' | 'login' | 'dashboard'>('onboarding');
  const [currentTab, setCurrentTab] = useState<DashboardTab>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global modals
  const [isGlobalAddOpen, setIsGlobalAddOpen] = useState(false);
  const [isGlobalBulkOpen, setIsGlobalBulkOpen] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // If already authenticated or under review preview
  useEffect(() => {
    if (isAuthenticated && currentView === 'login') {
      setCurrentView('dashboard');
    }
  }, [isAuthenticated, currentView]);

  if (currentView === 'login') {
    return (
      <LoginPage
        onLoginSuccess={() => setCurrentView('dashboard')}
        onGoToRegister={() => setCurrentView('onboarding')}
      />
    );
  }

  if (currentView === 'onboarding' && !isAuthenticated) {
    return (
      <OnboardingPage
        onEnterDashboard={() => setCurrentView('dashboard')}
        onGoToLogin={() => setCurrentView('login')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Desktop & Mobile Sidebar */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden sm:block'}`}>
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setIsMobileMenuOpen(false);
          }}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Header
          isCollapsed={isSidebarCollapsed}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <main
          className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${
            isSidebarCollapsed ? 'sm:ml-20' : 'sm:ml-64'
          }`}
        >
          {currentTab === 'overview' && (
            <DashboardOverviewPage
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenAddProduct={() => setIsGlobalAddOpen(true)}
              onOpenBulkUpload={() => setIsGlobalBulkOpen(true)}
            />
          )}

          {currentTab === 'orders' && <OrdersPage />}

          {currentTab === 'catalog' && <CatalogPage />}

          {currentTab === 'store' && <StoreSettingsPage />}

          {/* Fallback placeholder for other 9 modules in development */}
          {!['overview', 'orders', 'catalog', 'store'].includes(currentTab) && (
            <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold text-slate-200 capitalize">
                {currentTab.replace(/_/g, ' ')} Module
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Operational analytics and live controls active for this merchant vertical.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <AddProductModal
        isOpen={isGlobalAddOpen}
        onClose={() => setIsGlobalAddOpen(false)}
        onAddProduct={(p) => {
          alert(`Product '${p.name}' created with SKU ${p.sku}`);
          setIsGlobalAddOpen(false);
        }}
      />

      <BulkUploadModal
        isOpen={isGlobalBulkOpen}
        onClose={() => setIsGlobalBulkOpen(false)}
        onBulkSuccess={(c) => alert(`Imported ${c} items successfully`)}
      />
    </div>
  );
};
