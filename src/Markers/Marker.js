import React from 'react';
import Place from '@material-ui/icons/Place';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
  marker: {

    backgroundImage: 'url(infowindow.png)',
    width: 36,
    height:36,
    transform: 'translate(0%, -100%)'
  },
  markerHover: {
    backgroundImage: 'url(infowindow.png)',
    width: 40,
    height: 40,
    transform: 'translate(0%, -100%)',
  }
}

const Marker = props => {
  const { classes, duration, durationValue } = props;

  let style = props.$hover ? classes.markerHover : classes.marker;
  return (
            <div className={style} >
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
