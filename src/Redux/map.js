const initialState = {
  maps: {}
}

const SET_MAP = 'SET_MAP';

export const setMap = mapObj => ({
  type: SET_MAP,
  mapObj
})

const map = (state= initialState, action) => {
  switch(action.type){
    case SET_MAP:
      return {
        ...state,
        maps: {...action.mapObj}
      }
    default:
      return state
  }
}
export default map;

