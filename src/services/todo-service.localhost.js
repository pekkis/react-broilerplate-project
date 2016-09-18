// @flow

import axios from 'axios';
import { List } from 'immutable';
import type { TodoService } from './todo-service';
import config from '../../config.client';

const service: TodoService = {
  get: (): Promise<List<TodoItem>> => (
    axios
      .get(`${config.api}/api/todo`)
      .then((response: Object): Object => List(response.data))
  ),

  save: (todos: List<TodoItem>): Promise<any> => axios.post(`${config.api}/api/todo`, todos),
};

export default service;
