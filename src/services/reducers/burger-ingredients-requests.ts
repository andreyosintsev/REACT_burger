import {
  TIngredients
} from "../../declarations/types";

import {
  TIngredientsRequestsActions
} from "../actions/burger-ingredients-requests"

export type TIngredientsRequestsState = {
  ingredientsList: TIngredients;
  ingredientsIsLoading: boolean;
  ingredientsHasError: boolean;
}

export const initialState: TIngredientsRequestsState = {
  ingredientsList: [],

  ingredientsIsLoading: false,
  ingredientsHasError: false
};

export const burgerIngredientsRequests = (state = initialState, action: TIngredientsRequestsActions) => {
  switch (action.type) {
    case 'INGREDIENTS_GET_INGREDIENTS':
      return {
        ...state,
        ingredientsIsLoading: true,
        ingredientsHasError: false
      };
    case 'INGREDIENTS_GET_INGREDIENTS_SUCCESS':
      return {
        ...state,
        ingredientsIsLoading: false,
        ingredientsHasError: false,
        ingredientsList: action.ingredientsList
      };
    case 'INGREDIENTS_GET_INGREDIENTS_FAILED':
      return {
        ...state,
        ingredientsIsLoading: false,
        ingredientsHasError: true
      };
    default: return state;
  }
};