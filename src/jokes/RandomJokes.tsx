import React, { useState, useEffect, useContext, FC } from "react";
import { fetchRandomJokes } from "../api/JokesService";
import { Jokes } from "../types";
import { JokesList } from "./JokesList";
import { FavoriteJokesContext } from "./FavoriteJokesProvider";
import { Loader } from "../common/Loader";

export const RandomJokes: FC<{ jokesCount: number }> = ({ jokesCount }) => {
  const [hits, setHits] = useState<number>(0);
  const [jokes, setJokes] = useState<Jokes>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const favoriteJokesContext = useContext(FavoriteJokesContext);

  useEffect(() => {
    if (hits > 0) {
      setLoading(true);
      fetchRandomJokes(jokesCount).then(jokes => {
        setJokes(jokes);
        setLoading(false);
      });
    }
  }, [hits, jokesCount]);

  return (
    <>
      <button
        onClick={() => setHits(hits + 1)}
        className="button refresh-button"
      >
        { hits > 0 ? "Refresh" : "Load Jokes" }
      </button>
      {loading ? (
        <Loader />
      ) : (
        <JokesList
          jokes={jokes}
          maxLimitReached={favoriteJokesContext.maxLimitReached}
          favoriteJokes={favoriteJokesContext.ids}
          onFavoriteChange={favoriteJokesContext.toggle}
        />
      )}
    </>
  );
};
