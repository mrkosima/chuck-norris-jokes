import React from "react";
import { RandomJokes } from "./RandomJokes";
import "./Jokes.css";
import { FavoriteJokesProvider } from "./FavoriteJokesProvider";
import { FavoriteJokes } from "./FavoriteJokes";

export const Jokes = () => (
  <div className="jokes">
    <FavoriteJokesProvider>
      <RandomJokes />
      <FavoriteJokes />
    </FavoriteJokesProvider>
  </div>
);
