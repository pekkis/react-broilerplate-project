import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { createStore } from '@dr-kobros/react-broilerplate/lib/redux';
import * as reducers from './ducks';
import Root from './Root';
import { AppContainer } from 'react-hot-loader';

const { store, history } = createStore(reducers, browserHistory);

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

// const app = createApp(store, history, router);

/*
if (__DEVELOPMENT__) {
  const RedBox = require('redbox-react').default
  try {
    render(
      router,
      root
    );
  } catch (e) {
    render(<RedBox error={e} />, root);
  }
} else {
  render(router, root);
}
*/
