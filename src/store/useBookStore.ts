import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book, BookStatus, Language } from '../types';

interface BookState {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  updateProgress: (id: string, pagesRead: number) => void;
  seedMockData: () => void;
  clearBooks: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const MOCK_BOOKS: Book[] = [
  {
    id: generateId(),
    title: 'العادات الذرية',
    author: 'جيمس كلير',
    language: 'Arabic',
    totalPages: 320,
    currentPage: 45,
    status: 'Reading',
    rating: 0,
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: generateId(),
    title: 'بيكاسو وستاربكس',
    author: 'ياسر حارب',
    language: 'Arabic',
    totalPages: 184,
    currentPage: 184,
    status: 'Completed',
    rating: 4,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: generateId(),
    title: 'لغز المنزل الغامض',
    author: 'أجاثا كريستي',
    language: 'Arabic',
    totalPages: 250,
    currentPage: 0,
    status: 'To Read',
    rating: 0,
    coverImage: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: generateId(),
    title: 'نظرية الفستق',
    author: 'فهد عامر الأحمدي',
    language: 'Arabic',
    totalPages: 332,
    currentPage: 0,
    status: 'To Read',
    rating: 0,
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: generateId(),
    title: 'وادي الذعر',
    author: 'آرثر كونان دويل',
    language: 'Arabic',
    totalPages: 280,
    currentPage: 0,
    status: 'To Read',
    rating: 0,
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: generateId(),
    title: 'قوة عقلك الباطن',
    author: 'جوزيف ميرفي',
    language: 'Arabic',
    totalPages: 340,
    currentPage: 120,
    status: 'Reading',
    rating: 0,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: generateId(),
    title: 'الأب الغني والأب الفقير',
    author: 'روبرت كيوساكي',
    language: 'Arabic',
    totalPages: 240,
    currentPage: 240,
    status: 'Completed',
    rating: 5,
    coverImage: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: generateId(),
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    language: 'French',
    totalPages: 96,
    currentPage: 0,
    status: 'To Read',
    rating: 0,
    coverImage: 'https://images.unsplash.com/photo-1456086272160-b223ff93e36e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: generateId(),
    title: 'مقدمة ابن خلدون',
    author: 'ابن خلدون',
    language: 'Arabic',
    totalPages: 800,
    currentPage: 50,
    status: 'Reading',
    rating: 0,
    coverImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: generateId(),
    title: 'L\'Étranger',
    author: 'Albert Camus',
    language: 'French',
    totalPages: 120,
    currentPage: 120,
    status: 'Completed',
    rating: 4,
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: generateId(),
    title: 'فن اللامبالاة',
    author: 'مارك مانسون',
    language: 'Arabic',
    totalPages: 272,
    currentPage: 0,
    status: 'To Read',
    rating: 0,
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: generateId(),
    title: 'قواعد العشق الأربعون',
    author: 'إليف شافاق',
    language: 'Arabic',
    totalPages: 500,
    currentPage: 450,
    status: 'Reading',
    rating: 0,
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efac4?q=80&w=800&auto=format&fit=crop',
  }
];

export const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      books: [], // Empty initially so we only load from storage or manual seed
      addBook: (book) =>
        set((state) => ({
          books: [...state.books, { ...book, id: generateId() }],
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
      seedMockData: () => set({ books: MOCK_BOOKS }),
      clearBooks: () => set({ books: [] })
    }),
    {
      name: 'maqra-book-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
