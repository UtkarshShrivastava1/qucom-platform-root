import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationState {
  lng: number;
  lat: number;
  address: string;
  isSet: boolean;
  setLocation: (lng: number, lat: number, address: string) => void;
  clearLocation: () => void;
}

/**
 * Customer location store — persisted to localStorage.
 * Defaults to central Delhi coordinates if not set.
 */
export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      lng: 77.2090,
      lat: 28.6139,
      address: 'New Delhi, India',
      isSet: false,
      setLocation: (lng, lat, address) =>
        set({ lng, lat, address, isSet: true }),
      clearLocation: () =>
        set({ lng: 77.2090, lat: 28.6139, address: 'New Delhi, India', isSet: false }),
    }),
    {
      name: 'customer-location',
    },
  ),
);
