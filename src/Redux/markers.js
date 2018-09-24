import axios from 'axios';
import { GOOGLE_API_KEY } from '../secrets';
const modes = [
  'DRIVING',
  'TRANSIT',
  'WALKING',
  'BICYCLING'
];

const initialState = {
  mode: 0, //use modes array to get string before request
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
const REMOVE_MARKER = 'REMOVE_MARKER';
const SET_MODE = 'SET_MODE';
const SET_REACHABILITY = 'SET_REACHABILITY';

export const setReachability = timeLeft => ({
  type: SET_REACHABILITY,
  timeLeft
})

export const setMode = mode => ({
  type: SET_MODE,
  mode
})

export const removeMarker = idx => ({
  type: REMOVE_MARKER,
  idx
})

export const setMarkers = markers => ({
  type: SET_MARKERS,
  markers
})

export const addMarker = marker => ({
  type: ADD_MARKER,
  marker
})

export const setMarkersWithTimeData = (timeData, addressData) => ({
  type: SET_MARKERS_WITH_TIME_DATA,
  timeData,
  addressData
})

export const fetchDistanceMatix = (origin) =>{
  return async (dispatch, getState) => {
    try {
      let state = getState();
      let distanceMatrixConstructor = state.map.maps.DistanceMatrixService;
      let service = new distanceMatrixConstructor();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: state.markers.list.map(
            marker => ({
              ...marker,
              lat: marker.lat,
              lng: marker.lng
            })),
          travelMode: modes[state.markers.mode],
        }, callback
      );

      function callback(res, status) {
        let timeData;
        let addressData;
        if (status === 'OK'){
          timeData = res.rows[0].elements;
          addressData = res.destinationAddresses;
          dispatch(setMarkersWithTimeData(timeData, addressData));
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
          if (action.timeData[i].status !== 'OK') {
            return {
              ...marker,
              duration: '?',
              value: '?'
            }
          }
          return {
            ...marker,
            duration: action.timeData[i].duration.text,
            durationValue: action.timeData[i].duration.value,
            address: action.addressData[i]
          }
        })
      }
    case REMOVE_MARKER:
      return {
        ...state,
        list: state.list.filter((marker, i) => {
          // console.log('REMOVING MARKER, INSIDE REDUCER', i);
          return  i !== action.idx
        })
      }
    case SET_MODE:
      return {
        ...state,
        mode: action.mode
      }
    case SET_REACHABILITY:
      return {
        ...state,
        list: state.list.map((marker, i) => {
          if (!marker.durationValue) return {...marker, reachability: false};
          let condition = action.timeLeft - marker.durationValue > 0;
          if (condition) return {...marker, reachability: true};
          return {...marker, reachability: false};
        })
      }
    default:
      return state
  }
}

export default markers;
