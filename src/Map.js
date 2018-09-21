import axios from 'axios';
import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';
import { MAPBOX_API_KEY, TRAVEL_TIME_API_KEY, TRAVEL_TIME_APP_ID} from './secrets';

let url = "https://api.traveltimeapp.com/v4/time-map/";
let headers = {
  "Content-Type": "application/json",
  "X-Application-Id": TRAVEL_TIME_APP_ID,
  "X-Api-Key": TRAVEL_TIME_API_KEY
};
let data = {
  departure_searches: [
    {
      id: "public transport from FSA",
      coords: {
        lat: 40.704896399999996,
        lng: -74.0120293
      },
      transportation: {
        type: "public_transport"
      },
      departure_time: "2018-09-12T08:00:00Z",
      travel_time: 3600
    }
  ]
};

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewport: {
        width: 1000,
        height: 1000,
        latitude: 40.704896399999996,
        longitude: -74.0120293,
        zoom: 8
      },
      coords : []
    }
  }
  async componentDidMount(){
    let res =await axios({
      url,
      method:'post',
      headers,
      data
    });
    this.setState({
      coords: res.data.results.shapes.shell
    })
  }
  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken = {MAPBOX_API_KEY}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

export default Map
