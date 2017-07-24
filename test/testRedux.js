process.env.NODE_ENV = 'test';

import * as Actions from '../src/actions/actions';
import storeFactory from '../src/store';
import constants from '../src/store/constants';
import initialState from './initialState';
let chai = require('chai');
var expect = chai.expect;


// Test on user -------------------------------------------------------
describe('[User TEST]', () => {
  beforeEach(() => { //Before each test we empty the database

  });


  /* Add a user in the store*/
  it('it should have set a user', () => {

    const tempUser = {
      'email': 'emerik@federemerik.fr',
      'pseudo': 'Emerik',
      'token': '2016-12-7'
    };

    const expectedAction = {
      type: constants.SET_USER,
      payload: tempUser
    };

    const actual = Actions.setUser(tempUser);

    expect(actual).to.deep.equal(expectedAction);

    const store = storeFactory();

    store.dispatch(Actions.setUser(tempUser));

    const nextState = store.getState();

    expect(nextState.user).to.deep.equal(tempUser);
  });

  /* Remove the user in the store*/
  it('it should have remove user', () => {

    const tempUser = {
      'email': 'emerik@federemerik.fr',
      'pseudo': 'Emerik',
      'token': '2016-12-7'
    };

    const expectedAction = {
      type: constants.REMOVE_USER,
    };

    const actual = Actions.removeUser();

    expect(actual).to.deep.equal(expectedAction);

    const store = storeFactory();

    // Add a sample user
    store.dispatch(Actions.setUser(tempUser));

    // Remove the user from the store
    store.dispatch(Actions.removeUser());
    let nextState = store.getState();

    expect(nextState.user).to.deep.equal({});

    store.dispatch(Actions.removeUser());
    nextState = store.getState();

    expect(nextState.user).to.deep.equal({});
  });


});


var store;
// Test on Activity -------------------------------------------------------
describe('[Activity TEST]', () => {
  beforeEach(() => { //Before each test we empty the database
    store = storeFactory(initialState);
  });


  /* Add an Activity in the store*/
  it('it should have add an activity', () => {

    const tempActivity = {
      'name': 'l\'activity test',
      'description': 'je suis une activity pour le test, check moi si t\'es cap',
      'goal': 'Test',
      'date': '01/01/2017',
      'duration': '2',
      'status': 'false'
    };

    const expectedAction = {
      type: constants.ADD_ACTIVITY,
      payload: tempActivity
    };

    const actual = Actions.addActivity(tempActivity);

    expect(actual).to.deep.equal(expectedAction);

    const previousState = store.getState();
    store.dispatch(actual);
    const nextState = store.getState();

    expect(nextState.activities.length).to.equal(previousState.activities.length+1);

    expect(nextState.activities[nextState.activities.length-1]).to.deep.equal(tempActivity);
  });

  /* Remove a Activity in the store*/
  it('it should have remove activity', () => {

    const tempActivity = {
      'name': 'la activity test',
      'description': 'je suis une activity pour le test, check moi si t\'es cap',
      'goal': 'Test',
      'date': '01/01/2017',
      'duration': '2',
      'status': 'false'
    };

    const tempActivity2 = {
      'name': 'la activity test 2',
      'description': 'je suis une Activity pour le test, check moi si t\'es cap',
      'goal': 'Test',
      'date': '02/01/2017',
      'duration': '2',
      'status': 'false'
    };

    const expectedAction = {
      type: constants.REMOVE_ACTIVITY,
      payload: tempActivity
    };

    const actual = Actions.removeActivity(tempActivity);

    expect(actual).to.deep.equal(expectedAction);

    //Add our temporay Activity
    store.dispatch(Actions.addActivity(tempActivity));
    store.dispatch(Actions.addActivity(tempActivity2));

    let previousState = store.getState();
    store.dispatch(actual);
    let nextState = store.getState();
    expect(nextState.activities.length).to.equal(previousState.activities.length-1);

    previousState = store.getState();
    store.dispatch(actual);
    nextState = store.getState();
    expect(nextState.activities.length).to.equal(previousState.activities.length);
  });

  /* Remove all the activities in the store*/
  it('it should have remove all the Activity', () => {


    const expectedAction = {
      type: constants.CLEAR_ACTIVITY,
    };

    const actual = Actions.clearActivity();

    expect(actual).to.deep.equal(expectedAction);

    //Add our temporay Activity
    store.dispatch(actual);

    const nextState = store.getState();

    expect(nextState.activities.length).to.equal(0);
  });

  /* Check a Activity in the store*/
  it('it should have checked a Activity', () => {

    const tempActivity = {
      'name': 'la Activity test',
      'description': 'je suis une Activity pour le test, check moi si t\'es cap',
      'goal': 'Test',
      'date': '01/01/2017',
      'duration': '2',
      'status': 'false'
    };

    const expectedAction = {
      type: constants.CHECK_ACTIVITY,
      payload: tempActivity
    };

    const actual = Actions.checkActivity(tempActivity);

    expect(actual).to.deep.equal(expectedAction);

    //Add our temporay Activity
    store.dispatch(Actions.addActivity(tempActivity));

    store.dispatch(actual);
    const nextState = store.getState();

    expect(nextState.activities[nextState.activities.length-1]).to.deep.not.equal(tempActivity);

    tempActivity.status = true;
    expect(nextState.activities[nextState.activities.length-1]).to.deep.equal(tempActivity);

  });

  /* Uncheck a Activity in the store*/
  it('it should have unchecked a Activity', () => {

    const tempActivity = {
      'name': 'la Activity test',
      'description': 'je suis une Activity pour le test, check moi si t\'es cap',
      'goal': 'Test',
      'date': '01/01/2017',
      'duration': '2',
      'status': 'true'
    };

    const expectedAction = {
      type: constants.UNCHECK_ACTIVITY,
      payload: tempActivity
    };

    const actual = Actions.uncheckActivity(tempActivity);

    expect(actual).to.deep.equal(expectedAction);

    //Add our temporay Activity
    store.dispatch(Actions.addActivity(tempActivity));

    store.dispatch(actual);
    const nextState = store.getState();

    expect(nextState.activities[nextState.activities.length-1]).to.deep.not.equal(tempActivity);
    tempActivity.status = false;
    expect(nextState.activities[nextState.activities.length-1]).to.deep.equal(tempActivity);
  });


});




