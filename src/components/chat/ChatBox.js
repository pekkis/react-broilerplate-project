// @flow

import React from 'react';
import styles from './ChatBox.pcss';
import ChatMessage from './ChatMessage';
import { Map } from 'immutable';

type Props = {
  users: Map<string, UserType>,
  messages: Map<string, ChatMessageType>,
};

const ChatBox = (props: Props) => {

  const { users, messages } = props;

  return (
    <div className={styles.root}>
      <h2>Chat</h2>
      <div className={styles.messages}>
        {messages.map(message => {

          return (
            <ChatMessage
              user={users.get(message.user)}
              timestamp={message.timestamp}
              text={message.text}
            />
          );
        }).toList()}
      </div>


    </div>
  );
}

export default ChatBox;
