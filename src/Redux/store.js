import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import markers from './markers'
import timer from './timer'


//redux devtools:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  markers,
  location,
  timer
})


const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

export default store;
