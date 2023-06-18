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
    getIngredientsFromApi()
    .then(data=> {
        dispatch({
          type: INGREDIENTS_GET_INGREDIENTS_SUCCESS,
          ingredientsList: data.data
        });
      }
    )
    .catch ((error) => {
      console.error ('In getIngredients PROMISE: catch: '+error.message);
      dispatch({
        type: INGREDIENTS_GET_INGREDIENTS_FAILED
      });
    });
  };
}