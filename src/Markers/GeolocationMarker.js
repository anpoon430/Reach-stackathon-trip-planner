import React from 'react';

const GeolocationMarker = () => {
  const styles = {
    marker: {
      backgroundColor: '#448AFF',
      border: 'solid 3px white',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      width: 20,
      height: 20
    }
  }
  return (
            <div style = {styles.marker}> </div>
          );
}

export default GeolocationMarker
