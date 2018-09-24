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

import SearchIcon from '@material-ui/icons/Search';
import GpsFixed from '@material-ui/icons/GpsFixed';

import RouteIcon from '@material-ui/icons/Directions';

import TimerIcon from '@material-ui/icons/Timer';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import {fetchDistanceMatix, setReachability} from './Redux/markers';

function msToTime(s) {

  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
}



const styles = theme => ({
  root: {
    width: '100%',
    // display: 'flex',
    // justifyContent: 'space-around'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  timerInput:{
    width: 50,
    marginRight: 5,
  }
});

const convertTime = (timeObj) => {
  const time = {
    'h': 3600000,
    'm': 60000,
    's': 1000,
  }
  let miliseconds = Number(timeObj.h)*time.h
  + Number(timeObj.m)*time.m + Number(timeObj.s)*time.s;
  return miliseconds;
}


class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {
      timer: {
        input: {
          h: 0,
          m: 0,
          s: 0
        },
        started: false,
      },
      timeLeft: 0
    }
    this.distMatrixIntervalId = 1;
    }
  handleChange = (evt) => {
    this.setState({
      timer: {
        input: {
          ...this.state.timer.input,
        [evt.target.name]: evt.target.value
       }}
      }
    );
  }
  handleClick = () => {
    this.setState((state) => {
      return {
        ...state,
        timer: {
          input: {...state.timer.input},
          started: !state.timer.started
        }
      }
    }, async() => {
      const {timer} = this.state;
      const {h, m, s} = timer.input;
      if (this.state.timer.started){

        let convertedTime = convertTime({h, m, s});

        this.timerInterval = 0;
        this.start = Date.now();
        this.timeToStopAt = convertedTime + this.start;
        this.setState({
          timeLeft: this.timeToStopAt
        });
        let currentTimeRemaining = this.timeToStopAt - Date.now();
        this.startTimer();

        await this.loadTimeAndReach();
        let distMatrixIntervalId = setInterval(async()=>{
          await this.loadTimeAndReach()
          // origin = this.props.origin;
          // markers = this.props.markers;

          // if (markers.length){
          //   console.log('setting time data!!!!!!')
          //   try {
          //     await this.props.setTimeData(origin);
          //     this.props.getReachability(Math.floor(currentTimeRemaining/1000));
          //   } catch (error) {
          //     console.error(error)
          //   }
          // }
        }, 30000);
        this.distMatrixIntervalId = distMatrixIntervalId;
      } else {

        clearInterval(this.timerInterval);
        clearInterval(this.distMatrixIntervalId);
      }
    }
    );
  }
  loadTimeAndReach = async() =>{
    let currentTimeRemaining = this.timeToStopAt - Date.now();
    let {origin, markers} = this.props;
        if (markers.length){
          console.log('setting time data!!!!!!')
          try {
            await this.props.setTimeData(origin);
            this.props.getReachability(Math.floor(currentTimeRemaining/1000));
          } catch (error) {
            console.error(error)
          }
        }
  }
  startTimer(){
    this.timerInterval = setInterval(() => {
      console.log('SETTING TIME!!');
      this.setState((state)=>{
      return {timeLeft: state.timeLeft - 1000}
    }
  )}, 1000);
  }
  renderTime(){
    let currentTimeRemaining = this.timeToStopAt - Date.now();
    console.log(formattedTime);
    let formattedTime = msToTime(currentTimeRemaining);
    if ( currentTimeRemaining > 0) return <span>{formattedTime}</span>
    clearInterval(this.timerInterval);
    return 'TIMEE!!!!'
  }
  render(){
    const { classes, googlemap, centerButton } = this.props;
    const {timer} = this.state;
    const {h, m, s} = timer.input;
    // let remainingTime;
    // console.log(this.timer);
    // console.log('TIME REMAINING!!!!', this.timer);
    return (
      <div className = {classes.root}>
        <AppBar position='fixed'>
          <Toolbar>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                {googlemap && googlemap.places &&
                <SearchBox />}
              </div>
              <div>
            <IconButton
              onClick={centerButton}>
              <GpsFixed />
            </IconButton>
                <TextField
                  className={classes.timerInput}
                  label = 'H'
                  type= 'number'
                  name = 'h'
                  onChange = {this.handleChange}
                  value = {this.state.timer.input.h || 0}
                  />
                <TextField
                  className={classes.timerInput}
                  label = 'M'
                  type= 'number'
                  name = 'm'
                  onChange = {this.handleChange}
                  value = {this.state.timer.input.m || 0}
                  />
                <TextField
                  className={classes.timerInput}
                  label = 'S'
                  type= 'number'
                  name = 's'
                  onChange = {this.handleChange}
                  value = {this.state.timer.input.s || 0}
                  />
                  <IconButton>
                    {
                      this.state.timer.started ?
                      <TimerOffIcon onClick={this.handleClick} />
                      : <TimerIcon onClick={this.handleClick}/>
                    }
                  </IconButton>
                  {this.renderTime()}
                  <IconButton
                    onClick={this.loadTimeAndReach}>
                    <RouteIcon />
                  </IconButton>
              </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}



Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapState = ({markers, map}) => ({
  googlemap: map.maps,
  markers: markers.list
})

const mapDispatch = (dispatch) => ({
  setTimeData(...args){
    dispatch(fetchDistanceMatix(...args));
  },
  getReachability(timeLeft){
    dispatch(setReachability(timeLeft));
  }
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Nav));
