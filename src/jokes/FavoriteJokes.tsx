import React, { useContext } from "react";
import { FavoriteJokesContext } from "./FavoriteJokesProvider";
import { LoadableJoke } from "./LoadableJoke";
import { Joke } from "../types";

import "./FavoriteJokes.css";
import { JokeItem } from "./JokeItem";

export const FavoriteJokes = () => {
  const favoriteJokesContext = useContext(FavoriteJokesContext);
  const renderFavotiteJoke = (joke: Joke) => (
    <JokeItem
      joke={joke}
      selected={true}
      onSelectedChange={favoriteJokesContext.toggleId}
    />
  );
  return (
    <div className="favorite-jokes">
      {favoriteJokesContext.ids.length
        ? favoriteJokesContext.ids.map(id => (
            <LoadableJoke key={id} id={id} render={renderFavotiteJoke} />
          ))
        : "No Favorite"}
    </div>
  );
};
