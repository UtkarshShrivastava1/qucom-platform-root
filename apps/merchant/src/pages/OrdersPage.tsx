import React, { useState } from 'react';
import { OrdersTable, MerchantOrder } from '../components/orders/OrdersTable.js';
import { OrderDetailModal } from '../components/orders/OrderDetailModal.js';

export const OrdersPage: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<MerchantOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectOrder = (order: MerchantOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: MerchantOrder['status']) => {
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div>
      <OrdersTable onSelectOrder={handleSelectOrder} />
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};
