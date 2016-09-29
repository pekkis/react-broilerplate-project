import uuid from 'node-uuid';
import { createServer } from '@dr-kobros/react-broilerplate-server-express';
import bodyParser from 'body-parser';
import { List } from 'immutable';
import config from '../config.server';
import webpackConfig from '../webpack.config.babel';
import socketIo from 'socket.io';

createServer(config, webpackConfig, (app, httpServer) => {

  const gaylordUuid = uuid.v4();

  const io = socketIo(httpServer);
  io.on('connection', socket => {

    console.log('connetto grandi');

    socket.emit('action', {
      type: 'CHAT_MESSAGE',
      payload: {
        nick: 'Gaylord',
        gravatar: 'gaylord.lohiposki@dr-kobros.com',
        text: 'Hello hello, how may I help you?',
      },
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
