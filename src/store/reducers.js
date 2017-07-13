import constants from './constants.js';
import { combineReducers } from 'redux';

/* TASKS */
export const tasks = (state = [], action) => {

  switch(action.type) {

  case constants.ADD_TASK: {
    if(state === null) return [action.payload];

    const hasTask = state.some(aTask => {
      return (aTask.date === action.payload.date && aTask.name === action.payload.name) ;
    });

    return (hasTask) ?
      state :
      [
        ...state,
        Object.assign({},action.payload)
      ];
  }
  case constants.REMOVE_TASK:
    return state.filter(aTask => {
      if(aTask.date !== action.payload.date || aTask.name !== action.payload.name) return true;
    });
  case constants.CLEAR_TASK:
    return [];
  case constants.CHECK_TASK:
    return state.map(aTask => {
      if(aTask.date === action.payload.date && aTask.name === action.payload.name){
        aTask.status = true;
      }
      return aTask;
    });
  case constants.UNCHECK_TASK:
    return state.map(aTask => {
      if(aTask.date === action.payload.date && aTask.name === action.payload.name){
        aTask.status = false;
      }
      return aTask;
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

/* TYPES */
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
  tasks,
  user,
  goals,
  types
});
