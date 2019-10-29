import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducers/index'
import { createLogger } from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk

// ACTION TYPES

// ACTION CREATORS

// THUNKS


const store = createStore(
  reducer,
  // `withExtraArgument` gives us access to axios in our async action creators!
  // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
  // thunkMiddleware.withExtraArgument({ axios }),
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store
