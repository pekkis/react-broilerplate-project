// @flow

import React from 'react';
import Inspector from 'react-inspector';
import { List } from 'immutable';
import Todo from './Todo';
import styles from './TodoList.pcss';

type Props = {
  todos: List<Object>,
  onRemove: () => void,
  onMove: () => void,
  category: string
};

const TodoList = ({ todos, onRemove, category, onMove }: Props): React.Element<any> => (
  <div className={styles.root}>
    <Inspector data={todos} />
    <div className={styles.inner}>
      <h2>{todos.count()} todos in category {category}</h2>
      <ul>
        {todos.map((todo: Object): React.Element<any> => (
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

export default TodoList;
