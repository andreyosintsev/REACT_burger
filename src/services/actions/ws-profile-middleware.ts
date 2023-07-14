import {
  WS_PROFILE_CONNECTION_START,
  WS_PROFILE_CONNECTION_SUCCESS,
  WS_PROFILE_CONNECTION_ERROR,
  WS_PROFILE_CONNECTION_CLOSE, 
  WS_PROFILE_CONNECTION_CLOSED,  
  WS_PROFILE_GET_MESSAGE
} from '../constants/ws-profile-middleware';

import {
  TWSMessage
} from '../../declarations/ws-middleware';

export type TWSProfileConnectionStartAction = {
  readonly type: typeof WS_PROFILE_CONNECTION_START;
};

export type TWSProfileConnectionSuccessAction = {
  readonly type: typeof WS_PROFILE_CONNECTION_SUCCESS;
};

export type TWSProfileConnectionErrorAction = {
  readonly type: typeof WS_PROFILE_CONNECTION_ERROR;
  readonly payload: Event;
};

export type TWSProfileConnectionCloseAction = {
  readonly type: typeof WS_PROFILE_CONNECTION_CLOSE;
};

export type TWSProfileConnectionClosedAction = {
  readonly type: typeof WS_PROFILE_CONNECTION_CLOSED;
};

export type TWSProfileGetMessageAction = {
  readonly type: typeof WS_PROFILE_GET_MESSAGE;
  readonly payload: TWSMessage;
};

export type TWSProfileActions = 
| TWSProfileConnectionStartAction
| TWSProfileConnectionSuccessAction
| TWSProfileConnectionErrorAction
| TWSProfileConnectionCloseAction
| TWSProfileConnectionClosedAction
| TWSProfileGetMessageAction