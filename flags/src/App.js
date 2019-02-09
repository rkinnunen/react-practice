import React, { Component } from 'react';
import CountryGame from './CountryGame';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="title-header">
          <h1>Guess the Flag</h1>
        </header>
        <CountryGame />
      </div>
    );
  }
}

export default App;
