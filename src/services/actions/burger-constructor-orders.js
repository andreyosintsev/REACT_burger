import { postConstructorDataToApi } from '../../utils/burger-api';
import { NORMA_API } from '../../components/app/app';

import { CONSTRUCTOR_CLEAR_INGREDIENTS } from '../actions/burger-constructor-ingredients';

export const CONSTRUCTOR_GET_ORDERNUM =         'CONSTRUCTOR_GET_ORDERNUM';
export const CONSTRUCTOR_GET_ORDERNUM_SUCCESS = 'CONSTRUCTOR_GET_ORDERNUM_SUCCESS';
export const CONSTRUCTOR_GET_ORDERNUM_FAILED =  'CONSTRUCTOR_GET_ORDERNUM_FAILED';

export const getOrderNumber = (data) => {
  return function (dispatch) {
    dispatch({
      type: CONSTRUCTOR_GET_ORDERNUM
    });
    try {
      postConstructorDataToApi(
          NORMA_API, {
            'ingredients': data.map(item => item.ingredient._id)
          }
        )
        .then(data => {
          dispatch({
            type: CONSTRUCTOR_GET_ORDERNUM_SUCCESS,
            orderNum: data.number
          });
          dispatch({
            type: CONSTRUCTOR_CLEAR_INGREDIENTS
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: CONSTRUCTOR_GET_ORDERNUM_FAILED,
          });
        });
    } catch (error) {
      console.error(error);
      dispatch({
        type: CONSTRUCTOR_GET_ORDERNUM_FAILED,
      });
    }
  };
};