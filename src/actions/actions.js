import constants from '../store/constants';

/* TASK ACTION CREATOR */
export function addTask({name, description, type, date, duration, status=false}) {
  return {
    type: constants.ADD_TASK,
    payload: {name, description, type, date, duration, status}
  };
}

export function removeTask({name, description, type, date, duration, status=false}) {
  return {
    type: constants.REMOVE_TASK,
    payload: {name, description, type, date, duration, status}
  };
}

export function clearTask() {
  return {
    type: constants.CLEAR_TASK
  };
}

export function checkTask({name, description, type, date, duration, status=true}) {
  return {
    type: constants.CHECK_TASK,
    payload: {name, description, type, date, duration, status}
  };
}

export function uncheckTask({name, description, type, date, duration, status=false}) {
  return {
    type: constants.UNCHECK_TASK,
    payload: {name, description, type, date, duration, status}
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
export function addGoal({type, number, time, deadline}) {
  return {
    type: constants.ADD_GOAL,
    payload: {type, number, time, deadline}
  };
}

export function removeGoal({type, number, time, deadline}) {
  return {
    type: constants.REMOVE_GOAL,
    payload: {type, number, time, deadline}
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
