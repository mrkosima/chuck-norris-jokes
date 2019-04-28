import React, { useEffect, useState, useContext } from "react";

import { fetchJokeById } from "../api/JokesService";
import { Joke } from "../types";
import { JokeItem } from "./JokeItem";
import { FavoriteJokesContext } from "./FavoriteJokesProvider";
import { Loader } from "../common/Loader";

const useLoadableJoke = (jokeId: number) => {
  const [joke, setJoke] = useState<Joke>();
  useEffect(() => {
    let loadingId = jokeId;
    fetchJokeById(loadingId).then(joke => {
      if (joke.id === loadingId) {
        setJoke(joke);
      }
    });
    return () => {
      loadingId = -1;
    };
  }, [jokeId]);
  return joke;
};

export interface FavoriteJokeProps {
  id: number;
}

export const FavoriteJoke = ({ id }: FavoriteJokeProps) => {
  const joke = useLoadableJoke(id);
  const { remove } = useContext(FavoriteJokesContext);

  if (!joke) {
    return <Loader />;
  }

  return (
    <JokeItem
      joke={joke}
      disabled={false}
      selected={true}
      onSelectedChange={remove}
    />
  );
};
