// @flow

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { receiveTodos } from './ducks/todo';
import { Provider } from 'react-redux';
import App from './components/container/AppContainer';
import IndexPage from './pages/container/IndexPageContainer';
import TodoPage from './pages/container/TodoPageContainer';

type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => Object;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;

type Store = {
  dispatch: Dispatch
};

type History = {

};

export default function Root({ store, history, isInitial }: { store: Store, history: History, isInitial: Boolean }) {

  function initApp(nextState, replaceState) {

    // Hot reloading kludge, how to prevent dis?
    if (!isInitial) {
      return;
    }

    store.dispatch(receiveTodos());
  }

  /*
  function requiresLogin(nextState, replaceState) {
      const user = store.getState().user.get('user');

      if (user.anonymous) {
          replaceState(
              {
                  'next': nextState.location.pathname,
              },
              '/login'
          );
      }
  }
  */

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} onEnter={initApp}>
          <IndexRoute component={IndexPage} />
          <Route path="todo/:uuid" component={TodoPage} />
        </Route>
      </Router>
    </Provider>
  );
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
};
