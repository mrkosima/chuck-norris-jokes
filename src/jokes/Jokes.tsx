import React from "react";
import { RandomJokes } from "./RandomJokes";
import "./Jokes.css";
import { FavoriteJokesProvider } from "./FavoriteJokesProvider";
import { FavoriteJokes } from "./FavoriteJokes";
import { JokesContent } from "./JokesContent";

const RANDOM_JOKES_COUNT = 10;
const MAX_FAVORITE_JOKES = 10;
const NEW_FAVORITE_DELAY = 5000;

export const Jokes = () => (
  <div className="jokes">
    <FavoriteJokesProvider maxFavorite={MAX_FAVORITE_JOKES}>
      <JokesContent title="Random Jokes">
        <RandomJokes jokesCount={RANDOM_JOKES_COUNT}/>
      </JokesContent>
      <JokesContent title="Favorite Jokes">
        <FavoriteJokes newFavoriteDelay={NEW_FAVORITE_DELAY}/>
        </JokesContent>
    </FavoriteJokesProvider>
  </div>
);
