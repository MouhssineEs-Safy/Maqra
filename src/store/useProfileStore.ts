import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from '../types';

interface ProfileState {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
  resetStatistics: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: {
        name: 'Reader',
        yearlyGoal: 12,
        photo: undefined,
        theme: 'system',
        language: 'ar',
        notifications: true,
      },
      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),
      resetStatistics: () =>
        set((state) => ({
          profile: {
            ...state.profile,
            yearlyGoal: 12,
          },
        })),
    }),
    {
      name: 'maqra-profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
