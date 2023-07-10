import { getIngredientsFromApi } from '../../utils/burger-api';

import {
  AppDispatch,
  TIngredients
} from '../../declarations/types';

import {
  INGREDIENTS_GET_INGREDIENTS,
  INGREDIENTS_GET_INGREDIENTS_SUCCESS,
  INGREDIENTS_GET_INGREDIENTS_FAILED
} from '../constants/burger-ingredients-requests';

export type TIngredientsGetIngredientsAction = {
  readonly type: typeof INGREDIENTS_GET_INGREDIENTS;
}

export type TIngredientsGetIngredientsSuccessAction = {
  readonly type: typeof INGREDIENTS_GET_INGREDIENTS_SUCCESS;
  readonly ingredientsList: TIngredients;
}

export type TIngredientsGetIngredientsFailedAction = {
  readonly type: typeof INGREDIENTS_GET_INGREDIENTS_FAILED;
}

export type TIngredientsRequestsActions = 
  | TIngredientsGetIngredientsAction
  | TIngredientsGetIngredientsSuccessAction
  | TIngredientsGetIngredientsFailedAction;

export const getIngredients = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: INGREDIENTS_GET_INGREDIENTS
    });
    getIngredientsFromApi()!
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