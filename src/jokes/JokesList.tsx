import React from "react";
import { Jokes } from "../types";
import { JokeItem } from "./JokeItem";
import "./JokesList.css";

export interface JokesListPros {
  jokes: Jokes;
  favoriteJokes: number[];
  onFavoriteChange: (jokeId: number) => void;
}
export const JokesList = ({
  jokes,
  favoriteJokes,
  onFavoriteChange
}: JokesListPros) => (
  <ul className="jokes-list">
    {jokes.map(joke => (
      <li key={joke.id}>
        <JokeItem
          joke={joke}
          selected={favoriteJokes.some(
            favoriteJokeId => favoriteJokeId === joke.id
          )}
          onSelectedChange={onFavoriteChange}
        />
      </li>
    ))}
  </ul>
);
