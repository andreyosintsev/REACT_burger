import  { CONSTRUCTOR_GET_ORDERNUM,
          CONSTRUCTOR_GET_ORDERNUM_SUCCESS,
          CONSTRUCTOR_GET_ORDERNUM_FAILED
        } from "../actions/burger-constructor-orders";

const initialState = {
  orderNum: '----',
  orderIsLoading: false,
  orderHasError: false
};

export const burgerConstructorOrders = (state = initialState, action: any) => {
  switch (action.type) {
    case CONSTRUCTOR_GET_ORDERNUM:
      return {
        ...state,
        orderIsLoading: true,
        orderHasError: false
      };
    case CONSTRUCTOR_GET_ORDERNUM_SUCCESS:
      return {
        ...state,
        orderIsLoading: false,
        orderHasError: false,
        orderNum: action.orderNum
      };
    case CONSTRUCTOR_GET_ORDERNUM_FAILED:
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