import React, { ReactElement, useEffect, useState } from "react";

import { fetchJokeById } from "../api/JokesService";
import { Joke } from "../types";

export interface LoadableJoke {
  id: number;
  render: (joke: Joke) => ReactElement;
}

export const LoadableJoke = ({ id, render }: LoadableJoke) => {
  const [joke, setJoke] = useState<Joke>();
  useEffect(() => {
    let jokeId = id;
    setTimeout(() => {
      fetchJokeById(jokeId).then(joke => {
        if (joke.id === jokeId) {
          setJoke(joke);
        }
      });
    }, 2000);
    return () => {
      jokeId = -1;
    };
  }, [id]);

  if (!joke) {
    return <p>`Loading....[${id}]`</p>;
  }
  return render(joke);
};
