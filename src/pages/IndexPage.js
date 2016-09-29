// @flow

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TodoForm from '../components/TodoForm';
import TodoLists from '../components/TodoLists';
import { List } from 'immutable';

type Props = {
  saveTodos: () => void,
  addTodo: () => void,
  isChanged: boolean,
  todos: List<Object>,
  removeTodo: () => void,
  moveTodo: () => void,
};

const IndexPage = (props: Props) => {
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
