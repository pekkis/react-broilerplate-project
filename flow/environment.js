// @flow

declare type TodoItem = {
  id: string,
  category: number,
  text: string
};

declare type Action = {
  type: string,
  payload?: any,
  error?: any,
  meta?: any
};
