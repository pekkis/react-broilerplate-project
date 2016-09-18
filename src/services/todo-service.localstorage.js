// @flow

/* global window */

import { List } from 'immutable';
import type { TodoService } from './todo-service';

const service: TodoService = {

  get: (): Promise<List<TodoItem>> => {
    const todos = JSON.parse(window.localStorage.getItem('todos')) || [];
    return Promise.resolve(List(todos));
  },

  save: (todos: List<TodoItem>): Promise<string> => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
    return Promise.resolve('ok');
  },
};

export default service;
