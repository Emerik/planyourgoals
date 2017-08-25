import constants from '../store/constants';

/* ACTIVITY ACTION CREATOR */
export function addActivity({id,name, date, description, sport, activityType, status=false, target, resultat}) {
  return {
    type: constants.ADD_ACTIVITY,
    payload: {id, name, date, description, sport, activityType, status, target, resultat}
  };
}

export function removeActivity({id, name, date, description, sport, activityType, status=false, target, resultat}) {
  return {
    type: constants.REMOVE_ACTIVITY,
    payload: {id, name, date, description, sport, activityType, status, target, resultat}
  };
}

export function clearActivity() {
  return {
    type: constants.CLEAR_ACTIVITY
  };
}

export function checkActivity({id, name, date, description, sport, activityType, status=false, target, resultat}) {
  return {
    type: constants.CHECK_ACTIVITY,
    payload: {id, name, date, description, sport, activityType, status, target, resultat}
  };
}

export function uncheckActivity({id, name, date, description, sport, activityType, status=false, target, resultat}) {
  return {
    type: constants.UNCHECK_ACTIVITY,
    payload: {id, name, date, description, sport, activityType, status, target, resultat}
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
export function addGoal({id, name, startingdate, deadline, sport, target, goaltype}) {
  return {
    type: constants.ADD_GOAL,
    payload: {id, name, startingdate, deadline, sport, target, goaltype}
  };
}

export function removeGoal({id, name, startingdate, deadline, sport, target, goaltype}) {
  return {
    type: constants.REMOVE_GOAL,
    payload: {id, name, startingdate, deadline, sport, target, goaltype}
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

/* SPORT ACTION CREATOR */
export function changeSports(sports) {
  return {
    type: constants.CHANGE_SPORTS,
    payload: sports
  };
}

export function clearSports() {
  return {
    type: constants.CLEAR_SPORTS,
  };
}
