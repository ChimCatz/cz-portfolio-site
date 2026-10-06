import { getCollection, type CollectionEntry } from 'astro:content';

// Helpers shared by the long-form collections (Insights, Data Studies, Projects).

export type ReadingCollection = 'insights' | 'dataStudies' | 'projects';
export type ReadingEntry<C extends ReadingCollection> = CollectionEntry<C>;

const ROUTES: Record<ReadingCollection, string> = {
  insights: 'insights',
  dataStudies: 'data-studies',
  projects: 'projects',
};

/**
 * All entries of a collection in display order: by `order` (lowest first)
 * when entries have one, otherwise by date (newest first).
 */
export async function getSorted<C extends ReadingCollection>(collection: C): Promise<ReadingEntry<C>[]> {
  const entries = (await getCollection(collection)) as ReadingEntry<C>[];
  return entries.sort((a, b) => {
    const da = a.data as { order?: number; date?: Date };
    const db = b.data as { order?: number; date?: Date };
    if (da.order !== undefined && db.order !== undefined) return da.order - db.order;
    return (db.date?.getTime() ?? 0) - (da.date?.getTime() ?? 0);
  });
}

/**
 * The entry that follows this one: the next newer entry for dated collections,
 * the next in order for ordered ones. The last wraps around to the first.
 */
export function getNext<T extends { id: string; data: object }>(entries: T[], current: T): T | undefined {
  if (entries.length < 2) return undefined;
  const i = entries.findIndex((entry) => entry.id === current.id);
  if ('order' in current.data) return entries[(i + 1) % entries.length];
  // Newest-first list, so "published after" is the previous index.
  return i > 0 ? entries[i - 1] : entries[entries.length - 1];
}

export function entryHref(collection: ReadingCollection, entry: { data: { slug: string } }): string {
  return `${sectionHref(collection)}/${entry.data.slug}`;
}

export function sectionHref(collection: ReadingCollection): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${ROUTES[collection]}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

/** Minutes to read at ~200 words per minute (image syntax and HTML tags ignored). */
export function readingTime(markdown = ''): number {
  const words = markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
