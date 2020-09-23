import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import queryString from 'query-string';
import {BrowserRouter, Route, Link, NavLink, Switch} from 'react-router-dom';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
