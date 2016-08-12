import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { List } from 'immutable';
import TodoLists from '../src/components/TodoLists';
import TodoList from '../src/components/TodoList';

describe('<TodoLists />', () => {

  it('renders a todolist for each category', () => {
    const wrapper = shallow(
      <TodoLists onMove={() => {}} onRemove={() => {}} todos={List()}/>
    );
    expect(wrapper.find(TodoList)).to.have.length(3);
  });

});
