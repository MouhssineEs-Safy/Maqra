import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book, BookStatus } from '../types';

interface BookState {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  updateProgress: (id: string, pagesRead: number) => void;
}

export const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      books: [],
      addBook: (book) =>
        set((state) => ({
          books: [...state.books, { ...book, id: Date.now().toString() }],
        })),
      updateBook: (id, updates) =>
        set((state) => ({
          books: state.books.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),
      deleteBook: (id) =>
        set((state) => ({
          books: state.books.filter((b) => b.id !== id),
        })),
      updateProgress: (id, pagesRead) =>
        set((state) => ({
          books: state.books.map((b) => {
            if (b.id === id) {
              const newCurrentPage = Math.min(b.currentPage + pagesRead, b.totalPages);
              let newStatus: BookStatus = b.status;
              if (newCurrentPage >= b.totalPages) {
                newStatus = 'Completed';
              } else if (newCurrentPage > 0 && b.status === 'To Read') {
                newStatus = 'Reading';
              }
              return { ...b, currentPage: newCurrentPage, status: newStatus };
            }
            return b;
          }),
        })),
    }),
    {
      name: 'maqra-book-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
