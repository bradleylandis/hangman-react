import React, { Component } from 'react';
import Game from './Game';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game/>
        <div><a href="http://www.wordnik.com" target="_blank" rel="noopener noreferrer"><img alt="powered by wordnik" src="wordnik.png"/></a></div>
      </div>
    );
  }
}

export default App;
