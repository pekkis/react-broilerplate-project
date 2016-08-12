import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Inspector from 'react-inspector';
import Todo from './Todo';
import styles from './TodoList.pcss';

const categoryNames = [
  'TODO',
  'DOING',
  'DONE',
];

const TodoList = ({ todos, onRemove, category, onMove }) => {
  const filtered = todos.filter(todo => todo.category === category);

  return (
    <div className={styles.root}>
      <Inspector data={todos} />
      <div className={styles.inner}>
        <h2>{filtered.count()} todos in category {categoryNames[category]}</h2>
        <ul>
          {filtered.map((todo, i) => (
            <Todo
              key={i}
              onRemove={onRemove}
              onMove={onMove}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: ImmutablePropTypes.list.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  onMove: React.PropTypes.func.isRequired,
  category: React.PropTypes.string.isRequired,
};

export default TodoList;
