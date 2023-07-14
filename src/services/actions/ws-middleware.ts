import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE, 
  WS_CONNECTION_CLOSED,  
  WS_GET_MESSAGE
} from '../constants/ws-middleware';

import {
  TWSMessage
} from '../../declarations/ws-middleware';

export type TWSConnectionStartAction = {
  readonly type: typeof WS_CONNECTION_START;
  readonly role: 'wsFeed' | 'wsProfile';
};

export type TWSConnectionSuccessAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly role: 'wsFeed' | 'wsProfile';
};

export type TWSConnectionErrorAction = {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly role: 'wsFeed' | 'wsProfile';
  readonly payload: Event;
};

export type TWSConnectionCloseAction = {
  readonly type: typeof WS_CONNECTION_CLOSE;
  readonly role: 'wsFeed' | 'wsProfile';
};

export type TWSConnectionClosedAction = {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly role: 'wsFeed' | 'wsProfile';
};

export type TWSGetMessageAction = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly role: 'wsFeed' | 'wsProfile';
  readonly payload: TWSMessage;
};

export type TWSActions = 
| TWSConnectionStartAction
| TWSConnectionSuccessAction
| TWSConnectionErrorAction
| TWSConnectionCloseAction
| TWSConnectionClosedAction
| TWSGetMessageAction