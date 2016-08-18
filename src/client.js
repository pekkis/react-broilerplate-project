import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { createStore } from '@dr-kobros/react-broilerplate/lib/redux';
import { createApp } from '@dr-kobros/react-broilerplate/lib/app';
import * as reducers from './reducers';
import AppRouter from './AppRouter';

const { store, history } = createStore(reducers, browserHistory);

const router = (
  <AppRouter store={store} history={history} />
);

const app = createApp(store, history, router);

ReactDOM.render(
    app,
    document.getElementById('app')
);

