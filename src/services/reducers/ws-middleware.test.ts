import { ws, initialState } from './ws-middleware';
import { TWSActions } from '../actions/ws-middleware';
import * as TActionTypes from '../constants/ws-middleware';

const testOrder = {
  ingredients: ['643d69a5c3f7b9001cfa093c'],
  _id: '643d69a5c3f7b9001cfa093c',
  status: 'done',
  "number": 12345,
  name: 'Тестовый бутерброд',
  createdAt: '2023-07-28T06:03:35.457Z',
  updatedAt: '2023-07-29T06:03:35.457Z'
}

const testMessage = {
  success: true,
  orders: [testOrder],
  total: 10001,
  totalToday: 121
}

const testError: Event = new ErrorEvent('An error occured');

describe('ws reducer', () => {
 
  it('should return initial state', () => {
    expect(
      ws(
        undefined,
        {} as TWSActions
      )
    ).toEqual(initialState);
  });

  it('should perform WS_CONNECTION_SUCCESS', () => {
    const action = {
      type: TActionTypes.WS_CONNECTION_SUCCESS
    }
    expect(
      ws(initialState, action)
    ).toEqual({
      wsError: undefined,
      wsConnected: true      
    });
  });

  it('should perform WS_CONNECTION_ERROR', () => {
    const action = {
      type: TActionTypes.WS_CONNECTION_ERROR,
      payload: testError
    }
    expect(
      ws(initialState, action)
    ).toEqual({
      ...initialState,
      wsError: testError,
      wsConnected: false      
    });
  });
  
  it('should perform WS_GET_MESSAGE', () => {
    const action = {
      ...initialState,
      type: TActionTypes.WS_GET_MESSAGE,
      payload: testMessage
    }
    expect(
      ws(initialState, action)
    ).toEqual({
      ...initialState,
      wsMessage: testMessage
    });
  });

  it('should perform WS_CONNECTION_CLOSE', () => {
    const action = {
      ...initialState,
      type: TActionTypes.WS_CONNECTION_CLOSE,
    }
    expect(
      ws(initialState, action)
    ).toEqual({
      ...initialState,
      wsError: undefined,
      wsConnected: false
    });
  });

  it('should perform WS_CONNECTION_CLOSED', () => {
    const action = {
      ...initialState,
      type: TActionTypes.WS_CONNECTION_CLOSED,
    }
    expect(
      ws(initialState, action)
    ).toEqual({
      ...initialState,
      wsError: undefined,
      wsConnected: false
    });
  });

});