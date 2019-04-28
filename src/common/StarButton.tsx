import React, { FC } from "react";
import "./StarButton.css";

export interface StarButtonProps {
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}
export const StarButton: FC<StarButtonProps> = ({
  active,
  disabled,
  onClick
}) => {
  return (
    <button className={`star-button ${active ? "active" : ""}`} disabled={disabled} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" 
       viewBox="0 0 256 256">
        <path d="M196.46 232.73l-68.28-41.51-68.107 41.79 18.381-77.77-60.793-51.86L97.3 96.835l30.54-73.844 30.838 73.717 79.665 6.222-60.58 52.11z"
        fillRule="evenodd" 
        fill="currentColor"/>
      </svg>
    </button>
  );
};
