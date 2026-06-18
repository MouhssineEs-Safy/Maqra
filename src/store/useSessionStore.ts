import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReadingSession } from '../types';

interface SessionState {
  sessions: ReadingSession[];
  addSession: (session: Omit<ReadingSession, 'id'>) => void;
  deleteSession: (id: string) => void;
  getSessionsForBook: (bookId: string) => ReadingSession[];
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessions: [],
      addSession: (session) =>
        set((state) => ({
          sessions: [...state.sessions, { ...session, id: Date.now().toString() }],
        })),
      deleteSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
        })),
      getSessionsForBook: (bookId) => get().sessions.filter((s) => s.bookId === bookId),
    }),
    {
      name: 'maqra-session-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
