import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Inspector from 'react-inspector';
import Todo from './Todo';
import styles from './TodoList.pcss';

const TodoList = ({ todos, onRemove, category, onMove }) => (
  <div className={styles.root}>
    <Inspector data={todos} />
    <div className={styles.inner}>
      <h2>{todos.count()} todos in category {category}</h2>
      <ul>
        {todos.map(todo => (
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
