import React from 'react';
import TodoForm from './TodoForm';
import TodoLists from './TodoLists';
import ImmutablePropTypes from 'react-immutable-proptypes';

const IndexPage = props => {
  const {
    saveTodos,
    addTodo,
    isChanged,
    todos,
    removeTodo,
    moveTodo,
  } = props;

  return (
    <section>
      <TodoLists todos={todos} onRemove={removeTodo} onMove={moveTodo} />

      <TodoForm onAdd={addTodo} />

      <button onClick={saveTodos.bind(null, todos)} disabled={!isChanged}>Save</button>
    </section>
  );
};

IndexPage.propTypes = {
  saveTodos: React.PropTypes.func.isRequired,
  addTodo: React.PropTypes.func.isRequired,
  removeTodo: React.PropTypes.func.isRequired,
  moveTodo: React.PropTypes.func.isRequired,
  isChanged: React.PropTypes.bool.isRequired,
  todos: ImmutablePropTypes.list.isRequired,
};

export default IndexPage;
