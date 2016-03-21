import uuid from 'node-uuid';
import { createServer } from '@dr-kobros/react-broilerplate-server-express/lib/server';
import config from '../config.server';
import webpackConfig from '../webpack.config.babel';
import bodyParser from 'body-parser';
import { List } from 'immutable';

createServer(config, webpackConfig, (app) => {
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
});

