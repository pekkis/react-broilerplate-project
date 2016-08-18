// @flow

import axios from 'axios';
import { List } from 'immutable';
import type { TodoService } from './todo-service';

const service: TodoService = {

  get: (): Promise<List<TodoItem>> => (
    axios
      .get('http://localhost:8888/api/todo')
      .then(response => response.data)
  ),

  save: (todos: List<TodoItem>) => (
    axios.post('http://localhost:8888/api/todo', todos)
  ),
};

export default service;
