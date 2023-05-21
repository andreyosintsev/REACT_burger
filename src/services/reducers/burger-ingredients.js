import { getIngredientsFromApi } from '../../utils/burger-api';
import { NORMA_API } from '../../components/app/app';

import { INGREDIENTS_GET_INGREDIENTS } from "../actions/burger-ingredients";
import { INGREDIENTS_GET_INGREDIENTS_SUCCESS } from "../actions/burger-ingredients";
import { INGREDIENTS_GET_INGREDIENTS_FAILED } from "../actions/burger-ingredients";


const initialState = {
  ingredientsList: [],
  ingredientSelected: null,

  ingredientsIsLoading: false,
  ingredientsHasError: false
};

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: INGREDIENTS_GET_INGREDIENTS
    });

    try {
      getIngredientsFromApi(NORMA_API)
      .then(data=> {
          dispatch({
            type: INGREDIENTS_GET_INGREDIENTS_SUCCESS,
            ingredientsList: data
          });
        }
      )
      .catch (
        dispatch({
          type: INGREDIENTS_GET_INGREDIENTS_FAILED
        })
      )
    } catch (error) {
      dispatch({
        type: INGREDIENTS_GET_INGREDIENTS_FAILED
      });
    }
  };
}

export const burgerIngredients = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS_GET_INGREDIENTS: 
      return {
        ...state,
        ingredientsIsLoading: true,
        ingredientsHasError: false
      };
    case INGREDIENTS_GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsIsLoading: false,
        ingredientsHasError: false,
        ingredientsList: action.ingredientsList
      };
    case INGREDIENTS_GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientsIsLoading: false,
        ingredientsHasError: true
      };
    default: return state;
  }
};