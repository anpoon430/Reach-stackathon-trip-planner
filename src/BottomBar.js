import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { AppBar, TextField } from '@material-ui/core';
import SearchBox from './SearchBox';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

import Subway from '@material-ui/icons/Subway';
import Car from '@material-ui/icons/TimeToLeave';
import Walk from '@material-ui/icons/DirectionsWalk';
import Bike from '@material-ui/icons/DirectionsBike';



const styes = theme => ({



})

class BottomBar extends Component {
  constructor(props){
    super(props);
  }
  render(){
   return (
   <footer id = 'bottom-bar'>
     <AppBar position = 'static'>
      <Toolbar>
        <IconButton>
          <Car />
        </IconButton>
        <IconButton>
          <Subway />
        </IconButton>
        <IconButton>
          <Walk />
        </IconButton>
        <IconButton>
          <Bike />
        </IconButton>
      </Toolbar>
     </AppBar>
   </footer>
   )


  }
}

export default BottomBar;
