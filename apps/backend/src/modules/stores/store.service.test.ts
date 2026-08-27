import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StoreCategory, StoreApprovalStatus } from '@repo/shared-types';
import * as storeService from './store.service.js';
import { StoreModel } from './store.model.js';

vi.mock('./store.model.js');

describe('Store Service Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findNearbyStores', () => {
    it('should construct 2dsphere $near query with coordinates and max distance in meters', async () => {
      const mockStores = [
        {
          _id: 'store_1',
          name: 'City Supermarket',
          category: StoreCategory.GROCERY_STAPLES,
          location: { type: 'Point', coordinates: [77.5946, 12.9716] },
          isActive: true,
          approvalStatus: StoreApprovalStatus.APPROVED,
        },
      ];

      vi.spyOn(StoreModel, 'find').mockReturnValue({
        limit: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(mockStores),
        }),
      } as any);

      const result = await storeService.findNearbyStores({
        lng: 77.5946,
        lat: 12.9716,
        radiusKm: 3,
      });

      expect(result).toEqual(mockStores);
      expect(StoreModel.find).toHaveBeenCalledWith({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [77.5946, 12.9716],
            },
            $maxDistance: 3000, // 3km in meters
          },
        },
        isActive: true,
        approvalStatus: StoreApprovalStatus.APPROVED,
      });
    });
  });

  describe('verifyStoreIsOpen', () => {
    it('should return true for active and approved store', async () => {
      vi.spyOn(StoreModel, 'findById').mockResolvedValue({
        isActive: true,
        approvalStatus: StoreApprovalStatus.APPROVED,
      } as any);

      const isOpen = await storeService.verifyStoreIsOpen('store_1');
      expect(isOpen).toBe(true);
    });

    it('should return false for inactive or unapproved store', async () => {
      vi.spyOn(StoreModel, 'findById').mockResolvedValue({
        isActive: false,
        approvalStatus: StoreApprovalStatus.PENDING,
      } as any);

      const isOpen = await storeService.verifyStoreIsOpen('store_1');
      expect(isOpen).toBe(false);
    });
  });
});
