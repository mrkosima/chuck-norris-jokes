import React, { FC, useCallback, useContext, useState } from "react";

import { fetchRandomJokes } from "../api/JokesService";
import { Loader } from "../common/Loader";
import { Jokes } from "../types";
import { FavoriteJokesContext } from "./FavoriteJokesProvider";
import { JokesList } from "./JokesList";

export const RandomJokes: FC<{ jokesCount: number }> = ({ jokesCount }) => {
  const [jokes, setJokes] = useState<Jokes>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const favoriteJokesContext = useContext(FavoriteJokesContext);

  const handleRefreshClick = useCallback(() => {
    setLoading(true);
    fetchRandomJokes(jokesCount).then(jokes => {
      setJokes(jokes);
      setLoading(false);
    });
  }, [jokesCount])

  return (
    <>
      <button
        onClick={handleRefreshClick}
        className="button refresh-button"
      >
        { jokes.length > 0 ? "Refresh" : "Load Jokes" }
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
