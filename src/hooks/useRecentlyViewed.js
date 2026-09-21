import { useCallback, useSyncExternalStore } from 'react';
import { storage } from '../utils/storage';

const KEY = 'recently_viewed';
const MAX = 8;
const listeners = new Set();
let cache = storage.get(KEY, []);

const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

/** Recently viewed product ids, newest first, persisted to localStorage and shared across the app. */
export function useRecentlyViewed() {
  const ids = useSyncExternalStore(subscribe, () => cache);

  const addViewed = useCallback((id) => {
    if (cache[0] === id) return;
    cache = [id, ...cache.filter((x) => x !== id)].slice(0, MAX);
    storage.set(KEY, cache);
    listeners.forEach((l) => l());
  }, []);

  return { ids, addViewed };
}
