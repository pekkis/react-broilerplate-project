import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { List } from 'immutable';
import uuid from 'node-uuid';
import TodoList from '../src/components/TodoList';

const todos = List.of(
  {
    id: uuid.v4(),
    text: 'Must do something',
  },
  {
    id: uuid.v4(),
    text: 'Must do something else',
  },
);

storiesOf('TodoList', module)
  .add('with some todos', () => {
    return (
      <TodoList
        category="tussi"
        todos={todos}
        onRemove={action('remove')}
        onMove={action('move')}
      />
    );
  })
;
