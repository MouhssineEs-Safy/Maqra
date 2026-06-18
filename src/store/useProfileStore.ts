import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from '../types';

interface ProfileState {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: {
        name: 'Reader',
        yearlyGoal: 12,
      },
      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),
    }),
    {
      name: 'maqra-profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
