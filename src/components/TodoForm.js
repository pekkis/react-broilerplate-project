// @flow

import React from 'react';
import uuid from 'node-uuid';
import styles from './TodoForm.pcss';

export default class TodoForm extends React.Component {

  text: HTMLInputElement;

  onSubmit(e: Event) {
    e.preventDefault();

    const newTodo: TodoType = {
      id: uuid.v4(),
      text: this.text.value,
      category: 0,
    };
    this.text.value = '';
    this.props.onAdd(newTodo);
  }

  render() {
    return (
      <div className={styles.root}>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="text">Got something new to do?</label>
          <input
            name="text"
            ref={text => { this.text = text; }}
            type="text"
            placeholder="What must be done?"
          />
          <button type="submit">Add</button>
        </form>
      </div>
      );
  }
}

TodoForm.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
};
