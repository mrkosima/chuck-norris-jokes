import React, { memo } from "react";
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
  }: JokesListPros) => (
    <ItemsList<Joke>
      items={jokes}
      keyProp="id"
      render={joke => {
        const selected = favoriteJokes.indexOf(joke.id) >= 0;
        const disabled = maxLimitReached && !selected;
        return (
          <JokeItem
            joke={joke}
            selected={selected}
            disabled={disabled}
            onSelectedChange={onFavoriteChange}
          />
        );
      }}
    />
  )
);
