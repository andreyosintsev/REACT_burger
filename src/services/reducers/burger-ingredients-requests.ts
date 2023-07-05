import {  INGREDIENTS_GET_INGREDIENTS,
          INGREDIENTS_GET_INGREDIENTS_SUCCESS,
          INGREDIENTS_GET_INGREDIENTS_FAILED } from "../actions/burger-ingredients-requests";

const initialState = {
  ingredientsList: [],

  ingredientsIsLoading: false,
  ingredientsHasError: false
};

export const burgerIngredientsRequests = (state = initialState, action: any) => {
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