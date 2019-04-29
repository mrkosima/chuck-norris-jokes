import React, { FC, useCallback, useContext, useEffect, useState } from "react";

import { fetchRandomJokes } from "../api/JokesService";
import { ItemsList } from "../common/ItemsList";
import { FavoriteJoke } from "./FavoriteJoke";
import { FavoriteJokesContext } from "./FavoriteJokesProvider";

type NewFavoriteByTimeout = {
  timerTurnedOn: boolean;
  timerEnabled: boolean;
  onTimerChange: () => void;
};

const useNewFavoriteByTimeout = (timerDelay: number): NewFavoriteByTimeout => {
  const [timerOn, timerOnChange] = useState<boolean>(false);
  const { add, maxLimitReached } = useContext(FavoriteJokesContext);
  useEffect(() => {
    if (timerOn && !maxLimitReached) {
      let timeout: number;
      let fetchingFavorite = false;

      const schedule = () => {
        timeout = window.setTimeout(() => {
          fetchingFavorite = true;
          fetchRandomJokes(1).then(jokes => {
            if (fetchingFavorite) {
              jokes.forEach(joke => add(joke.id));
              schedule();
            }
          });
        }, timerDelay);
      };
      schedule();

      return () => {
        clearTimeout(timeout);
        fetchingFavorite = false;
      };
    }
  }, [timerOn, maxLimitReached, timerDelay, add]);

  const onTimerEnableChange = useCallback(() => {
    timerOnChange(!timerOn);
  }, [timerOn]);

  return {
    timerTurnedOn: timerOn,
    timerEnabled: maxLimitReached,
    onTimerChange: onTimerEnableChange
  };
};

export const FavoriteJokes: FC<{ newFavoriteDelay: number }> = ({
  newFavoriteDelay
}) => {
  const { ids } = useContext(FavoriteJokesContext);
  const {
    timerTurnedOn,
    timerEnabled,
    onTimerChange
  } = useNewFavoriteByTimeout(newFavoriteDelay);
  const onTimerButtonClicked = useCallback(() => onTimerChange(), [
    onTimerChange
  ]);

  return (
    <>
      <button
        className={`button timeout-button ${
          timerTurnedOn && !timerEnabled ? "active" : ""
        }`}
        disabled={timerEnabled}
        onClick={onTimerButtonClicked}
      >
        {timerTurnedOn ? "Stop Timer" : "Start Timer"}
      </button>
      <ItemsList items={ids} render={jokeId => <FavoriteJoke id={jokeId} />} />
    </>
  );
};
