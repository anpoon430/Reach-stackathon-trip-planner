const initialState = {
  maps: {},
}

const SET_MAP = 'SET_MAP';

export const setMap = (mapsObj, map, google) => ({
  type: SET_MAP,
  mapsObj,
})

const map = (state= initialState, action) => {
  switch(action.type){
    case SET_MAP:
      return {
        ...state,
        maps: {...action.mapsObj}
      }
    default:
      return state
  }
}
export default map;

