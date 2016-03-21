import { List, Map } from 'immutable';

import {
  ADD_TODO,
  REMOVE_TODO,
  RECEIVE_TODOS,
  SAVE_TODOS,
  MOVE_TODO,
} from '../actions/todo-actions';

const defaultState = Map({
  todos: List(),
  isChanged: false,
});

export default function (state = defaultState, action) {
  switch (action.type) {

    case RECEIVE_TODOS:
      return state.update('todos', todos => todos.concat(action.payload));

    case ADD_TODO:
      return state
        .update('todos', todos => todos.push(action.payload))
        .set('isChanged', true);

    case REMOVE_TODO:
      return state
        .deleteIn([
          'todos',
          state.get('todos').findIndex(t => t.id === action.payload),
        ])
        .set('isChanged', true);

    case SAVE_TODOS:
      return state.set('isChanged', false);

    case MOVE_TODO:
      return state
      .updateIn(
        [
          'todos',
          state.get('todos').findIndex(t => t.id === action.payload.id),
        ], todo => ({
          ...todo,
          category: todo.category + action.payload.direction,
        })
      )
      .set('isChanged', true);

    default:
      return state;

  }
}
