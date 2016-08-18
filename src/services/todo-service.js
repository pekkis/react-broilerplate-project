// @flow

import { List } from 'immutable';

export type TodoService = {
  get: () => Promise<List<TodoItem>>,
  save: (todos: List<TodoItem>) => Promise<any>,
};
