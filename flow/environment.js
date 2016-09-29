// @flow

declare type TodoType = {
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
