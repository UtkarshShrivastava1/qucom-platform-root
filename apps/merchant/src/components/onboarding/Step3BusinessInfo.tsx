import React, { useState } from 'react';
import {
  Shirt,
  Footprints,
  Gem,
  Cpu,
  Armchair,
  Sparkles,
  Gift,
  Dumbbell,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';
import { useOnboardingStore } from '../../stores/onboardingStore.js';
import { StoreCategory } from '@repo/shared-types';

interface Step3BusinessInfoProps {
  onContinue: () => void;
  onBack: () => void;
}

export const Step3BusinessInfo: React.FC<Step3BusinessInfoProps> = ({
  onContinue,
  onBack,
}) => {
  const { draft, updateStep } = useOnboardingStore();

  const categories = [
    { id: 'fashion', label: 'Fashion', icon: Shirt },
    { id: 'footwear', label: 'Footwear', icon: Footprints },
    { id: 'jewellery', label: 'Jewellery', icon: Gem },
    { id: 'electronics', label: 'Electronics', icon: Cpu },
    { id: 'home_living', label: 'Home & Living', icon: Armchair },
    { id: 'beauty', label: 'Beauty & Personal Care', icon: Sparkles },
    { id: 'gifts', label: 'Gifts & Lifestyle', icon: Gift },
    { id: 'sports', label: 'Sports & Fitness', icon: Dumbbell },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    draft.step5?.primaryCategory ? [draft.step5.primaryCategory] : ['fashion'],
  );
  const [openTime, setOpenTime] = useState(draft.step5?.operatingHours?.monday?.open || '09:00');
  const [closeTime, setCloseTime] = useState(draft.step5?.operatingHours?.monday?.close || '21:00');
  const [openDays, setOpenDays] = useState<string[]>([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]);
  const [error, setError] = useState<string | null>(null);

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((c) => c !== id) : prev) : [...prev, id],
    );
  };

  const toggleDay = (day: string) => {
    setOpenDays((prev) =>
      prev.includes(day) ? (prev.length > 1 ? prev.filter((d) => d !== day) : prev) : [...prev, day],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      setError('Please select at least one primary category');
      return;
    }

    const daySchedule = (dayName: string) => ({
      open: openTime,
      close: closeTime,
      isOpen: openDays.includes(dayName),
    });

    updateStep(5, {
      primaryCategory: (selectedCategories[0] || StoreCategory.FASHION) as any,
      operatingHours: {
        monday: daySchedule('Monday'),
        tuesday: daySchedule('Tuesday'),
        wednesday: daySchedule('Wednesday'),
        thursday: daySchedule('Thursday'),
        friday: daySchedule('Friday'),
        saturday: daySchedule('Saturday'),
        sunday: daySchedule('Sunday'),
      },
      hasTrialRoom: true,
      hasExchangePolicy: true,
      returnWindowDays: 7,
    });

    onContinue();
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
          4
        </div>
        <h2 className="text-sm font-bold tracking-wider text-blue-600 uppercase">
          BUSINESS INFORMATION
        </h2>
      </div>

      <p className="text-xs text-slate-500 mb-6">
        Add your business details to help customers know more about your store.
      </p>

      {error && (
        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Cards Grid */}
        <div>
          <label className="block text-xs font-bold text-slate-900">
            Add Category *
          </label>
          <span className="text-[11px] text-slate-500 block mb-3">
            Select all categories that best describe your business.
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategories.includes(cat.id);

              return (
                <div
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 truncate">
                      {cat.label}
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 pointer-events-none"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Timings Section */}
        <div className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-900">
              Delivery Timings
            </label>
            <span className="text-[11px] text-slate-500">
              Set your delivery time slots and open days.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Open Time *
              </label>
              <div className="relative">
                <select
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 appearance-none focus:outline-none focus:border-blue-500 pr-10"
                >
                  {['07:00', '08:00', '09:00', '10:00', '11:00'].map((t) => (
                    <option key={t} value={t}>
                      {t} AM
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Close Time *
              </label>
              <div className="relative">
                <select
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 appearance-none focus:outline-none focus:border-blue-500 pr-10"
                >
                  {['19:00', '20:00', '21:00', '22:00', '23:00'].map((t) => (
                    <option key={t} value={t}>
                      {t === '19:00'
                        ? '07:00 PM'
                        : t === '20:00'
                        ? '08:00 PM'
                        : t === '21:00'
                        ? '09:00 PM'
                        : t === '22:00'
                        ? '10:00 PM'
                        : '11:00 PM'}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Mark Open Days */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-900">
              Mark Open Days *
            </label>
            <span className="text-[11px] text-slate-500 block mb-2">
              Don't forget to uncheck your off-day
            </span>

            <div className="flex flex-wrap gap-2">
              {daysList.map((day) => {
                const isOpen = openDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                      isOpen
                        ? 'bg-blue-50 border-blue-600 text-blue-600 ring-1 ring-blue-600/10'
                        : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isOpen}
                      onChange={() => {}}
                      className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300 pointer-events-none"
                    />
                    <span>{day}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-slate-500">
                Have separate day wise timings?{' '}
                <button type="button" className="text-blue-600 font-semibold hover:underline">
                  Add day wise slots
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* Back and Continue Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="w-36 py-3.5 px-6 rounded-xl border border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
