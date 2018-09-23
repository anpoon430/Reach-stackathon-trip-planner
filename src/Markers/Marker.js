import React from 'react';
import Place from '@material-ui/icons/Place';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



const styles = {
  marker:{
    padding: 3,
    backgroundColor: 'white',
    border: 'solid black 1.5px',
    width: 45,
    height:15,
    transform: 'translate(-50%, -50%)'
  },
  markerHover: {
    padding: 3,
    width: 45,
    height:15,
    backgroundColor: 'white',
    border: 'solid black 1.5px',
    transform: 'translate(-50%, -50%) scale(1.5)',
  }
}

const Marker = props => {
  const { classes, duration, durationValue } = props;

  let style = props.$hover ? classes.markerHover: classes.marker;
  return (
            <div className = {style} >
              {duration}
            </div>
          );
}


Marker.propTypes = {
  classes: PropTypes.object.isRequired
};

// const mapState = ({markers}) => ({
//   markerDetails: markers.list.find(())
// })


export default withStyles(styles)(Marker);
