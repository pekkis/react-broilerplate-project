import uuid from 'node-uuid';
import { createServer } from '@dr-kobros/react-broilerplate-server-express';
import bodyParser from 'body-parser';
import { List } from 'immutable';
import socketIo from 'socket.io';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import config from '../config.server';
import webpackConfig from '../webpack.config.babel';
import * as reducers from './ducks';
import { addUser, addMessage } from './ducks/chat';

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(promiseMiddleware())
);

const { payload: gaylord } = store.dispatch(
  addUser('gaylord', 'gaylord.lohiposki@dr-kobros.com')
);

store.dispatch(addMessage(gaylord.uuid, 'Yo yo, lets get this chat going'));

createServer(config, webpackConfig, (app, httpServer) => {

  const io = socketIo(httpServer);
  io.on('connection', socket => {

    socket.emit('action', {
      type: 'CHAT_SET_USERS',
      payload: store.getState().chat.get('users'),
    });

    socket.emit('action', {
      type: 'CHAT_SET_MESSAGES',
      payload: store.getState().chat.get('messages'),
    });
  });

  app.use(bodyParser.json());
  let todos = List.of(
    {
      id: uuid.v4(),
      text: 'Get 100 litres of battery acid',
      category: 0,
    },
    {
      id: uuid.v4(),
      text: 'Get gardening tools',
      category: 0,
    },
    {
      id: uuid.v4(),
      text: 'Carve up the "meat"',
      category: 0,
    },
    {
      id: uuid.v4(),
      text: 'Liquidate the pieces',
      category: 0,
    },
    {
      id: uuid.v4(),
      text: 'Dump the acid in the Danube',
      category: 1,
    }
  );

  app.get('/api/todo', (req, res) => {
    setTimeout(
      () => res.send(todos.toJS()),
      Math.random() * 300
    );
  });

  app.post('/api/todo', (req, res) => {
    todos = List(req.body);
    res.send(['ok']);
  });

  return Promise.resolve();
});
