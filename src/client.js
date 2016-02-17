import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory as history } from 'react-router';
import { createStore } from '@dr-kobros/react-broilerplate/lib/redux';
import { createApp } from '@dr-kobros/react-broilerplate/lib/app';
import * as reducers from './reducers';
import { createRouter } from './router';

const store = createStore(reducers, history);

const router = createRouter({
    store,
    history
});

const app = createApp(store, history, router);

ReactDOM.render(
    app,
    document.getElementById('app')
);

