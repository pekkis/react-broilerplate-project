import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { createStore } from '@dr-kobros/react-broilerplate/lib/redux';
import * as reducers from './ducks';
import Root from './Root';
import { AppContainer } from 'react-hot-loader';
import promiseMiddleware from 'redux-promise-middleware';
import socketIo from 'socket.io-client';
import config from '../config.client';

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
      logger
  ]
);

const root = document.getElementById('app');
const socket = socketIo(config.socketIo);

socket.on('connect', () => {
  console.log('connetto grandi');
});

socket.on('action', action => {
  store.dispatch(action);
  console.log(data);
});

socket.on('disconnect', () => {
  console.log('game over man');
});

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
