import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSE, 
  WS_FEED_CONNECTION_CLOSED,  
  WS_FEED_GET_MESSAGE
} from '../constants/ws-feed-middleware';

import {
  TWSMessage
} from '../../declarations/ws-middleware';

export type TWSFeedConnectionStartAction = {
  readonly type: typeof WS_FEED_CONNECTION_START;
};

export type TWSFeedConnectionSuccessAction = {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
};

export type TWSFeedConnectionErrorAction = {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
  readonly payload: Event;
};

export type TWSFeedConnectionCloseAction = {
  readonly type: typeof WS_FEED_CONNECTION_CLOSE;
};

export type TWSFeedConnectionClosedAction = {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
};

export type TWSFeedGetMessageAction = {
  readonly type: typeof WS_FEED_GET_MESSAGE;
  readonly payload: TWSMessage;
};

export type TWSFeedActions = 
| TWSFeedConnectionStartAction
| TWSFeedConnectionSuccessAction
| TWSFeedConnectionErrorAction
| TWSFeedConnectionCloseAction
| TWSFeedConnectionClosedAction
| TWSFeedGetMessageAction