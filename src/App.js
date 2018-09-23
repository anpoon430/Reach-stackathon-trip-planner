import React, { Component } from "react";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './Redux/store';

import "./App.css";

import SimpleMap from "./GoogleMap";

class App extends Component {
  render() {
    return (
    <Provider store = {store}>
        <Router>
          <div className="App">
            <SimpleMap />
          </div>
        </Router>
    </Provider>
    );
  }
}

export default App;
