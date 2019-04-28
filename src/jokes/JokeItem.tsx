import React, { memo } from "react";
import { Joke } from "../types";
import { StarButton } from "../common/StarButton";

export interface JokeItemProps {
  joke: Joke;
  selected: boolean;
  disabled: boolean;
  onSelectedChange: (id: number) => void;
}

export const JokeItem = memo((props: JokeItemProps) => {
  const { joke, disabled, selected, onSelectedChange } = props;
  const { id, text } = joke;
  return (
    <div className="joke-item">
      <div>
        <StarButton
          disabled={disabled}
          onClick={() => onSelectedChange(id)}
          active={selected}
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
});
