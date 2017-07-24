import constants from './constants.js';
import { combineReducers } from 'redux';

/* ACTIVITY */
export const activities = (state = [], action) => {

  switch(action.type) {

  case constants.ADD_ACTIVITY: {
    if(state === null) return [action.payload];

    const hasActivity = state.some(aActivity => {
      return (aActivity.date === action.payload.date && aActivity.name === action.payload.name) ;
    });

    return (hasActivity) ?
      state :
      [
        ...state,
        Object.assign({},action.payload)
      ];
  }
  case constants.REMOVE_ACTIVITY:
    return state.filter(aActivity => {
      if(aActivity.date !== action.payload.date || aActivity.name !== action.payload.name) return true;
    });
  case constants.CLEAR_ACTIVITY:
    return [];
  case constants.CHECK_ACTIVITY:
    return state.map(aActivity => {
      if(aActivity.date === action.payload.date && aActivity.name === action.payload.name){
        aActivity.status = true;
      }
      return aActivity;
    });
  case constants.UNCHECK_ACTIVITY:
    return state.map(aActivity => {
      if(aActivity.date === action.payload.date && aActivity.name === action.payload.name){
        aActivity.status = false;
      }
      return aActivity;
    });
  default:
    return state;
  }
};

/* USER */
export const user = (state = {}, action) => {

  if (action.type === constants.SET_USER) {
    return Object.assign( {},action.payload );
  }
  else if (action.type === constants.REMOVE_USER) {
    return {};
  }
  else {
    return state;
  }
};

/* GOALS */
export const goals = (state = [], action) => {

  switch(action.type) {

  case constants.ADD_GOAL: {
    if(state === null) return [action.payload];

    const hasGoal = state.some(aGoal => {
      return (aGoal.type === action.payload.type && aGoal.deadline === action.payload.deadline) ;
    });

    return (hasGoal) ?
      state :
      [
        ...state,
        Object.assign({},action.payload)
      ];
  }
  case constants.REMOVE_GOAL:
    return state.filter(aGoal => {
      if(aGoal.type === action.payload.type && aGoal.deadline === action.payload.deadline) return false;

      return true;
    });
  case constants.CLEAR_GOAL:
    return [];
  case constants.SET_GOAL:
    return state.map(aGoal => {
      if(aGoal.type === action.payload.type && aGoal.deadline === action.payload.deadline){
        return action.newgoal;
      }
      return aGoal;
    });
  default:
    return state;
  }
};

/* TYPES DEPRECATED */
export const types = (state=false, action) => {

  switch (action.type) {
  case constants.CLEAR_TYPES:
    return [];
  case constants.CHANGE_TYPES:
    return action.payload;
  default:
    return state;
  }
};



//We combine our reducers in the same shape of our initial state
export default combineReducers({
  activities,
  user,
  goals,
  types
});
