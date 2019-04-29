import React, { memo, useCallback } from "react";
import { Joke, Jokes } from "../types";
import { ItemsList } from "../common/ItemsList";
import { JokeItem } from "./JokeItem";

export interface JokesListPros {
  jokes: Jokes;
  favoriteJokes: number[];
  maxLimitReached: boolean;
  onFavoriteChange: (jokeId: number) => void;
}

export const JokesList = memo(
  ({
    jokes,
    favoriteJokes,
    onFavoriteChange,
    maxLimitReached
  }: JokesListPros) => {
    const render = useCallback(
      joke => {
        const selected = favoriteJokes.includes(joke.id);
        const disabled = maxLimitReached && !selected;
        return (
          <JokeItem
            joke={joke}
            selected={selected}
            disabled={disabled}
            onSelectedChange={onFavoriteChange}
          />
        );
      },
      [favoriteJokes, maxLimitReached, onFavoriteChange]
    );
    return <ItemsList<Joke> items={jokes} keyProp="id" render={render} />;
  }
);
