import React from "react";
import "./App.css";
import { Jokes } from "./jokes";
import { ErrorBoundary } from "./common/ErrorBoundary";

const App: React.FC = () => {
  return (
    <>
      <header />
      <div className="app">
        <ErrorBoundary>
          <Jokes />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
