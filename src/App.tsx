import React from 'react';
import './App.css';
import { Jokes } from './jokes';

const App: React.FC = () => {
  return (
    <div className="app">
      <Jokes />
    </div>
  );
}

export default App;
