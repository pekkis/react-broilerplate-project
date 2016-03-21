import React from 'react';

import styles from './App.pcss';

export default class App extends React.Component {

  render() {

    return (
      <div className={styles.root}>
      <h1>
      <img src={require('../images/trollo.png')} /> Trollo
      </h1>

      {this.props.children}

      </div>
      );
  }
}
