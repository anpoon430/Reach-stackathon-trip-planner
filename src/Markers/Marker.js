import React from 'react';
import Place from '@material-ui/icons/Place';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  marker: {
    fontSize: 40,
    transform: 'translate(-50%, -100%)'
  },
  markerHover: {
    transform: 'translate(-50%, -100%)',
    fontSize: 48
  }
}

const Marker = props => {
  const { classes } = props;

  let style = props.$hover ? classes.markerHover : classes.marker;
  return (
            <Place className={style} />
          );
}


Marker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Marker);
