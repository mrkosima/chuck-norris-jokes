import React, { memo } from "react";
import "./JokeItem.css";
import { Joke } from "../types";

export interface JokeItemProps {
  joke: Joke;
  selected: boolean;
  onSelectedChange: (id: number) => void;
}

export const JokeItem = memo(
  (props: JokeItemProps) => {
    const { joke, selected, onSelectedChange } = props;
    const { id, text } = joke;
    return (
      <p className="joke-item">
        <input
          type="checkbox"
          checked={selected}
          onChange={e => {
            e.stopPropagation();
            onSelectedChange(id);
          }}
        />
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </p>
    );
  });
