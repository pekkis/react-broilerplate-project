// @flow

import React from 'react';
import Inspector from 'react-inspector';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Todo from './Todo';
import styles from './TodoList.pcss';

type Props = {
  todos: List<TodoType>,
  onRemove: () => void,
  onMove: () => void,
  category: string
};

const TodoList = ({ todos, onRemove, category, onMove }: Props): React.Element<any> => (
  <div className={styles.root}>
    <div className={styles.inner}>
      <h2>{todos.count()} todos in category {category}</h2>
      <ul>
        {todos.map((todo: TodoType): React.Element<any> => (
          <Todo
            key={todo.id}
            onRemove={onRemove}
            onMove={onMove}
            todo={todo}
          />
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: ImmutablePropTypes.list.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  onMove: React.PropTypes.func.isRequired,
  category: React.PropTypes.string.isRequired,
};

export default TodoList;
