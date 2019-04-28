import React, { createContext, FC } from "react";

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

const FAVORITE_JOKES_STORAGE_KEY = "favoriteJokesIds";

export const FavoriteJokesProvider: FC<{ maxFavorite: number }> = ({
  maxFavorite, children
}) => {
  const {
    initialized,
    items,
    add,
    remove,
    toggle,
    maxReached
  } = useSavedListInStorage<number>(FAVORITE_JOKES_STORAGE_KEY, maxFavorite);

  if (initialized) {
    return <Loader />;
  }

  return (
    <FavoriteJokesContext.Provider
      value={{
        ids: items,
        add: add,
        remove: remove,
        toggle: toggle,
        maxLimitReached: maxReached
      }}
    >
      {children}
    </FavoriteJokesContext.Provider>
  );
};