// Test on goal -------------------------------------------------------
describe('[Goal TEST]', () => {
  beforeEach(() => {
    store = storeFactory(initialState);
  });


  /* Add a goal in the store*/
  it('it should have add a goal', () => {

    const tempGoal = {
      'type': 'Test',
      'target': '12',
      'time': '24',
      'deadline': '2017/07/31'
    };

    const expectedAction = {
      type: constants.ADD_GOAL,
      payload: tempGoal
    };

    const actual = Actions.addGoal(tempGoal);

    expect(actual).to.deep.equal(expectedAction);

    const previousState = store.getState();
    store.dispatch(actual);
    const nextState = store.getState();

    expect(nextState.goals.length).to.equal(previousState.goals.length+1);

    expect(nextState.goals[nextState.goals.length-1]).to.deep.equal(tempGoal);
  });

  /* Remove a goal in the store*/
  it('it should have remove goal', () => {

    const tempGoal = {
      'type': 'Test',
      'target': '12',
      'time': '24',
      'deadline': '2017/07/31'
    };

    const expectedAction = {
      type: constants.REMOVE_GOAL,
      payload: tempGoal
    };

    const actual = Actions.removeGoal(tempGoal);

    expect(actual).to.deep.equal(expectedAction);

    //Add our temporay goal
    store.dispatch(Actions.addGoal(tempGoal));

    // Test to remove a goal
    let previousState = store.getState();
    store.dispatch(actual);
    let nextState = store.getState();
    expect(nextState.goals.length).to.equal(previousState.goals.length-1);

    // Test to remvoe a goal which not exist
    previousState = store.getState();
    store.dispatch(actual);
    nextState = store.getState();
    expect(nextState.goals.length).to.equal(previousState.goals.length);
  });

  /* Remove all the goals in the store*/
  it('it should have remove all the goals', () => {

    // test on action
    const expectedAction = {
      type: constants.CLEAR_GOAL,
    };

    const actual = Actions.clearGoal();

    expect(actual).to.deep.equal(expectedAction);


    // test on state/reducer
    store.dispatch(actual);
    const nextState = store.getState();

    expect(nextState.goals.length).to.equal(0);
  });

  /* Change a goal in the store*/
  it('it should have changed a goal', () => {

    const tempGoal = {
      'type': 'Test',
      'target': '12',
      'time': '24',
      'deadline': '2017/07/31'
    };

    const tempGoalNew = {
      'type': 'Test',
      'target': '14',// Field change
      'time': '24',
      'deadline': '2017/07/31'
    };

    const expectedAction = {
      type: constants.SET_GOAL,
      payload: tempGoal,
      newgoal: tempGoalNew
    };

    const actual = Actions.setGoal(tempGoal, tempGoalNew);

    expect(actual).to.deep.equal(expectedAction);

    //Add our temporay goal
    store.dispatch(Actions.addGoal(tempGoal));


    store.dispatch(actual);
    const nextState = store.getState();
    expect(nextState.goals[nextState.goals.length-1]).to.deep.not.equal(tempGoal);

    expect(nextState.goals[nextState.goals.length-1]).to.deep.equal(tempGoalNew);

  });

});

// Test on Type
describe('[Type TEST]', () => {
  beforeEach(() => {
    store = storeFactory(initialState);
  });


  /* Change the types in the store*/
  it('it should have change the types', () => {

    const tempTypes = [
      'Normal',
      'Code'
    ];

    const expectedAction = {
      type: constants.CHANGE_TYPES,
      payload: tempTypes
    };

    const testAction = Actions.changeTypes(tempTypes);

    expect(testAction).to.deep.equal(expectedAction);

    store.dispatch(testAction);

    const nextState = store.getState();

    expect(nextState.types).to.deep.equal(tempTypes);
  });

  /* Clear the types in the store*/
  it('it should have clear the types', () => {

    const expectedAction = {
      type: constants.CLEAR_TYPES,
    };

    const testAction = Actions.clearTypes();

    expect(testAction).to.deep.equal(expectedAction);


    // Remove the types from the store
    store.dispatch(testAction);
    let nextState = store.getState();

    expect(nextState.types).to.deep.equal([]);

  });


});
