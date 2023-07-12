import {
  TWSActions
} from '../actions/ws-middleware';

import {
  TWSMessage
} from '../../declarations/ws-middleware';

export type TWSState = {
  wsConnected: boolean;
  wsMessage?: TWSMessage;
  wsError?: Event;
}

const initialState: TWSState = {
  wsConnected: false
};

export const ws = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case 'WS_CONNECTION_SUCCESS':
      return {
        ...state,
        wsError: undefined,
        wsConnected: true       
      };
    case 'WS_CONNECTION_ERROR':
      return {
        ...state,
        wsError: action.payload,
        wsConnected: false       
      };
    case 'WS_GET_MESSAGE':
      return {
        ...state,
        wsMessage: action.payload
      }
    case 'WS_CONNECTION_CLOSE':
      return {
        ...state,
        wsError: undefined,
        wsConnected: false       
      };
    case 'WS_CONNECTION_CLOSED':
      return {
        ...state,
        wsError: undefined,
        wsConnected: false       
      };
    default: return state;
  }
}