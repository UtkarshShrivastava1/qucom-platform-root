import React, { useState } from 'react';
import { StoreCategory, OnboardingStep5Dto, IStoreOperatingHours } from '@repo/shared-types';
import { useOnboardingStore } from '../../stores/onboardingStore.js';
import { Button } from '../ui/Button.js';
import { Card } from '../ui/Card.js';
import {
  Shirt,
  Footprints,
  Sparkles,
  Tv,
  Home,
  Heart,
  Gift,
  Dumbbell,
  ShoppingBag,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';

const categories = [
  { key: StoreCategory.FASHION, label: 'Fashion & Apparel', icon: Shirt },
  { key: StoreCategory.FOOTWEAR, label: 'Footwear', icon: Footprints },
  { key: StoreCategory.JEWELLERY, label: 'Jewellery & Watches', icon: Sparkles },
  { key: StoreCategory.ELECTRONICS, label: 'Electronics & Gadgets', icon: Tv },
  { key: StoreCategory.HOME_LIVING, label: 'Home & Living', icon: Home },
  { key: StoreCategory.BEAUTY_CARE, label: 'Beauty & Personal Care', icon: Heart },
  { key: StoreCategory.GIFTS, label: 'Gifts & Toys', icon: Gift },
  { key: StoreCategory.SPORTS_FITNESS, label: 'Sports & Fitness', icon: Dumbbell },
  { key: StoreCategory.GROCERY_STAPLES, label: 'Grocery & Essentials', icon: ShoppingBag },
];

const days: Array<keyof IStoreOperatingHours> = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const Step5Operations: React.FC = () => {
  const { draft, updateDraft, nextStep, prevStep } = useOnboardingStore();

  const [selectedCategory, setSelectedCategory] = useState<StoreCategory>(
    draft.step5?.primaryCategory || StoreCategory.FASHION,
  );

  const [operatingHours, setOperatingHours] = useState<IStoreOperatingHours>(
    draft.step5?.operatingHours || {
      monday: { open: '09:00', close: '21:00', isOpen: true },
      tuesday: { open: '09:00', close: '21:00', isOpen: true },
      wednesday: { open: '09:00', close: '21:00', isOpen: true },
      thursday: { open: '09:00', close: '21:00', isOpen: true },
      friday: { open: '09:00', close: '21:00', isOpen: true },
      saturday: { open: '09:00', close: '21:00', isOpen: true },
      sunday: { open: '10:00', close: '20:00', isOpen: true },
    },
  );

  const toggleDay = (day: keyof IStoreOperatingHours) => {
    setOperatingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen: !prev[day].isOpen,
      },
    }));
  };

  const updateTime = (
    day: keyof IStoreOperatingHours,
    field: 'open' | 'close',
    value: string,
  ) => {
    setOperatingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleApplyToAllDays = () => {
    const mondayConfig = operatingHours.monday;
    const updated: Partial<IStoreOperatingHours> = {};
    days.forEach((day) => {
      updated[day] = { ...mondayConfig };
    });
    setOperatingHours(updated as IStoreOperatingHours);
  };

  const handleContinue = () => {
    const data: OnboardingStep5Dto = {
      primaryCategory: selectedCategory,
      operatingHours,
    };
    updateDraft('step5', data);
    nextStep();
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="mb-6">
        <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Step 5 of 6</span>
        <h2 className="text-2xl font-bold text-slate-100 mt-1">Business Operations & Timings</h2>
        <p className="text-sm text-slate-400 mt-1">
          Select your primary retail vertical and define store operating hours.
        </p>
      </div>

      <div className="space-y-6">
        {/* Category Selection Grid */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
            Primary Store Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 ${
                    isSelected
                      ? 'border-brand-500 bg-brand-500/10 text-slate-100 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-brand-400' : 'text-slate-400'}`} />
                    {isSelected && <Check className="w-4 h-4 text-brand-400" />}
                  </div>
                  <span className="text-xs font-semibold leading-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Operating Schedule */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-400" />
              <span>Daily Operating Hours & Working Days</span>
            </label>
            <button
              type="button"
              onClick={handleApplyToAllDays}
              className="text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
              Apply Mon hours to all days
            </button>
          </div>

          <div className="border border-slate-800 rounded-xl divide-y divide-slate-800 bg-slate-950/40 overflow-hidden">
            {days.map((day) => {
              const config = operatingHours[day];
              return (
                <div key={day} className="p-3 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3 w-28">
                    <input
                      type="checkbox"
                      id={`day-${day}`}
                      checked={config.isOpen}
                      onChange={() => toggleDay(day)}
                      className="rounded bg-slate-800 border-slate-700 text-brand-600 focus:ring-brand-500 h-4 w-4"
                    />
                    <label
                      htmlFor={`day-${day}`}
                      className={`capitalize font-medium cursor-pointer ${
                        config.isOpen ? 'text-slate-200' : 'text-slate-500 line-through'
                      }`}
                    >
                      {day}
                    </label>
                  </div>

                  {config.isOpen ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={config.open}
                        onChange={(e) => updateTime(day, 'open', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 text-xs"
                      />
                      <span className="text-slate-500">to</span>
                      <input
                        type="time"
                        value={config.close}
                        onChange={(e) => updateTime(day, 'close', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 text-xs"
                      />
                    </div>
                  ) : (
                    <span className="text-slate-500 italic pr-4">Closed</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <Button type="button" variant="outline" onClick={prevStep}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back</span>
          </Button>

          <Button type="button" onClick={handleContinue}>
            <span>Continue to Financials</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
