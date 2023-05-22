import { getIngredientsFromApi } from '../../utils/burger-api';
import { NORMA_API } from '../../components/app/app';

import { INGREDIENTS_SELECT_INGREDIENT } from "../actions/burger-ingredients";
import { INGREDIENTS_DESELECT_INGREDIENT } from "../actions/burger-ingredients";

import { INGREDIENTS_GET_INGREDIENTS } from "../actions/burger-ingredients";
import { INGREDIENTS_GET_INGREDIENTS_SUCCESS } from "../actions/burger-ingredients";
import { INGREDIENTS_GET_INGREDIENTS_FAILED } from "../actions/burger-ingredients";


const initialState = {
  ingredientsList: [],
  ingredientSelected: {},

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
    case INGREDIENTS_SELECT_INGREDIENT:
      return {
        ...state,
        ingredientSelected: action.ingredientSelected
      };
    case INGREDIENTS_DESELECT_INGREDIENT:
      return {
        ...state,
        ingredientSelected: {}
      };
    default: return state;
  }
};