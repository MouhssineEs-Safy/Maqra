export type Language = 'Arabic' | 'French' | 'Amazigh' | 'English';

export type BookStatus = 'Reading' | 'Completed' | 'To Read' | 'On Hold';

export interface Book {
  id: string;
  title: string;
  author: string;
  language: Language;
  totalPages: number;
  currentPage: number;
  status: BookStatus;
  rating: number; // 0 to 5
  coverImage?: string; // local uri or null
}

export interface ReadingSession {
  id: string;
  bookId: string;
  startTime: number; // timestamp
  endTime: number; // timestamp
  duration: number; // in seconds
  pagesRead: number;
}

export interface Profile {
  name: string;
  photo?: string; // local uri
  yearlyGoal: number;
}
