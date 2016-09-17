import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { createStore } from '@dr-kobros/react-broilerplate/lib/redux';
import { createApp } from '@dr-kobros/react-broilerplate/lib/app';
import * as reducers from './reducers';
import AppRouter from './AppRouter';
const { store, history } = createStore(reducers, browserHistory);

const router = (
  <AppRouter store={store} history={history} />
);

const root = document.getElementById('app');
const app = createApp(store, history, router);

if (__DEVELOPMENT__) {
  const RedBox = require('redbox-react').default
  try {
    render(app, root);
  } catch (e) {
    render(<RedBox error={e} />, root);
  }
} else {
  render(app, root);
}
