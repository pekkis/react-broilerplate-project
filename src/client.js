import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { createStore } from '@dr-kobros/react-broilerplate/lib/redux';
import * as reducers from './ducks';
import Root from './Root';
import { AppContainer } from 'react-hot-loader';
import promiseMiddleware from 'redux-promise-middleware';
import config from '../config.client';
import socketIoMiddleware from './redux/socket-io';

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

const { store, history } = createStore(
  reducers,
  browserHistory,
  [
      promiseMiddleware(),
      logger,
      socketIoMiddleware(config.socketIo),
  ]
);

const root = document.getElementById('app');

render(
  <AppContainer>
    <Root store={store} history={history} isInitial={true} />
  </AppContainer>,
  root
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const Root = require('./Root').default;
    render(
      <AppContainer>
        <Root store={store} history={history} isInitial={false} />
      </AppContainer>,
      root
    );
  });
}
