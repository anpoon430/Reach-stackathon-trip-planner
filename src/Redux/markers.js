import axios from 'axios';
import { GOOGLE_API_KEY } from '../secrets';

const initialState = {
  mode: 'DRIVING',
  list: [],
  selected: {}, //currently selected marker, will display address, task,
  timer: {
    timeLeft: {},
    status: 'stop', //stop,play,pause
    timerId: 0 // may not need
  }
}

const SET_MARKERS = 'SET_MARKERS';
const ADD_MARKER = 'ADD_MARKER';
const SET_MARKERS_WITH_TIME_DATA = 'SET_MARKERS_WITH_TIME_DATA';

export const setMarkers = markers => ({
  type: SET_MARKERS,
  markers
})

export const addMarker = marker => ({
  type: ADD_MARKER,
  marker
})

export const setMarkersWithTimeData = data => ({
  type: SET_MARKERS_WITH_TIME_DATA,
  data
})

export const fetchDistanceMatix = (origin, destinations, mode) =>{
  return async (dispatch, getState) => {
    try {
      let state = getState();
      let distanceMatrixConstructor = state.map.maps.DistanceMatrixService;
      let service = new distanceMatrixConstructor();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: destinations.map(
            marker => ({
              lat: marker.lat,
              lng: marker.lng
            })),
          travelMode: mode,
        }, callback
      );

      function callback(res, status) {
        let pointsWithData;
        if (status === 'OK'){
          pointsWithData = res.rows[0].elements;
          dispatch(setMarkersWithTimeData(pointsWithData));
        } else {
          console.log('Travel time could not be calculated for the points of interest');
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

const markers = (state = initialState, action) => {
  switch (action.type){
    case SET_MARKERS:
      return {
        ...state,
        list: action.markers
      }
    case ADD_MARKER:
      return {
        ...state,
        list: [...state.list, {...action.marker}]
      }
    case SET_MARKERS_WITH_TIME_DATA:
      return {
        ...state,
        list: state.list.map((marker, i) => {
          if (action.data[i].status !== 'OK') {
            return {
              ...marker,
              duration: '?',
              value: '?'
            }
          }
          return {
            ...marker,
            duration: action.data[i].duration.text,
            durationValue: action.data[i].duration.value,
            // reachability: state.timer.timeLeft.getSeconds() - action.data[i].duration.value > 0
          }
        })

      }
    default:
      return state
  }
}

export default markers;
