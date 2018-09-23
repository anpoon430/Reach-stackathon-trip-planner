const initialState = {
  timeLeft: {}, //use builtIn methods to extract relevant details
  status: 'stop',//stop, play, pause
  timerId: 0 //maybe not needed
};




const timer = (state = initialState, action) => {
  switch (action.type){
    default:
      return state
  }
}

export default timer;
