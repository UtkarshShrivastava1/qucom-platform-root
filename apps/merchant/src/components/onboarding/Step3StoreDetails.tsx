import React, { useState } from 'react';
import { Info, Search, MapPin, Navigation } from 'lucide-react';
import { useOnboardingStore } from '../../stores/onboardingStore.js';

interface Step3StoreDetailsProps {
  onContinue: () => void;
  onBack?: () => void;
}

export const Step3StoreDetails: React.FC<Step3StoreDetailsProps> = ({ onContinue }) => {
  const { draft, updateStep } = useOnboardingStore();

  const [fullName, setFullName] = useState(draft.step4?.merchantFullName || draft.step1?.fullName || 'Thoufiq Ahmed');
  const [storeName, setStoreName] = useState(draft.step4?.storeDisplayName || '');
  const [storeDetails, setStoreDetails] = useState(draft.step4?.description || '');

  // Address
  const [building, setBuilding] = useState(draft.step4?.address?.street || '');
  const [area, setArea] = useState('Commercial Market');
  const [landmark, setLandmark] = useState(draft.step4?.address?.landmark || '');
  const [city, setCity] = useState(draft.step4?.address?.city || 'Bengaluru');
  const [state, setState] = useState(draft.step4?.address?.state || 'Karnataka');
  const [pincode, setPincode] = useState(draft.step4?.address?.pincode || '560001');

  // Coordinates
  const [coordinates, setCoordinates] = useState<[number, number]>(
    draft.step4?.location?.coordinates || [77.5946, 12.9716],
  );
  const [pickupSearch, setPickupSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoordinates([pos.coords.longitude, pos.coords.latitude]);
          setPickupSearch('Current GPS Location Detected');
        },
        () => {
          setError('Could not access current location. Using map pin.');
        },
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) {
      setError('Please enter a store display name');
      return;
    }
    if (!building.trim() || !pincode.trim()) {
      setError('Please complete the store address fields');
      return;
    }

    updateStep(4, {
      merchantFullName: fullName,
      storeDisplayName: storeName,
      description: storeDetails,
      address: {
        street: `${building}, ${area}`,
        landmark,
        city,
        state,
        pincode,
      },
      location: {
        type: 'Point',
        coordinates,
      },
      deliveryRadiusKm: 4,
    });

    onContinue();
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
          3
        </div>
        <h2 className="text-sm font-bold tracking-wider text-blue-600 uppercase">
          CREATE YOUR STORE
        </h2>
      </div>

      <p className="text-xs text-slate-500 mb-6">
        Enter your store details to help customers discover your business.
      </p>

      {error && (
        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name & Store Display Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Enter Your Full Name *
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Enter Store Display Name *
              </label>
              <Info className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Enter your store display name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Store Details Textarea */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Enter Store Details *
          </label>
          <div className="relative">
            <textarea
              rows={3}
              maxLength={500}
              placeholder="Tell customers about your store, products, and services"
              value={storeDetails}
              onChange={(e) => setStoreDetails(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-xl p-4 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 resize-none"
            />
            <span className="absolute bottom-2.5 right-3 text-[10px] text-slate-400">
              {storeDetails.length}/500
            </span>
          </div>
        </div>

        {/* Store Address Section */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-slate-900 mb-3">Store Address</h3>

          <div className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Shop No., Building Name, Floor *"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Road Name, Area, Colony *"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Nearby Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Enter City *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Enter State *"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <input
                type="text"
                maxLength={6}
                placeholder="Pin Code *"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 font-mono"
                required
              />
            </div>
          </div>
        </div>

        {/* Pickup Address & Map */}
        <div className="pt-2 space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-900">
              Pickup Address *
            </label>
            <span className="text-[11px] text-slate-500">
              Add pickup address where your orders will be picked up.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search your pickup area"
                value={pickupSearch}
                onChange={(e) => setPickupSearch(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <span className="text-xs text-slate-400 text-center font-medium">or</span>

            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="px-4 py-2.5 text-xs font-semibold text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Use Current Location</span>
            </button>
          </div>

          {/* Interactive Map Visual Strip */}
          <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-70 bg-cover bg-center"
              style={{
                backgroundImage:
                  'radial-gradient(#cbd5e1 1px, transparent 1px), radial-gradient(#cbd5e1 1px, #f8fafc 1px)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px',
              }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 animate-pulse">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="mt-2 text-[11px] font-semibold text-slate-700 bg-white/90 px-3 py-1 rounded-full shadow-xs backdrop-blur-xs">
                {city}, {pincode} ({coordinates[1].toFixed(4)}, {coordinates[0].toFixed(4)})
              </span>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};
