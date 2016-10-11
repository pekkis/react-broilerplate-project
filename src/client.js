import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { createStore } from './broilerplate-util/redux';
import * as reducers from './ducks';
import Root from './Root';
import { AppContainer } from 'react-hot-loader';
import promiseMiddleware from 'redux-promise-middleware';

const { store, history } = createStore(
  reducers,
  browserHistory,
  [
      promiseMiddleware(),
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
