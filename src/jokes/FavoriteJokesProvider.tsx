import React, { createContext, FC, useState } from 'react';

export interface TodoType {
  ids: number[];
  toggleId: (id: number) => void;
}
export const FavoriteJokesContext = createContext<TodoType>({
  ids: [],
  toggleId: (id: number) => console.warn(`Hoho, should not be triggered ${id}`)
});

export const FavoriteJokesProvider: FC<{}> = props => {
  const [ids, setIds] = useState<number[]>([]);

  const toggleId = (jokeId: number) => {
    if (ids.indexOf(jokeId) >= 0) {
        setIds(ids.filter(id => jokeId !== id));
      } else {
        setIds([...ids, jokeId]);
      }
  };

  return (
    <FavoriteJokesContext.Provider value={{ ids: ids, toggleId: toggleId }}>
      {props.children}
    </FavoriteJokesContext.Provider>
  );
};
