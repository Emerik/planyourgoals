import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes';
import history from './history';
import storeFactory from './store';
import { Provider } from 'react-redux';
import { configFirebase } from '../config';

const store = storeFactory();

/*store.dispatch({
  type: 'SET_USER',
  payload: {
    'email': 'emerik@federemerik.fr',
    'pseudo': 'Jack',
    'token': '2016-12-7'
  }
});*/

// Create a Firebase Instance
configFirebase();

console.log('Render REACT comp start');

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter history={history}>{AppRoutes()}</BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
