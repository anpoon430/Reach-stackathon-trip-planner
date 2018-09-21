import React, { Component } from 'react';
import './App.css';

import SimpleMap from './GoogleMap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SimpleMap />
      </div>
    );
  }
}

export default App;
