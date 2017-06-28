import constants from '../store/constants';

export function addTask({name, description, type, day, status=false}) {
  return {
    type: constants.ADD_TASK,
    payload: {name, description, type, day, status}
  };
}

export function removeTask({name, description, type, day, status=false}) {
  return {
    type: constants.REMOVE_TASK,
    payload: {name, description, type, day, status}
  };
}

export function clearTask() {
  return {
    type: constants.CLEAR_TASK
  };
}

export function checkTask({name, description, type, day, status=true}) {
  return {
    type: constants.CHECK_TASK,
    payload: {name, description, type, day, status}
  };
}

export function uncheckTask({name, description, type, day, status=false}) {
  return {
    type: constants.UNCHECK_TASK,
    payload: {name, description, type, day, status}
  };
}

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
