import { useState, useEffect, useCallback } from "react";

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
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const savedList = localStorage.getItem(storageKey);
    if (savedList) {
      const parsedSavedList = JSON.parse(savedList);
      setItems(parsedSavedList);
    }
    setInitialized(true);
  }, [storageKey]);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, initialized, storageKey]);

  const add = useCallback(
    (item: T) => {
      setItems(oldItems =>
        !oldItems.includes(item) && oldItems.length < maxCount
          ? [...oldItems, item]
          : oldItems
      );
    },
    [maxCount]
  );

  const remove = useCallback((item: T) => {
    setItems(oldItems =>
      oldItems.includes(item) ? oldItems.filter(id => item !== id) : oldItems
    );
  }, []);

  const toggle = useCallback((item: T) => {
    setItems(oldItems =>
      oldItems.includes(item)
        ? oldItems.filter(id => id !== item)
        : [...oldItems, item]
    );
  }, []);

  return {
    initialized,
    items,
    add,
    remove,
    toggle,
    maxReached: maxCount >= 0 && items.length >= maxCount
  };
};
