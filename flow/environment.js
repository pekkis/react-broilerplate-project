// @flow

declare type TodoType = {
  id: string,
  category: number,
  text: string
};

declare type UserType = {
  uuid: string,
  nick: string,
  gravatar: string,
};


declare type ChatMessageType = {
  user: string,
  text: string,
  timestamp: string,
};

declare type Action = {
  type: string,
  payload?: any,
  error?: any,
  meta?: any
};
