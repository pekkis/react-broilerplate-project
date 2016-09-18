// @flow

import React from 'react';
import styles from './App.pcss';
import logo from '../images/trollo.png';

type Props = {
  children: React.Element<any>,
};

const App = ({ children }: Props) => {
  return (
    <div className={styles.root}>
      <h1>
        <img alt="Trollo" src={logo} /> Trollo
      </h1>
      {children}
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default App;
