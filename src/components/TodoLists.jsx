import React from 'react';
import { Range } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TodoList from './TodoList';
import styles from './TodoLists.pcss';

const categoryNames = [
  'TODO',
  'DOING',
  'DONE',
];

const TodoLists = props => {
  const { onRemove, onMove, todos } = props;
  return (
    <div className={styles.root}>

    {Range(0, 3).map(category => (
      <TodoList
        key={category}
        category={categoryNames[category]}
        onRemove={onRemove}
        onMove={onMove}
        todos={todos.filter(todo => todo.category === category).sortBy(todo => todo.text)}
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
