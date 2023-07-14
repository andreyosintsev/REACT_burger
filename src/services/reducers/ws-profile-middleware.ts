import {
  TWSProfileActions
} from '../actions/ws-profile-middleware';

import {
  TWSState
} from '../../declarations/ws-middleware';

const initialState: TWSState = {
  wsConnected: false,
  wsMessage: undefined
};

export const wsProfile = (state = initialState, action: TWSProfileActions) => {
  switch (action.type) {
    case 'WS_PROFILE_CONNECTION_SUCCESS':
      return {
        ...state,
        wsError: undefined,
        wsConnected: true       
      };
    case 'WS_PROFILE_CONNECTION_ERROR':
      return {
        ...state,
        wsError: action.payload,
        wsConnected: false       
      };
    case 'WS_PROFILE_GET_MESSAGE':
      return {
        ...state,
        wsMessage: action.payload
      }
    case 'WS_PROFILE_CONNECTION_CLOSE':
      return {
        ...state,
        wsError: undefined,
        wsConnected: false       
      };
    case 'WS_PROFILE_CONNECTION_CLOSED':
      return {
        ...state,
        wsError: undefined,
        wsConnected: false       
      };
    default: return state;
  }
}