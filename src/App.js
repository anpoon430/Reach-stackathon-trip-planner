import React, { Component } from "react";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './Redux/store';

import "./App.css";

import SimpleMap from "./GoogleMap";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00897b'
    },
    secondary: {
      main: '#ffc400'
    }
  }
})




class App extends Component {
  render() {
    return (
    <Provider store = {store}>
        <Router>
          <MuiThemeProvider theme ={theme}>
            <div className="App">
              <SimpleMap />
            </div>
          </MuiThemeProvider>
        </Router>
    </Provider>
    );
  }
}

export default App;
