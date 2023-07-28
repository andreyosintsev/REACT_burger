import { burgerConstructorOrders, initialState } from './burger-constructor-orders';
import { TConstructorGetOrderNumActions } from '../actions/burger-constructor-orders';
import * as TActionTypes from '../constants/burger-constructor-orders';

describe('burgerConstructorOrders reducer', () => {
 
  it('should return initial state', () => {
    expect(
      burgerConstructorOrders(undefined, {} as TConstructorGetOrderNumActions)
    ).toEqual(initialState);
  });

  it('should perform CONSTRUCTOR_GET_ORDERNUM', () => {
    const action = {
      type: TActionTypes.CONSTRUCTOR_GET_ORDERNUM
    }
    expect(
      burgerConstructorOrders(initialState, action)
    ).toEqual({
      orderNum: undefined,
      orderIsLoading: true,
      orderHasError: false
    });
  });

  it('should perform CONSTRUCTOR_GET_ORDERNUM_SUCCESS', () => {
    const action = {
      type: TActionTypes.CONSTRUCTOR_GET_ORDERNUM_SUCCESS,
      orderNum: 123
    }
    expect(
      burgerConstructorOrders(initialState, action)
    ).toEqual({
      orderNum: 123,
      orderIsLoading: false,
      orderHasError: false
    });
  });

  it('should perform CONSTRUCTOR_GET_ORDERNUM_FAILED', () => {
    const action = {
      type: TActionTypes.CONSTRUCTOR_GET_ORDERNUM_FAILED,
    }
    expect(
      burgerConstructorOrders(initialState, action)
    ).toEqual({
      orderNum: 'Error!',
      orderIsLoading: false,
      orderHasError: true
    });
  });

  it('should perform CONSTRUCTOR_CLEAR_ORDERNUM', () => {
    const action = {
      type: TActionTypes.CONSTRUCTOR_CLEAR_ORDERNUM,
    }
    expect(
      burgerConstructorOrders(initialState, action)
    ).toEqual({
      orderNum: undefined,
      orderIsLoading: false,
      orderHasError: false
    });
  });
});