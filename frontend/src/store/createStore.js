import { createStore, applyMiddleware } from 'redux';

export default (reducers, middlewares) =>
  createStore(reducers, applyMiddleware(...middlewares));
