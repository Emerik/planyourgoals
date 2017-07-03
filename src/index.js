import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes';
import history from './history';
import sampleData from './initialState';
import storeFactory from './store';
import { Provider } from 'react-redux';

const initialState = sampleData;

const store = storeFactory(initialState);

store.dispatch({
  type: 'SET_USER',
  payload: {
    'email': 'emerik@federemerik.fr',
    'pseudo': 'Jack',
    'token': '2016-12-7'
  }
});



ReactDom.render(
  <Provider store={store}>
    <BrowserRouter history={history}>{AppRoutes()}</BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
