import React, { createContext, FC, useMemo } from "react";

import { useSavedListInStorage } from "../common/useSavedListInStorage";
import { Loader } from "../common/Loader";

export interface FavoriteJokesContextType {
  ids: number[];
  add: (id: number) => void;
  remove: (id: number) => void;
  toggle: (id: number) => void;
  maxLimitReached: boolean;
}
export const FavoriteJokesContext = createContext<FavoriteJokesContextType>({
  ids: [],
  add: () => {},
  remove: () => {},
  toggle: () => {},
  maxLimitReached: false
});

const FAVORITE_JOKES_STORAGE_KEY = "favorite-jokes-ids";

export const FavoriteJokesProvider: FC<{ maxFavorite: number }> = ({
  maxFavorite,
  children
}) => {
  const {
    initialized,
    items,
    add,
    remove,
    toggle,
    maxReached
  } = useSavedListInStorage<number>(FAVORITE_JOKES_STORAGE_KEY, maxFavorite);

  const value = useMemo<FavoriteJokesContextType>(
    () => ({
      ids: items,
      add: add,
      remove: remove,
      toggle: toggle,
      maxLimitReached: maxReached
    }),
    [items, add, remove, toggle, maxReached]
  );

  if (!initialized) {
    return <Loader />;
  }

  return (
    <FavoriteJokesContext.Provider value={value}>
      {children}
    </FavoriteJokesContext.Provider>
  );
};
