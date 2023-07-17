import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../services/reducers/root';
import { socketMiddleware } from './ws-middleware';

import { TWSStoreActions } from '../declarations/ws-middleware';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
 } from '../services/constants/ws-middleware'; 

 const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  wsClose: WS_CONNECTION_CLOSE,
  onClosed: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_MESSAGE
};

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  rootReducer, composeEnhancers(
    applyMiddleware(thunk, socketMiddleware(wsActions))
  )
);

export default store;