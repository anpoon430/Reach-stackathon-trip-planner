import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from './secrets';
import axios from 'axios';
import { fitBounds } from 'google-map-react/utils';
import Button from '@material-ui/core/Button';
import {
  GeolocationMarker,
  Marker
}   from './Markers';

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
      geoWatchId: 1,
      markers: []
    }
    this.setCoords = this.setCoords.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  componentDidMount(){
    this.watchPosition();
  }
  centerToCurrentPos(evt){
    //TODO: on click a button, will center map on geolocation marker
    this.setState(state => {
      return {
        ...state,

      }
    })

  }
  onMapClick(evt){
   this.setState(state => {
     return {
       ...state,
      markers: [...state.markers, evt]
      }
   })
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
  renderMarkers(){
    return this.state.markers.map((loc, i) => {
      return (
       <Marker
         key = {i}
         lat={loc.lat}
         lng={loc.lng} />)
     });
  }
  render() {
    console.log(this.state.currentPos);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick = {this.onMapClick}
          >
            <GeolocationMarker
              key = 'geolocationMarker'
              lat={this.state.currentPos.lat}
              lng={this.state.currentPos.lng} />
            {
              this.renderMarkers()
            }
          {/* <Button/> */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
