import {
  TWSActions
} from '../actions/ws-middleware';

import {
  TWSStates
} from '../../declarations/ws-middleware';

const initialState: TWSStates = {
  wsFeed: {
    wsConnected: false,
    wsMessage: undefined
  },
  wsProfile: {
    wsConnected: false,
    wsMessage: undefined
  }
};

export const ws = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case 'WS_CONNECTION_SUCCESS':
      return {
        ...state,
        [action.role]: {
          wsError: undefined,
          wsConnected: true
        }       
      };
    case 'WS_CONNECTION_ERROR':
      return {
          ...state,
          [action.role]: {
            wsError: action.payload,
            wsConnected: false
          }      
      };
    case 'WS_GET_MESSAGE':
      return {
        ...state,
        [action.role]: {
          wsMessage: action.payload
        }
      };
    case 'WS_CONNECTION_CLOSE':
      return {
        ...state,
        [action.role]: {
          wsError: undefined,
          wsConnected: false
        }
      };
    case 'WS_CONNECTION_CLOSED':
      return {
        ...state,
        [action.role]: {
          wsError: undefined,
          wsConnected: false
        }  
      };
    default: return state;
  }
}