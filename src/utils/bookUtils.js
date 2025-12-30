const COVER_BASE_URL = 'https://covers.openlibrary.org/b/id';

export function buildCoverUrl(coverId) {
  if (!coverId) {
    return null;
  }
  return `${COVER_BASE_URL}/${coverId}-M.jpg`;
}

export function transformBook(work) {
  const authorName = Array.isArray(work?.authors) && work.authors.length > 0
    ? work.authors[0].name
    : 'Unknown Author';

  return {
    id: work?.key || String(work?.cover_id || Math.random()),
    title: work?.title || 'Untitled',
    author: authorName,
    coverUrl: buildCoverUrl(work?.cover_id),
  };
}

export function mapBooksResponse(data) {
  const works = Array.isArray(data?.works) ? data.works : [];
  return works.map(transformBook);
}
