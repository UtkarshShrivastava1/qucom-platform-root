'use client';

import React, { useState } from 'react';
import { AddressCard, Address } from '@/components/account/AddressCard';
import { Plus, ShieldCheck } from 'lucide-react';

const initialAddresses: Address[] = [
  {
    id: '1',
    type: 'home',
    label: 'Home',
    name: 'Harish Kumar',
    addressString: 'House No. 123, Boring Road,\nPatna, Bihar - 800001\nIndia',
    phone: '+91 91234 56789',
    isDefault: true,
  },
  {
    id: '2',
    type: 'work',
    label: 'Work',
    name: 'Harish Kumar',
    addressString: 'Zager Technologies Pvt. Ltd.,\n3rd Floor, West Boring Canal Road,\nPatna, Bihar - 800001\nIndia',
    phone: '+91 91234 56789',
    isDefault: false,
  },
  {
    id: '3',
    type: 'parents',
    label: 'Parents Home',
    name: 'Harish Kumar',
    addressString: 'House No. 45, Park Road,\nKankarbagh, Patna, Bihar - 800020\nIndia',
    phone: '+91 91234 56789',
    isDefault: false,
  },
  {
    id: '4',
    type: 'other',
    label: 'Other',
    name: 'Harish Kumar',
    addressString: 'Flat No. 5B, Shanti Apartments,\nExhibition Road, Patna, Bihar - 800001\nIndia',
    phone: '+91 91234 56789',
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    // Mock delete
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleEdit = (id: string) => {
    // Mock edit
    console.log('Edit address', id);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24 pt-4">
      <div className="mx-auto max-w-3xl rounded-t-3xl bg-white px-4 py-6 shadow-sm min-h-screen border-t">
        {/* Header Section */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#192168]">My Addresses</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your saved addresses</p>
          </div>
          <button className="flex items-center gap-1 text-sm font-semibold text-[#1668F6] hover:underline">
            <Plus className="h-4 w-4" />
            Add New Address
          </button>
        </div>

        {/* Addresses List */}
        <div className="flex flex-col gap-4 mb-8">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>

        {/* Security Banner */}
        <div className="flex items-center gap-3 rounded-xl bg-[#F5F9FE] p-4 text-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1668F6] shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Your addresses are 100% secure</h4>
            <p className="mt-0.5 text-xs text-gray-500">We never share your addresses with anyone.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
