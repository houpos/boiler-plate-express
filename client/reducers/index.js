import { combineReducers } from 'redux'

// Add any initial state properties. Use Tom's First Law
const initialState = {}
// Use these reducers if it'd be better to split up actions
// export these if needed
const reducer1 = (state = initialState, action) => {return state}
const reducer2 = (state = initialState, action) => {return state};

// This will be the main reducer
// export const reducer = (state = initialState, action) => {return state};

export const reducer = combineReducers({
  reducer1: reducer1,
  reducer2: reducer2
});
