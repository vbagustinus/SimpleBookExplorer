import { create } from 'zustand';
import { fetchBooks as fetchBooksService } from '../services/bookService.js';
import { OFFLINE_MESSAGE } from '../utils/messages.js';

const useBookStore = create((set, get) => ({
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
  fetchBooks: async () => {
    // Prevent overlapping fetches
    if (get().loading) return;
    set({ loading: true, error: null });
    try {
      const books = await fetchBooksService();
      set({ books, loading: false, error: null });
    } catch (error) {
      // Map service error codes to user-friendly messages
      const message = error?.code === 'NETWORK_ERROR' ? OFFLINE_MESSAGE : (error?.message || 'Terjadi kesalahan.');
      set({ error: message, loading: false });
    }
  },
  // Retry helper for UI buttons — simply re-invokes fetchBooks
  retryFetch: () => {
    get().fetchBooks();
  },
  selectBook: (bookId) => {
    const selected = get().books.find((book) => book.id === bookId) || null;
    set({ selectedBook: selected });
  },
  clearSelection: () => set({ selectedBook: null }),
}));

export default useBookStore;
