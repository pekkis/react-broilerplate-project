// @flow

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createFetchers from '@dr-kobros/react-broilerplate/lib/universal';
import { receiveTodos } from './ducks/todo';
import App from './components/container/AppContainer';
import IndexPage from './components/container/IndexPageContainer';
import TodoPage from './components/container/TodoPageContainer';

type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => Object;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;

type Store = {
  dispatch: Dispatch
};

type History = {

};

export default function AppRouter({ store, history }: { store: Store, history: History }) {
  const { prefetcher } = createFetchers(store);

  function initApp(nextState, replaceState, callback) {

    store.dispatch(receiveTodos()).then(() => {
      callback();
    });
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
    <Router history={history}>
      <Route path="/" component={App} onEnter={initApp}>
        <IndexRoute component={IndexPage} onEnter={prefetcher} />
        <Route path="todo/:uuid" component={TodoPage} />
      </Route>
    </Router>
  );
}

AppRouter.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
};
