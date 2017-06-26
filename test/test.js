import * as Actions from '../src/actions/actions';
import storeFactory from '../src/store';

let chai = require('chai');
var expect = chai.expect;

process.env.NODE_ENV = 'test';

//Our parent block
describe('User', () => {
    beforeEach(() => { //Before each test we empty the database

    });

  it('it should have add a user', () => {

    const tempUser = {
			"email": "emerik@federemerik.fr",
			"pseudo": "Emerik",
			"token": "2016-12-7"
		}

    const expectedAction = {
      type: 'SET_USER',
      payload: tempUser
    };

    const actual = Actions.setUser(tempUser);

    expect(actual).to.deep.equal(expectedAction);

    const store = storeFactory();

    store.dispatch(Actions.setUser(tempUser));

    const nextState = store.getState();

    expect(nextState.user).to.deep.equal(tempUser);
  });


});
