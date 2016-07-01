import React from 'react';
import styles from './App.pcss';
import logo from '../images/trollo.png';

const App = props => {
  const { children } = props;
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
