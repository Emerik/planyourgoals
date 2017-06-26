import constants from '../store/constants';

export function addTask(name, desc, type, jour, checked=false) {
  return {
    type: constants.ADD_TASK,
    payload: {name, desc, type, jour, checked}
  };
}

export function removeTask(name, desc, type, jour, checked=false) {
  return {
    type: constants.REMOVE_TASK,
    payload: {name, desc, type, jour, checked}
  };
}

export function checkTask(name, desc, type, jour, checked=true) {
  return {
    type: constants.CHECK_TASK,
    payload: {name, desc, type, jour, checked}
  };
}

export function uncheckTask(name, desc, type, jour, checked=false) {
  return {
    type: constants.UNCHECK_TASK,
    payload: {name, desc, type, jour, checked}
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
