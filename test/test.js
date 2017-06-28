process.env.NODE_ENV = 'test';

import * as Actions from '../src/actions/actions';
import storeFactory from '../src/store';
import constants from '../src/store/constants';
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
    store = storeFactory();
  });


  /* Add a task in the store*/
  it('it should have add a task', () => {

    const tempTask = {
      'name': 'la task test',
      'description': 'je suis une task pour le test, check moi si t\'es cap',
      'type': 'Test',
      'day': '1',
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
  });

  /* Remove a task in the store*/
  it('it should have remove task', () => {

    const tempTask = {
      'name': 'la task test',
      'description': 'je suis une task pour le test, check moi si t\'es cap',
      'type': 'Test',
      'day': '1',
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

    const previousState = store.getState();
    store.dispatch(actual);
    const nextState = store.getState();

    expect(nextState.tasks.length).to.equal(previousState.tasks.length-1);
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
      'day': '1',
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

    expect(nextState.tasks[0]).to.deep.equal(tempTask);
  });

  /* Uncheck a task in the store*/
  it('it should have unchecked a task', () => {

    const tempTask = {
      'name': 'la task test',
      'description': 'je suis une task pour le test, check moi si t\'es cap',
      'type': 'Test',
      'day': '1',
      'status': 'false'
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

    expect(nextState.tasks[0]).to.deep.equal(tempTask);
  });


});
