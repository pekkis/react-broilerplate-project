import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const TodoPage = props => {
  const { todos, params } = props;
  const currentTodo = todos.find(todo => todo.id === params.uuid);

  if (!currentTodo) {
    return (
      <div>Not found</div>
    );
  }

  return (
    <div>
      {currentTodo.text}
    </div>
  );
};

TodoPage.propTypes = {
  todos: ImmutablePropTypes.list.isRequired,
  params: React.PropTypes.object.isRequired,
};

export default TodoPage;
