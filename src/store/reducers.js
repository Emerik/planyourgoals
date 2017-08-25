import constants from './constants.js';
import { combineReducers } from 'redux';

/* ACTIVITY */
export const activities = (state = [], action) => {

  switch(action.type) {

  case constants.ADD_ACTIVITY: {
    if(state === null) return [action.payload];

    const hasActivity = state.some(aActivity => {
      return (aActivity.id === action.payload.id ) ;
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
      if(aActivity.id !== action.payload.id) return true;
    });
  case constants.CLEAR_ACTIVITY:
    return [];
  case constants.CHECK_ACTIVITY:
    return state.map(aActivity => {
      if(aActivity.id == action.payload.id){
        aActivity.status = true;
      }
      return aActivity;
    });
  case constants.UNCHECK_ACTIVITY:
    return state.map(aActivity => {
      if(aActivity.id == action.payload.id){
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
      return (aGoal === action.payload) ;
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
      if(aGoal.id === action.payload.id) return false;

      return true;
    });
  case constants.CLEAR_GOAL:
    return [];
  case constants.SET_GOAL:
    return state.map(aGoal => {
      if(aGoal.id === action.payload.id){
        return action.newgoal;
      }
      return aGoal;
    });
  default:
    return state;
  }
};

/* SPORTS */
export const sports = (state=false, action) => {

  switch (action.type) {
  case constants.CLEAR_SPORTS:
    return [];
  case constants.CHANGE_SPORTS:
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
  sports
});
