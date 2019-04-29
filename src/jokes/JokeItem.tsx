import React, { memo, useCallback } from 'react';

import { StarButton } from '../common/StarButton';
import { Joke } from '../types';

export interface JokeItemProps {
  joke: Joke;
  selected: boolean;
  disabled: boolean;
  onSelectedChange: (id: number) => void;
}

export const JokeItem = memo((props: JokeItemProps) => {
  const { joke, disabled, selected, onSelectedChange } = props;
  const { id, text } = joke;
  const onStarClicked = useCallback(() => {
    onSelectedChange(id);
  }, [id, onSelectedChange]);
  return (
    <div className="joke-item">
      <div>
        <StarButton
          disabled={disabled}
          onClick={onStarClicked}
          active={selected}
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
});
