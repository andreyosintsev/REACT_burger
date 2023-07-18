import { postConstructorDataToApi } from '../../utils/burger-api';

import { CONSTRUCTOR_CLEAR_INGREDIENTS } from '../constants/burger-constructor-ingredients';

import { 
  AppDispatch,
  TConstructorIngredient, 
  TConstructorIngredients
} from '../../declarations/types';

import {
  CONSTRUCTOR_GET_ORDERNUM,
  CONSTRUCTOR_GET_ORDERNUM_SUCCESS,
  CONSTRUCTOR_GET_ORDERNUM_FAILED,
  CONSTRUCTOR_CLEAR_ORDERNUM
} from '../constants/burger-constructor-orders';

export type TConstructorGetOrderNumAction = {
  type: typeof CONSTRUCTOR_GET_ORDERNUM;
}

export type TConstructorGetOrderNumSuccessAction = {
  readonly type: typeof CONSTRUCTOR_GET_ORDERNUM_SUCCESS;
  readonly orderNum: number;
};

export type TConstructorGetOrderNumFailedAction = {
  readonly type: typeof CONSTRUCTOR_GET_ORDERNUM_FAILED;
};

export type TConstructorClearOrderNumAction = {
  readonly type: typeof CONSTRUCTOR_CLEAR_ORDERNUM;
};

export type TConstructorGetOrderNumActions = 
  | TConstructorGetOrderNumAction
  | TConstructorGetOrderNumSuccessAction
  | TConstructorGetOrderNumFailedAction
  | TConstructorClearOrderNumAction;

export const getOrderNumber = (ingredients: TConstructorIngredients, bun: TConstructorIngredient) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: CONSTRUCTOR_GET_ORDERNUM
    });
    postConstructorDataToApi(
      { 'ingredients': ingredients.map(item => item.ingredient._id).concat(bun.ingredient._id) }
    )!
    .then(data => {
      dispatch({
        type: CONSTRUCTOR_GET_ORDERNUM_SUCCESS,
        orderNum: data.order.number
      });
      dispatch({
        type: CONSTRUCTOR_CLEAR_INGREDIENTS
      });
    })
    .catch((error) => {
      console.error(error || 'Неизвестная ошибка');
      dispatch({
        type: CONSTRUCTOR_GET_ORDERNUM_FAILED,
      });
    });
  };
};