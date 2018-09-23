import React from 'react';
import Place from '@material-ui/icons/Place';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



const styles = {
  marker: {
    padding: 5,
    backgroundImage: 'url(infowindow.png)',
    backgroundColor: 'white',
    width: 50,
    height:36,
    transform: 'translate(0%, -100%)'
  },
  markerHover: {
    padding: 5,
    width:50,
    height:36,
    backgroundColor: 'white',
    backgroundImage: 'url(infowindow.png)',
    transform: 'translate(0%, -100%) scale(1.5)',
  }
}

const Marker = props => {
  const { classes, duration, durationValue } = props;

  let style = props.$hover ? classes.markerHover: classes.marker;
  return (
            <div className={style} >
              <p>
                {duration}
              </p>
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
