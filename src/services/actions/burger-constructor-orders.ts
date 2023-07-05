import { postConstructorDataToApi } from '../../utils/burger-api';

import { CONSTRUCTOR_CLEAR_INGREDIENTS } from '../actions/burger-constructor-ingredients';

import { TConstructorIngredient, TConstructorIngredients } from '../../declarations/types';

export const CONSTRUCTOR_GET_ORDERNUM =         'CONSTRUCTOR_GET_ORDERNUM';
export const CONSTRUCTOR_GET_ORDERNUM_SUCCESS = 'CONSTRUCTOR_GET_ORDERNUM_SUCCESS';
export const CONSTRUCTOR_GET_ORDERNUM_FAILED =  'CONSTRUCTOR_GET_ORDERNUM_FAILED';

export const getOrderNumber = (ingredients: TConstructorIngredients, bun: TConstructorIngredient) => {
  return function (dispatch: any) {
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
    .catch((error: any) => {
      console.error(error || 'Неизвестная ошибка');
      dispatch({
        type: CONSTRUCTOR_GET_ORDERNUM_FAILED,
      });
    });
  };
};