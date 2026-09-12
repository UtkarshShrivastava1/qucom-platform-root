import React from 'react';
import { Home, Briefcase, MapPin, Store, Pencil, Trash2, CheckCircle2, Circle } from 'lucide-react';

export interface Address {
  id: string;
  type: 'home' | 'work' | 'parents' | 'other';
  label: string;
  name: string;
  addressString: string;
  phone: string;
  isDefault: boolean;
}

interface AddressCardProps {
  address: Address;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  const isDefault = address.isDefault;

  const getIconAndColors = (type: Address['type']) => {
    switch (type) {
      case 'home':
        return { icon: <Home className="h-6 w-6" />, bg: 'bg-blue-50', text: 'text-blue-500' };
      case 'work':
        return { icon: <Briefcase className="h-6 w-6" />, bg: 'bg-orange-50', text: 'text-orange-500' };
      case 'parents':
        return { icon: <MapPin className="h-6 w-6" />, bg: 'bg-green-50', text: 'text-green-500' };
      case 'other':
      default:
        return { icon: <Store className="h-6 w-6" />, bg: 'bg-purple-50', text: 'text-purple-500' };
    }
  };

  const { icon, bg, text } = getIconAndColors(address.type);

  return (
    <div
      className={`relative flex flex-col gap-4 rounded-2xl border p-5 transition-colors ${
        isDefault ? 'border-[#1668F6] bg-[#F5F9FE]' : 'border-gray-200 bg-white'
      }`}
    >
      {isDefault && (
        <div className="absolute -top-3 left-4 rounded-full bg-[#1668F6] px-3 py-0.5 text-[10px] font-bold text-white shadow-sm">
          Default
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${text}`}>
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-gray-900">{address.label}</h3>
            <p className="mt-1 text-sm font-medium text-gray-700">{address.name}</p>
            <p className="mt-2 text-xs leading-relaxed text-gray-600 whitespace-pre-line">
              {address.addressString}
            </p>
            <p className="mt-4 text-sm font-medium text-gray-900">{address.phone}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(address.id)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1668F6] hover:underline"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
          <button
            onClick={() => onDelete(address.id)}
            className="text-gray-400 hover:text-red-500"
            aria-label="Delete address"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Default Selector */}
      <div className="mt-2 flex justify-end">
        <button
          onClick={() => !isDefault && onSetDefault(address.id)}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            isDefault ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900 cursor-pointer'
          }`}
          disabled={isDefault}
        >
          {isDefault ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-[#1668F6] fill-[#1668F6] stroke-white" />
              Default Address
            </>
          ) : (
            <>
              <Circle className="h-5 w-5 text-gray-300" />
              Set as Default
            </>
          )}
        </button>
      </div>
    </div>
  );
};
