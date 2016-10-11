// @flow

import nodeUuid from 'node-uuid';
import moment from 'moment';
import { List, Map } from 'immutable';

export function addUser(nick: string, gravatar: string, uuid: ?string = null): Action {
  return {
    type: 'CHAT_ADD_USER',
    payload: {
      nick,
      gravatar,
      uuid: uuid ? uuid : nodeUuid.v4(),
    },
  };
}

export function setUsers(users: array) {
  return {
    type: 'CHAT_SET_USERS',
    payload: users,
  };
}

export function setMessages(messages: array) {
  return {
    type: 'CHAT_SET_MESSAGES',
    payload: messages,
  };
}

export function addMessage(user: string, text: string) {
  return {
    type: 'CHAT_ADD_MESSAGE',
    payload: {
      user,
      text,
      timestamp: moment().unix(),
    }
  };
}

const defaultState: Map<string, any> = Map({
  users: Map(),
  messages: Map(),
});

export default function (state: Map<string, any> = defaultState, action: Action) {

  const { type, payload, meta } = action;

  switch (type) {

    case 'CHAT_SET_USERS':
      return state.set('users', Map(payload));

    case 'CHAT_SET_MESSAGES':
      return state.set('messages', Map(payload));

    case 'CHAT_ADD_USER':
      return state.setIn(['users', payload.uuid], payload);

    case 'CHAT_ADD_MESSAGE':
      return state.setIn(['messages', payload.uuid], payload);

    default:
      return state;

  }
}
