// @flow

import { List } from 'immutable';
import type { TodoService } from './todo-service';

const service: TodoService = {

  get: (): Promise<List<TodoItem>> => {
    const todos = JSON.parse(window.localStorage.getItem('todos')) || [];
    return Promise.resolve(todos);
  },

  save: (todos: List<TodoItem>) => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
    return Promise.resolve('ok');
  },
};
