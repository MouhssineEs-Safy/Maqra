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
  seedMockData: () => void;
}

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'بيكاسو وستاربكس',
    author: 'ياسر حارب',
    language: 'Arabic',
    totalPages: 184,
    currentPage: 45,
    status: 'Reading',
    rating: 4,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'العادات الذرية',
    author: 'جيمس كلير',
    language: 'Arabic',
    totalPages: 320,
    currentPage: 150,
    status: 'Reading',
    rating: 5,
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
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
    id: '4',
    title: 'لغز المنزل الغامض',
    author: 'أجاثا كريستي',
    language: 'Arabic',
    totalPages: 250,
    currentPage: 250,
    status: 'Completed',
    rating: 4,
    coverImage: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'وادي الذعر',
    author: 'آرثر كونان دويل',
    language: 'Arabic',
    totalPages: 280,
    currentPage: 0,
    status: 'To Read',
    rating: 0,
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop',
  }
];

export const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      books: mockBooks, // Start with mock books immediately for the demo
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
      seedMockData: () => set({ books: mockBooks })
    }),
    {
      name: 'maqra-book-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
