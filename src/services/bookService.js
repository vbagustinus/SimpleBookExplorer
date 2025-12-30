import { mapBooksResponse } from '../utils/bookUtils.js';
import { OFFLINE_MESSAGE } from '../utils/messages.js';

const SUBJECT_ENDPOINT = 'https://openlibrary.org/subjects/love.json?limit=10';
const FETCH_TIMEOUT = 10000; // ms

export async function fetchBooks() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(SUBJECT_ENDPOINT, { signal: controller.signal });

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const json = await response.json();
    return mapBooksResponse(json);
  } catch (error) {
    // Network failures, timeouts, or aborted requests are considered offline/network errors.
    const isAbort = error?.name === 'AbortError';
    const enrichedError = new Error(isAbort ? 'Request timed out' : (error?.message || 'Network error'));
    enrichedError.code = 'NETWORK_ERROR';
    // Provide a user friendly localized message for offline scenarios
    enrichedError.message = OFFLINE_MESSAGE;
    throw enrichedError;
  } finally {
    clearTimeout(timeoutId);
  }
}
