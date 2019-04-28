import { useState, useEffect } from "react";

export interface SavedList<T> {
  initialized: boolean;
  items: T[];
  add: (item: T) => void;
  remove: (item: T) => void;
  toggle: (item: T) => void;
  maxReached: boolean;
}

/**
 * * Saving and restoring items list from localStorage
 * @param storageKey - key for saving in localStorage
 * @param maxCount - maximum items in list, -1 - without limit
 */
export const useSavedListInStorage = <T>(
  storageKey: string,
  maxCount: number = -1
): SavedList<T> => {
  const [items, setItems] = useState<T[]>([]);
  const [initialized, setInitialized] = useState<boolean>(true);

  useEffect(() => {
    try {
      const savedList = localStorage.getItem(storageKey);
      if (savedList) {
        const parsedSavedList = JSON.parse(savedList);
        setItems(parsedSavedList);
      }
    } finally {
      setInitialized(false);
    }
  }, [storageKey]);

  const add = (item: T) => {
    if (items.indexOf(item) < 0 && items.length < maxCount) {
      const state = [...items, item];
      localStorage.setItem(storageKey, JSON.stringify(state));
      setItems(state);
    }
  };

  const remove = (item: T) => {
    if (items.indexOf(item) >= 0) {
      const state = items.filter(id => item !== id);
      localStorage.setItem(storageKey, JSON.stringify(state));
      setItems(state);
    }
  };

  const toggle = (item: T) => {
    if (items.indexOf(item) < 0) {
      add(item);
    } else {
      remove(item);
    }
  };

  return {
    initialized,
    items,
    add,
    remove,
    toggle,
    maxReached: maxCount >= 0 && items.length >= maxCount,
  };
};
