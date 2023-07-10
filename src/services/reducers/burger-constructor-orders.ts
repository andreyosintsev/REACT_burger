import {
  TConstructorGetOrderNumActions
} from "../actions/burger-constructor-orders";

export type TConstructorOrderState = {
  orderNum: string;
  orderIsLoading: boolean;
  orderHasError: boolean;
}

const initialState: TConstructorOrderState = {
  orderNum: '----',
  orderIsLoading: false,
  orderHasError: false
};

export const burgerConstructorOrders = (state = initialState, action: TConstructorGetOrderNumActions) => {
  switch (action.type) {
    case 'CONSTRUCTOR_GET_ORDERNUM':
      return {
        ...state,
        orderIsLoading: true,
        orderHasError: false
      };
    case 'CONSTRUCTOR_GET_ORDERNUM_SUCCESS':
      return {
        ...state,
        orderIsLoading: false,
        orderHasError: false,
        orderNum: action.orderNum
      };
    case 'CONSTRUCTOR_GET_ORDERNUM_FAILED':
      return {
        ...state,
        orderIsLoading: false,
        orderHasError: true,
        orderNum: 'Error!'
      };
    default:
      return state; 
  }
};