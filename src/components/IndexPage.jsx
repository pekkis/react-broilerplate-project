import React from 'react';
import TodoForm from './TodoForm';
import TodoLists from './TodoLists';

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
};

export default IndexPage;
