import appReducer from './reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const consoleMessages = store => next => action => {
  let result;

  result = next(action);

  if( process.env.NODE_ENV !== 'test'){
    console.groupCollapsed(`Dispatching action => ${action.type}`);



    let {user, tasks} = store.getState();

    console.log(`
        user: ${user.pseudo}
        Tasks: ${(tasks) ? tasks.length :0}
    `);

    console.log(tasks);

    console.groupEnd();

  }

  return result;
};

export default (initialState={}) => {
  return applyMiddleware(thunk, consoleMessages) (createStore) (appReducer, initialState);
};
