#!/usr/bin/env node
// Simple script to run fetchBooks directly from the codebase.
// Usage: node tools/runFetch.mjs
// This file is ESM (.mjs) so Node will load the project files using ESM parsing.

import { fetchBooks } from '../src/services/bookService.js';

async function run() {
  try {
    console.log('Running fetchBooks()...');
    const books = await fetchBooks();
    console.log(`Fetched ${books.length} books.`);
    books.slice(0, 10).forEach((b, i) => {
      console.log(`${i + 1}. ${b.title} — ${b.author} — ${b.coverUrl || 'No Cover'}`);
    });
  } catch (err) {
    // Ensure we print useful debug info without exposing anything sensitive
    console.error('Error fetching books: ', err?.message || err);
    // Print code if available
    if (err?.code) console.error('Error code:', err.code);
    process.exitCode = 1;
  }
}

run();
