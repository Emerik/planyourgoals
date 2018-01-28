process.env.NODE_ENV = 'test';

import * as utilFunc from '../src/utils/activityFunc';
import moment from 'moment';

let chai = require('chai');
var expect = chai.expect;


// Test on utility function -------------------------------------------------------
describe('[Utils Func TEST]', () => {

  let activity1, activity2, activity3, activity4;
  let activityList;

  let goal1;


  beforeEach(() => {
    activity1 = {
      'id': '0',
      'name': 'Match avec Julien',
      'date': '2017-08-27',
      'hour': '12',
      'duration': '3',
      'distance': null,
      'description': 'Match avec Julien pour travailler le lift',
      'sport': 'tennis',
      'activityType': 'trainingMatch',
      'status': true,
      'resultat': ''
    };

    activity2 = {
      'id': '1',
      'name': 'Gamme avec Antoine',
      'date': '2017-09-02',
      'hour': '10',
      'duration': '2',
      'distance': null,
      'description': 'Match avec Antoine pour travailler le lift',
      'sport': 'tennis',
      'activityType': 'gamme',
      'status': false,
      'resultat': 'Revers ok'
    };

    activity3 = {
      'id': '2',
      'name': 'Gamme avec Theo',
      'date': '2017-09-05',
      'hour': '10',
      'duration': '2',
      'distance': null,
      'description': 'Match avec Theo pour travailler le lift',
      'sport': 'tennis',
      'activityType': 'gamme',
      'status': true,
      'resultat': 'Bonne sensation en coup droit'
    };

    activity4 = {
      'id': '3',
      'name': 'Run avec Lorena',
      'date': '2017-10-05',
      'hour': '10',
      'duration': '1',
      'distance': 10,
      'description': '',
      'sport': 'running',
      'activityType': 'distance',
      'status': false,
      'resultat': ''
    };

    activityList = [activity1, activity2, activity3, activity4];

    goal1 = {
      'id': '0',
      'name': 'Objectif tennis',
      'startingdate': '2017-08-01',
      'deadline': '2017-08-30',
      'sport': 'tennis',
      'target': '6',
      'goaltype': 2
    };

  });


  /* Evaluate percentage activities done */
  it('it should have evaluate percentage of activities done', () => {

    const count = utilFunc.getActivityDonePerc(activityList);

    expect(count).to.equal(50);

  });

  /* Determine if activity belongs to goal*/
  it('it should determine if activity belongs or not to goal (date)', () => {

    const result = utilFunc.isWithinGoal(activity1, goal1);

    expect(result).to.equal(true);

    const result2 = utilFunc.isWithinGoal(activity2, goal1);

    expect(result2).to.equal(false);

  });


  /* Count activities done by a goal defined */
  it('it should have return activities done by a goal', () => {
    const activities = utilFunc.getActivityDoneByGoal(activityList, goal1);

    const activitiesCorrect = [activity1];

    expect(activities).to.deep.equal(activitiesCorrect);

  });


  /* Return goal progress */
  it('it should have return the goal progress depends of its type', () => {

    const progress = utilFunc.getProgressByGoalType(activityList, goal1);

    expect(progress).to.equal(17);

  });


  /* Return sport time of activities */
  it('it should have return the total sport time', () => {

    const time = utilFunc.getSportTime(activityList);

    expect(time).to.equal(8);

  });


  /* Return sport distance of activities */
  it('it should have return the total sport distance', () => {

    const distance = utilFunc.getSportDistance(activityList);

    expect(distance).to.equal(10);

  });


  /* Return activity in date interval */
  it('it should have return activity within interval', () => {
    const startingdate = moment('2017-09-01', 'YYYY-MM-DD');
    const deadline = moment('2017-09-30', 'YYYY-MM-DD');
    const listFiltered = utilFunc.getActivityInterval(activityList, startingdate, deadline);
    const correctList = [activity2, activity3];

    expect(listFiltered).to.deep.equal(correctList);

  });

});
