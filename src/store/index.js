import appReducer from './reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const consoleMessages = store => next => action => {
  let result;

  result = next(action);

  if( process.env.NODE_ENV !== 'test'){
    console.groupCollapsed(`Dispatching action => ${action.type}`);



    let {user, activities, goals} = store.getState();

    console.log(`
        user: ${user.pseudo}
        Activities: ${(activities) ? activities.length :0}
    `);

    console.log(activities);
    console.log(goals);

    console.groupEnd();

  }

  return result;
};

export default (initialState={}) => {
  return applyMiddleware(thunk, consoleMessages) (createStore) (appReducer, initialState);
};
