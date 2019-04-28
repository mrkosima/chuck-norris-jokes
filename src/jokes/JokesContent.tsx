import React, { FC } from "react";

export const JokesContent: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="jokes-content">
      <p className="jokes-content-title">{title}</p>
      {children}
    </div>
  );
};
