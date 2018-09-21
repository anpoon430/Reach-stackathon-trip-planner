import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from './secrets';
import axios from 'axios';
import { fitBounds } from 'google-map-react/utils'

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
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 40.7049362,
      lng: -74.009193
    },
    zoom: 12
  };
  constructor(props){
    super(props);
    this.state = {
      currentPos: {
        lat: 40.7049362,
        lng: -74.009193
      },
      geoWatchId: 1
    }
    this.setCoords = this.setCoords.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
  }
  componentDidMount(){
    // this.getCurrentPosition();
    this.watchPosition();
  }
  centerToCurrentPos(evt){

  }
  onMapClick(evt){

  }
  setCoords = ({coords}) => {
    this.setState({
      currentPos: {
        lat: coords.latitude,
        lng: coords.longitude
    }});
  }
  componentWillUnmount(){
    if ('geolocation' in navigator){
      navigator.geolocation.clearWatch(this.state.geoWatchId);
    }
  }
  getCurrentPosition(){
    if ('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(this.setCoords);
    } else {
      console.log('geolocation is not available');
    }
  }
  watchPosition(){
    if ('geolocation' in navigator){
      let id = navigator.geolocation.watchPosition(this.setCoords);
      this.setState({
        geoWatchId: id
      })
    } else {
      console.log('geolocation is not available');
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center = {this.state.currentPos}
        >
          <GeolocationMarker
            lat={this.state.currentPos.lat}
            lng={this.state.currentPos.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
