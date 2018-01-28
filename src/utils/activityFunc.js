/* This file gather functions to manipulate activities */
import moment from 'moment';


/**
* [Unused] This function return the number of activites done
**/
export const getActivityDonePerc = (activityList) => {

  if( !activityList || activityList.length == 0 ) return 0;

  let nbDone = activityList.reduce( (nbDone, activity) => {
    if(activity.status == true) return nbDone + 1;
    return nbDone;
  }, 0);

  return Math.round(nbDone*100/activityList.length);
};

/**
* This function returns if an activity belongs to a goal depending on his date
**/
export const isWithinGoal = (activity, goal) => {
  if( !activity || !goal ) return 0;

  const activityDate = moment(activity.date);
  const goalStartDate = moment(goal.startingdate);
  const goalDeadline = moment(goal.deadline);

  if(
    ( activityDate.isAfter(goalStartDate, 'day') && activityDate.isBefore(goalDeadline, 'day') )
    ||
    (activityDate.isSame(goalStartDate, 'day') )
    ||
    (activityDate.isSame(goalDeadline, 'day') )
  ){
    return true;
  }

  return false;
};

/**
* This function return the activities done which match the goal in parameters
**/
export const getActivityDoneByGoal = (activityList, goal) => {
  if(!activityList || !goal) return null;

  return activityList.filter( (activity) => {
    if(( activity.activityType == 'distance' && goal.goaltype == 1 && activity.sport == goal.sport)
    ||
    (activity.activityType == 'duration' && goal.goaltype == 0 && activity.sport == goal.sport)
    ||
    (goal.goaltype != 0 && goal.goaltype != 1 && activity.sport == goal.sport)
    &&
    (isWithinGoal(activity, goal))
    &&
    activity.status == true
    ){
      return true;
    }
  });
};

/**
* This function return the progress of goal depends of activities done
**/
export const getProgressByGoalType = (activityList, goal) => {

  if(!goal || goal === null) return 0;

  const activitiesDone = getActivityDoneByGoal(activityList, goal);

  if(!activitiesDone || activitiesDone === null) return 0;

  let goalPerc = 0;

  switch(goal.goaltype){
  case 0: // Duration
    goalPerc = Math.round(activitiesDone.reduce((acc, activity) => {
      if(activity.duration === null) return 0;
      return acc+(+activity.duration);
    },0)
    /goal.target*100);
    break;
  case 1: // Distance
    goalPerc = Math.round( activitiesDone.reduce((acc, activity) => {
      if(activity.distance === null) return 0;
      return acc+(+activity.distance);
    },0)
    /goal.target*100);
    break;
  default:
    goalPerc = Math.round(activitiesDone.length/goal.target*100);
  }

  return goalPerc > 100 ? 100 : goalPerc;
};

/**
* This function return the sport time of all its activities
**/
export const getSportTime = (activityList, sport) => {
  if( !activityList ) return 0;

  return activityList.reduce( (acc, activity) => {
    if( !activity.duration || activity.duration == null)
    {
      return acc;
    }
    if (sport != null && sport.label != activity.sport){
      return acc;
    }

    return acc + parseFloat(activity.duration);
  }, 0);

};

/**
* This function return the sport distance covered by all its activites
**/
export const getSportDistance = (activityList, sport) => {
  if( !activityList ) return 0;

  return activityList.reduce( (acc, activity) => {
    if (activity.distance == null ) return acc;
    if (sport != null && activity.sport != sport.label) return acc;
    return acc + +activity.distance;
  }, 0);

};

/**
* This function return activities within the dates in parameter
**/

export const getActivityInterval = (activityList, startingdate, deadline) => {
  if (!activityList) return [];

  return activityList.filter( (activity) => {
    const activityDate = moment(activity.date, 'YYYY-MM-DD');

    return (
      (activityDate.isAfter(startingdate, 'day') && activityDate.isBefore(deadline, 'day'))
    ||
      (activityDate.isSame(startingdate, 'day') || activityDate.isSame(deadline, 'day'))
    );

  });
};
