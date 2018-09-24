import React from 'react';
import Place from '@material-ui/icons/Place';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



const styles = {
  markerReachable:{
    padding: 3,
    backgroundColor: 'white',
    border: 'solid green 1.5px',
    borderRadius:5,
    color: 'black',
    minWidth: 45,
    minHeight:15,
    transform: 'translate(-50%, -50%)'
  },
  markerReachableHover: {
    padding: 3,
    minWidth: 45,
    minHeight:15,
    backgroundColor: 'white',
    borderRadius:5,
    color: 'black',
    border: 'solid green 1.5px',
    transform: 'translate(-50%, -50%) scale(1.5)',
  },
  markerNotReachable: {
    padding: 3,
    minWidth: 45,
    minHeight:15,
    backgroundColor: 'white',
    borderRadius:5,
    color: 'black',
    border: 'solid red 1.5px',
    transform: 'translate(-50%, -50%)',
  },
  markerNotReachableHover: {
    padding: 3,
    minWidth: 45,
    minHeight:15,
    backgroundColor: 'white',
    borderRadius:5,
    color: 'black',
    border: 'solid red 1.5px',
    transform: 'translate(-50%, -50%) scale(1.5)',
  },

}

const reach = {
  'true': {
    hover: 'markerReachableHover',
    noHover: 'markerReachable'
  },
  'false': {
    hover: 'markerNotReachableHover',
    noHover: 'markerNotReachable'
  }
}

const Marker = props => {
  const { classes, duration, address, reachability} = props;
  let hover = props.$hover? 'hover' : 'noHover';
  let reachable = String(reachability);
  return (
      <div className = {classes[reach[reachable][hover]]} >
        <div>
          <strong>{duration}</strong>
        </div>
       {props.$hover &&
       <div>
          {address}
        </div>
      }
      </div>
  )
}


Marker.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Marker);
