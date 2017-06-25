import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes';
import history from './history';


console.log('Je vais render dude');

ReactDom.render(
  <BrowserRouter history={history}>{AppRoutes()}</BrowserRouter>,
  document.getElementById('root')
);
