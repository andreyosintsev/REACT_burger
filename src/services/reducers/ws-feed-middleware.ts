import {
  TWSFeedActions
} from '../actions/ws-feed-middleware';

import {
  TWSState
} from '../../declarations/ws-middleware';

const initialState: TWSState = {
  wsConnected: false,
  wsMessage: undefined
};

export const wsFeed = (state = initialState, action: TWSFeedActions) => {
  switch (action.type) {
    case 'WS_FEED_CONNECTION_SUCCESS':
      return {
        ...state,
        wsError: undefined,
        wsConnected: true       
      };
    case 'WS_FEED_CONNECTION_ERROR':
      return {
        ...state,
        wsError: action.payload,
        wsConnected: false       
      };
    case 'WS_FEED_GET_MESSAGE':
      return {
        ...state,
        wsMessage: action.payload
      }
    case 'WS_FEED_CONNECTION_CLOSE':
      return {
        ...state,
        wsError: undefined,
        wsConnected: false       
      };
    case 'WS_FEED_CONNECTION_CLOSED':
      return {
        ...state,
        wsError: undefined,
        wsConnected: false       
      };
    default: return state;
  }
}