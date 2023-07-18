import {
  TConstructorGetOrderNumActions
} from "../actions/burger-constructor-orders";

export type TConstructorOrderState = {
  orderNum?: string;
  orderIsLoading: boolean;
  orderHasError: boolean;
}

const initialState: TConstructorOrderState = {
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
    case 'CONSTRUCTOR_CLEAR_ORDERNUM':
      return {
        ...state,
        orderNum: undefined
      };
    default:
      return state; 
  }
};