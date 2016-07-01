import React from 'react';
import TodoList from './TodoList';
import { Range } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './TodoLists.pcss';

const TodoLists = props => {
  const { onRemove, onMove, todos } = props;

  return (
    <div className={styles.root}>
    {Range(0, 3).map(category => (
      <TodoList
        key={category}
        category={category}
        onRemove={onRemove}
        onMove={onMove}
        todos={todos.sortBy(todo => todo.text)}
      />
    ))}
    </div>
    );
};

TodoLists.propTypes = {
  todos: ImmutablePropTypes.list.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  onMove: React.PropTypes.func.isRequired,
};

export default TodoLists;
