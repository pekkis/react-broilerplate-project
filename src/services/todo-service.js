// @flow

import { List } from 'immutable';

export type TodoService = {
  get: () => Promise<List<TodoType>>,
  save: (todos: List<TodoType>) => Promise<any>,
};
