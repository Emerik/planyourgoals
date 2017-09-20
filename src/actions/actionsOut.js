import constants from '../store/constants';
import fetch from 'isomorphic-fetch';
import { configApi } from '../../config';
import { replaceActivities, addActivity, changeActivity, removeActivity,
  replaceGoals, addGoal, removeGoal } from './actions';


/**
* This function get activities from API server
**/
export const fetchActivity = (callback) => (dispatch) => {

  dispatch({
    type: constants.FETCH_ACTIVITY
  });
  fetch(configApi.apiUrl+'/api/activities')
    .then( result => result.json())
    .then( resultJSON => {
      dispatch(replaceActivities(resultJSON.activities));
      if (callback) callback(null, resultJSON);
    }
    )
    .catch(errorCatched => {
      //dispatch(addError(errorCatched));
      console.log(errorCatched);
      if (callback) callback('Error');
    });
};

/**
* This function add an activity to API server
**/
export const addActivityToServer = (activity, callback) => (dispatch) => {

  fetch(configApi.apiUrl+'/api/activity', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(activity)
  })
    .then( result => result.json())
    .then( resultJSON => {

      dispatch(addActivity({
        ...activity,
        id : resultJSON.activity.id
      }));
      if (callback) callback(null, resultJSON);
    }
    )
    .catch(errorCatched => {
      //dispatch(addError(errorCatched));
      console.log(errorCatched);
      if (callback) callback('Error');
    });
};

/**
* This function update an activity to API server
**/
export const updateActivityServer = (activity, callback) => (dispatch) => {

  fetch(configApi.apiUrl+'/api/activities/'+activity.id, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(activity)
  })
    .then( result => result.json())
    .then( resultJSON => {

      dispatch(changeActivity({
        id : resultJSON.activity.id,
        ...activity
      }));
      if (callback) callback(null, resultJSON);
    }
    )
    .catch(errorCatched => {
      //dispatch(addError(errorCatched));
      console.log(errorCatched);
      if (callback) callback('Error');
    });
};

/**
* This function remove an activity to API server
**/
export const removeActivityFromServer = (activity, callback) => (dispatch) => {
  console.log('start removing');
  fetch(configApi.apiUrl+'/api/activities/'+activity.id, {
    method: 'DELETE'
  })
    .then( result => result.json())
    .then( resultJSON => {

      dispatch(removeActivity(activity));
      if (callback) callback(null, resultJSON);
    }
    )
    .catch(errorCatched => {
      //dispatch(addError(errorCatched));
      console.log(errorCatched);
      if (callback) callback('Error');
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

  fetch(configApi.apiUrl+'/api/goals')
    .then( result => result.json())
    .then( resultJSON => {
      dispatch(replaceGoals(resultJSON.goals));
      if (callback) callback(null, resultJSON);
    }
    )
    .catch(errorCatched => {
      //dispatch(addError(errorCatched));
      console.log(errorCatched);
      if (callback) callback('Error');
    });
};

/**
* This function add a goal to API server
**/
export const addGoalToServer = (goal, callback) => (dispatch) => {

  fetch(configApi.apiUrl+'/api/goals', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(goal)
  })
    .then( result => result.json())
    .then( resultJSON => {

      dispatch(addGoal({
        ...goal,
        id : resultJSON.goal.id
      }));
      if (callback) callback(null, resultJSON);
    }
    )
    .catch(errorCatched => {
      //dispatch(addError(errorCatched));
      console.log(errorCatched);
      if (callback) callback('Error');
    });
};

/**
* This function remove a goal to API server
**/
export const removeGoalFromServer = (goal, callback) => (dispatch) => {

  fetch(configApi.apiUrl+'/api/goals/'+goal.id, {
    method: 'DELETE'
  })
    .then( result => result.json())
    .then( resultJSON => {

      dispatch(removeGoal(goal));
      if (callback) callback(null, resultJSON);
    }
    )
    .catch(errorCatched => {
      //dispatch(addError(errorCatched));
      console.log(errorCatched);
      if (callback) callback('Error');
    });
};
