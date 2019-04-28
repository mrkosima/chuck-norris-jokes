import React, { useState, useEffect, useContext } from "react";
import { fetchRandomJokes } from "../api/JokesService";
import { Jokes } from "../types";
import { JokesList } from "./JokesList";
import { FavoriteJokesContext } from "./FavoriteJokesProvider";

export const RandomJokes = () => {
  const [hits, setHits] = useState<number>(0);
  const [jokes, setJokes] = useState<Jokes>([]);
  const favoriteJokesContext = useContext(FavoriteJokesContext);

  useEffect(() => {
    fetchRandomJokes(5).then(jokes => setJokes(jokes));
  }, [hits]);

  return (
    <>
      <JokesList
        jokes={jokes}
        favoriteJokes={favoriteJokesContext.ids}
        onFavoriteChange={favoriteJokesContext.toggleId}
      />
      <button onClick={() => setHits(hits + 1)}>Refresh</button>
    </>
  );
};
