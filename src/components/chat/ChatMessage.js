// @flow

import React from 'react';
import Gravatar from 'react-gravatar';
import styles from './ChatMessage.pcss';

type Props = {
  user: UserType,
  timestamp: string,
  text: string,
};

const ChatMessage = (props: Props) => {

  const { user, timestamp, text } = props;

  return (
    <div>
      <Gravatar size={20} email={user.gravatar} />
      <strong>{user.nick}</strong> {text}
    </div>
  );
}

export default ChatMessage;
