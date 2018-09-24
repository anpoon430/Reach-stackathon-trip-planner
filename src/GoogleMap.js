import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from './secrets';
import { connect } from 'react-redux';
import { GeolocationMarker, Marker } from './Markers';
import {setMap} from './Redux/map';
import { addMarker, fetchDistanceMatix, removeMarker } from './Redux/markers';
import BottomTabs from './BottomTabs';
import Nav from './Nav';



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
      distMatrixIntervalId: 1,
      geoWatchId: 1,
      currentPosition: {
        lat: 40.7049362,
        lng: -74.009193
      },
      zoom: 12,
      center: {
        lat: 40.7049362,
        lng: -74.009193
      }
    }
    this.onMapClick = this.onMapClick.bind(this);
    this.setCoords = this.setCoords.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.centerToCurrentPosition = this.centerToCurrentPosition.bind(this);
  }
  componentDidMount(){
    this.watchPosition();
    let distMatrixIntervalId = setInterval(async()=>{
      const {mode} = this.props;
      const origin = this.state.currentPosition;
      const dest = this.props.markers;

      if (dest && dest.length){
        console.log('setting time data!!!!!!')
        await this.props.setTimeData(origin, dest, mode);
      }
    }, 30000)
    this.setState({
      distMatrixIntervalId
    })
  }

  componentWillUnmount(){
    if ('geolocation' in navigator){
      navigator.geolocation.clearWatch(this.state.geoWatchId);
    }
    clearInterval(this.state.distMatrixIntervalId);
  }
  onMapClick(evt){
    this.props.addMarker(evt);
  }
  setCoords({coords}){
    this.setState({
      currentPosition: {
        lat: coords.latitude,
        lng: coords.longitude
      }
    });
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
  centerToCurrentPosition(evt){
    this.setState({
      center: {
        lat: this.state.currentPosition.lat,
        lng: this.state.currentPosition.lng
      }
    }, ()=> { //reset center even user location didn't change
    this.setState({
      center: {}
    })
  })
}
  renderMarkers(){
    return this.props.markers.map((loc, i) => {
      return (
      <Marker

        duration={loc.duration}
        durationValue={loc.durationValue}
        key = {i}
        lat={loc.lat}
        lng={loc.lng} />)
    });
  }
render() {

    return (
      // Important! Always set the container height explicitly
      <Fragment>
        <Nav centerButton ={this.centerToCurrentPosition}/>
        <div id = 'google-map' >
          <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_API_KEY}}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onClick = {this.onMapClick}
            center={this.state.center}
            yesIWantToUseGoogleMapApiInternals = {true}
            onGoogleApiLoaded={(google) => {
              // console.log(google);
              this.props.setMap(google.maps)
            }}
            onChildClick = {(idx) => {

              this.props.rmMarker(Number(idx))
            }}
            >
              <GeolocationMarker
                key = 'geolocationMarker'
                lat={this.state.currentPosition.lat}
                lng={this.state.currentPosition.lng} />
              {
                this.renderMarkers()
              }
          </GoogleMapReact>
        </div>
        <BottomTabs/>
      </Fragment>
    );
  }
}

const mapState = ({markers, map}) => ({
  markers: markers.list,
  mode: markers.mode
})

const mapDispatch = dispatch => ({
  setMap(mapsObj){
    dispatch(setMap(mapsObj));
  },
  addMarker({lat, lng}){
    let marker = {lat, lng};
    dispatch(addMarker(marker));
   },
   setTimeData(...args){
     dispatch(fetchDistanceMatix(...args));
   },
   rmMarker(idx){
     console.log('DISPATCHING ACTION REMOVE MARKER');
     dispatch(removeMarker(idx));
   }
})

export default connect(mapState,mapDispatch)(SimpleMap);
