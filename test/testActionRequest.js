import * as Actions from '../src/actions/actionsOut';
import storeFactory from '../src/store';
import constants from '../src/store/constants';
import initialState from './initialState';
let chai = require('chai');
var expect = chai.expect;
import firebaseConfig from '../firebaseConfig';

if(process.env.TEST_REQUEST == 'true') {


  firebaseConfig();

  var store;

  // Test on Activity -------------------------------------------------------
  // describe('[Request User TEST]', () => {
  //   beforeEach(() => {
  //     store = storeFactory(initialState);
  //   });
  //
  //   /* Fetch Activities from API SERVER in the store*/
  //   it('it should have sign-in user from the server', function(done) {
  //
  //     this.timeout(6000);
  //
  //     const email = process.env.email_test;
  //     const password = process.env.password_test;
  //
  //     store.dispatch(Actions.signIn(email, password,(err)=>{
  //       if(err) done('Erreur sur l\'auth ',err);
  //
  //       const nextState = store.getState();
  //
  //       expect(nextState.user.email).to.equal(email);
  //       done();
  //     }));
  //
  //   });
  //
  // });



  // Test on Activity -------------------------------------------------------
  describe('[Request Activity TEST]', () => {
    beforeEach(() => {
      store = storeFactory();
    });

    /* Fetch Activities from API SERVER in the store*/
    it('it should have fetch activities from the server', function(done) {

      store.dispatch(Actions.fetchActivity((err)=>{
        if(err) done('Erreur sur le fetching ',err);

        const nextState = store.getState();

        // On part du principe que le serveur à des task TODO faire autrement
        expect(nextState.activities.length).to.not.equal(0);
        done();
      }));

    });

    var activityId; // For the next two test

    /* Post an activity to API SERVER and add it to the store */
    it('it should have add an activity to the server', function(done) {

      const tempActivity = {
        'name': 'TEST contre Federer',
        'date': '2017-08-29',
        'hour': '9',
        'duration': '2',
        'distance':  null,
        'description': 'Match avec Theo pour travailler le lift',
        'sport': 'Tennis',
        'activityType': 'competition',
        'status': false,
        'resultat': ''
      };

      store.dispatch(Actions.addActivityToServer(tempActivity, (err)=>{
        if(err) done('Erreur sur l\'ajout de l activity',err);

        const nextState = store.getState();

        activityId = nextState.activities[nextState.activities.length-1].id;

        expect(nextState.activities[nextState.activities.length-1]).to.deep.equal({
          ...tempActivity,
          id: activityId});

        expect(nextState.activities.length).to.not.equal(0);

        done();
      }));

    });

    /* Remove an activity to API SERVER and remove it from the store */
    it('it should have remove an activity from the server', function(done) {

      const tempActivity = {
        'id': activityId,
        'name': 'TEST contre Federer',
        'date': '2017-08-29',
        'hour': '9',
        'duration': '2',
        'distance':  null,
        'description': 'Match avec Theo pour travailler le lift',
        'sport': 'Tennis',
        'activityType': 'competition',
        'status': false,
        'resultat': ''
      };

      store.dispatch(Actions.removeActivityFromServer(tempActivity, (err)=>{
        if(err) done('Erreur sur la suppression de l activity',err);
        done();
      }));

    });

  });

  // Test on FETCHING ---------------------------------------------------
  describe('[Fetching TEST]', () => {
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    /* Turn on fetching in the store*/
    it('it should have turn on fetching', () => {
      const expectedAction = {
        type: constants.FETCH_ACTIVITY,
      };

      const previousState = store.getState();
      store.dispatch(expectedAction);
      const nextState = store.getState();
      expect(nextState.fetching).to.not.equal(previousState.fetching);

      expect(store.getState().fetching).to.equal(true);

    });

    /* Turn off fetching in the store*/
    it('it should have turn off fetching', () => {

      const fetchAction = {
        type: constants.FETCH_ACTIVITY,
      };

      const cancelFetchAction = {
        type: constants.CANCEL_FETCHING,
      };

      // Turn on first
      store.dispatch(fetchAction);

      const previousState = store.getState();
      store.dispatch(cancelFetchAction);
      const nextState = store.getState();

      expect(nextState.fetching).to.not.equal(previousState.fetching);

      expect(store.getState().fetching).to.equal(false);

    });

  //TODO add a test to test fething on/off while fetching activity
  });


  // Test on goal -------------------------------------------------------
  describe('[Goal TEST]', () => {
    beforeEach(() => {
      store = storeFactory();
    });

    /* Fetch goals from API SERVER in the store*/
    it('it should have fetch goals from the server', function(done) {

      this.timeout(10000);

      store.dispatch(Actions.fetchGoal((err)=>{
        if(err) done('Erreur sur le fetching des Goal',err);

        const nextState = store.getState();

        // On part du principe que le serveur à des task TODO faire autrement
        expect(nextState.goals.length).to.not.equal(0);
        done();
      }));

    });

    var goalId;

    /* Post a goal to API SERVER and add it to the store */
    it('it should have add a goal to the server', function(done) {

      const testGoal = {
        'name': 'Test post',
        'startingdate': '2017-08-01',
        'deadline': '2017-09-10',
        'sport': 'tennis',
        'target': '14',// Field change
        'goaltype': '2'
      };

      store.dispatch(Actions.addGoalToServer(testGoal, (err)=>{
        if(err) done('Erreur sur l\'ajout du Goal',err);

        const nextState = store.getState();

        goalId = nextState.goals[nextState.goals.length-1].id;

        expect(nextState.goals[nextState.goals.length-1]).to.deep.equal({
          ...testGoal,
          id: goalId});

        expect(nextState.goals.length).to.not.equal(0);

        //Delete our test goal

        done();
      }));

    });

    /* Remove a goal to API SERVER and add it to the store */
    it('it should have remove a goal from the server', function(done) {

      const testGoal = {
        'id': goalId,
        'name': 'Test post',
        'startingdate': '2017-08-01',
        'deadline': '2017-09-10',
        'sport': 'tennis',
        'target': '14',// Field change
        'goaltype': '2'
      };

      store.dispatch(Actions.removeGoalFromServer(testGoal, (err)=>{
        if(err) done('Erreur sur la suppression du Goal',err);
        done();
      }));

    });

    /* Fetch goaltypes from API SERVER in the store*/
    it('it should have fetch goaltypes from the server', function(done) {

      this.timeout(10000);

      store.dispatch(Actions.fetchGoaltype((err)=>{
        if(err) done('Erreur sur le fetching des Goaltypes',err);

        const nextState = store.getState();

        // On part du principe que le serveur à des task TODO faire autrement
        expect(nextState.goaltypes.length).to.not.equal(0);
        done();
      }));

    });

  });

  // Test on sport -------------------------------------------------------
  describe('[Sport TEST]', () => {
    beforeEach(() => {
      store = storeFactory();
    });

    /* Fetch sports from API SERVER in the store*/
    it('it should have fetch sports from the server', function(done) {

      this.timeout(10000);

      store.dispatch(Actions.fetchSport((err)=>{
        if(err) done('Erreur sur le fetching des Goal',err);

        const nextState = store.getState();

        // On part du principe que le serveur à des task TODO faire autrement
        expect(nextState.sports.length).to.not.equal(0);
        done();
      }));

    });

  });

}
else{
  console.log('No action-request tests asks');
}
