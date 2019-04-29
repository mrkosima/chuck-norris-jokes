import "./App.css";

import React, { lazy, Suspense } from "react";

import { ErrorBoundary } from "./common/ErrorBoundary";
import { Loader } from "./common/Loader";
import { AuthProvider } from "./login/AuthProvider";

// webpackChunkName for named chunk - https://webpack.js.org/guides/code-splitting/
const Jokes = lazy(() => import(/* webpackChunkName: "jokes" */ "./jokes"));

const App: React.FC = () => {
  return (
    <>
      <header />
      <div className="app">
        <ErrorBoundary>
          <AuthProvider>
            <Suspense fallback={<Loader />}>
              <Jokes />
            </Suspense>
          </AuthProvider>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
