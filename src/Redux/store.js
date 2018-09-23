import thunk from 'redux-thunk'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import markers from './markers'
import timer from './timer'
import map from './map'

const reducer = combineReducers({
  map,
  markers,
  timer
})


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, createLogger({collapsed: true})))
)

export default store;
