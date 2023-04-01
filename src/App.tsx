import React from 'react';
import logo from './logo.svg';
import './App.css';

const title = 'React';
function App() {
  return (
    <div>
      <h1>Road to {title}</h1>
      <label htmlFor="search">Search</label>
      <input id="search" type="text" />
      {[1, 2, 3].map((item) => (
        <ul>{item}</ul>
      ))}
    </div>
  );
}

export default App;
