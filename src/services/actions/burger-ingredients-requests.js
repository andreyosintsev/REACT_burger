import { NORMA_API } from '../../components/app/app';

import { getIngredientsFromApi } from '../../utils/burger-api';

export const INGREDIENTS_GET_INGREDIENTS =          'INGREDIENTS_GET_INGREDIENTS';
export const INGREDIENTS_GET_INGREDIENTS_SUCCESS =  'INGREDIENTS_GET_INGREDIENTS_SUCCESS';
export const INGREDIENTS_GET_INGREDIENTS_FAILED =   'INGREDIENTS_GET_INGREDIENTS_FAILED';

export function getIngredients() {
  console.log('In getIngredients');
  return function (dispatch) {
    dispatch({
      type: INGREDIENTS_GET_INGREDIENTS
    });

    try {
      getIngredientsFromApi(NORMA_API)
      .then(data=> {
          console.log('In getIngredients PROMISE: then');
          dispatch({
            type: INGREDIENTS_GET_INGREDIENTS_SUCCESS,
            ingredientsList: data
          });
        }
      )
      .catch ((error) => {
        console.log ('In getIngredients PROMISE: catch: '+error.message);
        dispatch({
          type: INGREDIENTS_GET_INGREDIENTS_FAILED
        });
      });
    } catch (error) {
      console.log ('In getIngredients: catch: '+error.message);
      dispatch({
        type: INGREDIENTS_GET_INGREDIENTS_FAILED
      });
    }
  };
}