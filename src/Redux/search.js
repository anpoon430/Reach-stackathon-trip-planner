const initialState = {
  currentPosition: {
    lat: 40.7049362,
    lng: -74.009193
  },
  zoom: 12,
}
const SET_POSITION = 'SET_POSITION';


export const setPosition = position => ({
  type: SET_POSITION,
  position
})

const search = (state = initialState, action) => {
  switch (action.type){
    case SET_POSITION:
      return {
        ...state,
        currentPosition: action.position
      }
    default:
      return state
  }
}

export default search;
