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
// Test on task -------------------------------------------------------
describe('[Task TEST]', () => {
  beforeEach(() => { //Before each test we empty the database
    store = storeFactory(initialState);
  });


  /* Add a task in the store*/
  it('it should have add a task', () => {

    const tempTask = {
      'name': 'la task test',
      'description': 'je suis une task pour le test, check moi si t\'es cap',
      'type': 'Test',
      'date': '01/01/2017',
      'duration': '2',
      'status': 'false'
    };

    const expectedAction = {
      type: constants.ADD_TASK,
      payload: tempTask
    };

    const actual = Actions.addTask(tempTask);

    expect(actual).to.deep.equal(expectedAction);

    const previousState = store.getState();
    store.dispatch(actual);
    const nextState = store.getState();

    expect(nextState.tasks.length).to.equal(previousState.tasks.length+1);

    expect(nextState.tasks[nextState.tasks.length-1]).to.deep.equal(tempTask);
  });

  /* Remove a task in the store*/
  it('it should have remove task', () => {

    const tempTask = {
      'name': 'la task test',
      'description': 'je suis une task pour le test, check moi si t\'es cap',
      'type': 'Test',
      'date': '01/01/2017',
      'duration': '2',
      'status': 'false'
    };

    const tempTask2 = {
      'name': 'la task test 2',
      'description': 'je suis une task pour le test, check moi si t\'es cap',
      'type': 'Test',
      'date': '02/01/2017',
      'duration': '2',
      'status': 'false'
    };

    const expectedAction = {
      type: constants.REMOVE_TASK,
      payload: tempTask
    };

    const actual = Actions.removeTask(tempTask);

    expect(actual).to.deep.equal(expectedAction);

    //Add our temporay task
    store.dispatch(Actions.addTask(tempTask));
    store.dispatch(Actions.addTask(tempTask2));

    let previousState = store.getState();
    store.dispatch(actual);
    let nextState = store.getState();
    expect(nextState.tasks.length).to.equal(previousState.tasks.length-1);

    previousState = store.getState();
    store.dispatch(actual);
    nextState = store.getState();
    expect(nextState.tasks.length).to.equal(previousState.tasks.length);
  });

  /* Remove all the tasks in the store*/
  it('it should have remove all the task', () => {


    const expectedAction = {
      type: constants.CLEAR_TASK,
    };

    const actual = Actions.clearTask();

    expect(actual).to.deep.equal(expectedAction);

    //Add our temporay task
    store.dispatch(actual);

    const nextState = store.getState();

    expect(nextState.tasks.length).to.equal(0);
  });

  /* Check a task in the store*/
  it('it should have checked a task', () => {

    const tempTask = {
      'name': 'la task test',
      'description': 'je suis une task pour le test, check moi si t\'es cap',
      'type': 'Test',
      'date': '01/01/2017',
      'duration': '2',
      'status': 'false'
    };

    const expectedAction = {
      type: constants.CHECK_TASK,
      payload: tempTask
    };

    const actual = Actions.checkTask(tempTask);

    expect(actual).to.deep.equal(expectedAction);

    //Add our temporay task
    store.dispatch(Actions.addTask(tempTask));

    store.dispatch(actual);
    const nextState = store.getState();

    expect(nextState.tasks[nextState.tasks.length-1]).to.deep.not.equal(tempTask);

    tempTask.status = true;
    expect(nextState.tasks[nextState.tasks.length-1]).to.deep.equal(tempTask);

  });

  /* Uncheck a task in the store*/
  it('it should have unchecked a task', () => {

    const tempTask = {
      'name': 'la task test',
      'description': 'je suis une task pour le test, check moi si t\'es cap',
      'type': 'Test',
      'date': '01/01/2017',
      'duration': '2',
      'status': 'true'
    };

    const expectedAction = {
      type: constants.UNCHECK_TASK,
      payload: tempTask
    };

    const actual = Actions.uncheckTask(tempTask);

    expect(actual).to.deep.equal(expectedAction);

    //Add our temporay task
    store.dispatch(Actions.addTask(tempTask));

    store.dispatch(actual);
    const nextState = store.getState();

    expect(nextState.tasks[nextState.tasks.length-1]).to.deep.not.equal(tempTask);
    tempTask.status = false;
    expect(nextState.tasks[nextState.tasks.length-1]).to.deep.equal(tempTask);
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
      'number': '12',
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
      'number': '12',
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
      'number': '12',
      'time': '24',
      'deadline': '2017/07/31'
    };

    const tempGoalNew = {
      'type': 'Test',
      'number': '14',// Field change
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
