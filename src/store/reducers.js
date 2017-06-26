import constants from './constants.js';
import { combineReducers } from 'redux';


export const tasks = (state = [], action) => {

  switch(action.type) {

  case constants.ADD_TASK: {
    if(state === null) return [action.payload];

    const hasTask = state.some(aTask => {
      return (aTask.jour === action.payload.jour && aTask.name === action.payload.name) ;
    });

    return (hasTask) ?
      state :
      [
        ...state,
        action.payload
      ];
  }
  case constants.REMOVE_TASK:
    return state.filter(aTask => {
      if(aTask.jour !== action.payload.jour || aTask.name !== action.payload.name) return true;
    });
  case constants.CHECK_TASK:
    return state.map(aTask => {
      if(aTask.jour === action.payload.jour && aTask.name === action.payload.name){
        return action.payload;
      }
    });
  case constants.UNCHECK_TASK:
    return state.map(aTask => {
      if(aTask.jour === action.payload.jour && aTask.name === action.payload.name){
        return action.payload;
      }
    });
  default:
    return state;
  }
};

export const user = (state = {}, action) => {

  if (action.type === constants.SET_USER) {
    return action.payload;
  }
  else if (action.type === constants.REMOVE_USER) {
    return {};
  }
  else {
    return state;
  }
};





//We combine our reducers in the same shape of our initial state
export default combineReducers({
  tasks,
  user,
});
