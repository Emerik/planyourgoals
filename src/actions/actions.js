import constants from '../store/constants';

/* ACTIVITY ACTION CREATOR */
export function addActivity({name, description, goal, date, duration, status=false}) {
  return {
    type: constants.ADD_ACTIVITY,
    payload: {name, description, goal, date, duration, status}
  };
}

export function removeActivity({name, description, goal, date, duration, status=false}) {
  return {
    type: constants.REMOVE_ACTIVITY,
    payload: {name, description, goal, date, duration, status}
  };
}

export function clearActivity() {
  return {
    type: constants.CLEAR_ACTIVITY
  };
}

export function checkActivity({name, description, goal, date, duration, status=true}) {
  return {
    type: constants.CHECK_ACTIVITY,
    payload: {name, description, goal, date, duration, status}
  };
}

export function uncheckActivity({name, description, goal, date, duration, status=false}) {
  return {
    type: constants.UNCHECK_ACTIVITY,
    payload: {name, description, goal, date, duration, status}
  };
}

/* USER ACTION CREATOR */
export function setUser(user) {
  return {
    type: constants.SET_USER,
    payload: user
  };
}

export function removeUser() {
  return {
    type: constants.REMOVE_USER,
  };
}

/* GOAL ACTION CREATOR */
export function addGoal({type, target, time, deadline}) {
  return {
    type: constants.ADD_GOAL,
    payload: {type, target, time, deadline}
  };
}

export function removeGoal({type, target, time, deadline}) {
  return {
    type: constants.REMOVE_GOAL,
    payload: {type, target, time, deadline}
  };
}

export function clearGoal() {
  return {
    type: constants.CLEAR_GOAL
  };
}

export function setGoal(oldGoal, newGoal) {
  return {
    type: constants.SET_GOAL,
    payload: oldGoal,
    newgoal: newGoal
  };
}

/* TYPE ACTION CREATOR */
export function changeTypes(types) {
  return {
    type: constants.CHANGE_TYPES,
    payload: types
  };
}

export function clearTypes() {
  return {
    type: constants.CLEAR_TYPES,
  };
}
