// @flow

import React from 'react';
import styles from './App.pcss';
import logo from '../images/trollo.png';

import ChatBox from './chat/container/ChatBoxContainer';

type Props = {
  children: React.Element<any>,
};

const App = ({ children }: Props) => {
  return (

      <div className={styles.root}>

        <div className={styles.trollo}>

          <h1>
            <img alt="Trollo" src={logo} /> Trollo
          </h1>
          {children}
        </div>

        <div className={styles.chat}>
          <ChatBox />
        </div>

      </div>
  );
};

App.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default App;
