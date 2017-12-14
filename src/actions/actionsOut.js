import constants from '../store/constants';
import { replaceActivities, addActivity, changeActivity, removeActivity,
  replaceGoals, addGoal, removeGoal, replaceGoaltypes, replaceSports,
  setUser, removeUser } from './actions';
import * as firebaseRequest from '../utils/firebaseUtils';


/**
* This function get activities from API server
**/
export const signIn = (email, password, callback) => (dispatch) => {

  dispatch({
    type: constants.GENERAL_FETCHING
  });

  firebaseRequest.signIn(email, password, (err) => {
    if (err) return callback ? callback(err) : -1;
    dispatch(setUser({
      email: email,
      pseudo:'test',
      token: 'token'}));
    if(callback) return callback(null,true);
    return 0;
  });
};

/**
* This function get activities from API server
**/
export const signOut = (callback) => (dispatch) => {

  dispatch({
    type: constants.GENERAL_FETCHING
  });

  firebaseRequest.signOut((err) => {
    if (err) return callback(err);

    dispatch(removeUser());

    if(callback) callback(null,true);
  });
};

/**
* This function get activities from API server
**/
export const fetchActivity = (callback) => (dispatch) => {

  dispatch({
    type: constants.FETCH_ACTIVITY
  });

  firebaseRequest.getAllActivity((err, activities) => {
    if (err) return callback ? callback(err) : false;
    dispatch(replaceActivities(activities));
    if(callback) callback(null,true);
    return true;
  });
};

/**
* This function add an activity to API server
**/
export const addActivityToServer = (activityToAdd, callback) => (dispatch) => {

  firebaseRequest.addAnActivity(activityToAdd, (err, activity) => {
    if (err) return callback ? callback(err) : false;
    dispatch(addActivity(activity));
    if(callback) callback(null,true);
  });
};

/**
* This function update an activity to API server
**/
export const updateActivityServer = (activityToUp, callback) => (dispatch) => {

  firebaseRequest.updateActivity(activityToUp, (err) => {
    if (err) return callback ? callback(err) : false;
    dispatch(changeActivity(activityToUp));
    if(callback) callback(null,true);
  });
};

/**
* This function remove an activity to API server
**/
export const removeActivityFromServer = (activity, callback) => (dispatch) => {

  firebaseRequest.deleteActivity(activity, (err) => {
    if (err) return callback ? callback(err) : false;
    dispatch(removeActivity(activity));
    if(callback) callback(null,true);
  });
};

/**
* This function get goals from API server
*/
export const fetchGoal = (callback) => (dispatch) => {
  //TODO change fetch to goal specific fetching field
  dispatch({
    type: constants.FETCH_ACTIVITY
  });

  firebaseRequest.getAllGoal((err, goals) => {
    if (err) return callback ? callback(err) : false;
    dispatch(replaceGoals(goals));
    if(callback) callback(null,true);
    return true;
  });
};

/**
* This function add a goal to API server
**/
export const addGoalToServer = (goalToAdd, callback) => (dispatch) => {

  firebaseRequest.addAGoal(goalToAdd, (err, goalToAdd) => {
    if (err) return callback ? callback(err) : false;
    dispatch(addGoal(goalToAdd));
    if(callback) callback(null,true);
  });

};

/**
* This function remove a goal to API server
**/
export const removeGoalFromServer = (goal, callback) => (dispatch) => {

  firebaseRequest.deleteGoal(goal, (err) => {
    if (err) return callback ? callback(err) : false;
    dispatch(removeGoal(goal));
    if(callback) callback(null,true);
  });

};

/**
* This function get sports from API server
**/
export const fetchSport = (callback) => (dispatch) => {

  dispatch({
    type: constants.FETCH_ACTIVITY
  });

  firebaseRequest.getAllSport((err, sports) => {
    if (err) return callback ? callback(err) : false;
    dispatch(replaceSports(sports));
    if(callback) callback(null,true);
    return true;
  });

};

/**
* This function get goaltypes from API server
**/
export const fetchGoaltype = (callback) => (dispatch) => {

  dispatch({
    type: constants.FETCH_ACTIVITY
  });

  firebaseRequest.getAllGoaltype((err, goaltypes) => {
    if (err) return callback ? callback(err) : false;
    dispatch(replaceGoaltypes(goaltypes));
    if(callback) callback(null,true);
    return true;
  });

};
