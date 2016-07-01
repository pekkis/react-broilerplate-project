import React from 'react';
import uuid from 'node-uuid';
import styles from './TodoForm.pcss';

export default class TodoForm extends React.Component {

  onSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: uuid.v4(),
      text: this.refs.text.value,
      category: 0,
    };
    this.refs.text.value = '';
    this.props.onAdd(newTodo);
  }

  render() {
    return (
      <div className={styles.root}>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Got something new to do?</label>
          <input ref="text" type="text" placeholder="What must be done?" />
          <button type="submit">Add</button>
        </form>
      </div>
      );
  }
}

TodoForm.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
};
