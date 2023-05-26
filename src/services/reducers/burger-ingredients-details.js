import {  INGREDIENTS_SELECT_INGREDIENT,
          INGREDIENTS_DESELECT_INGREDIENT } from "../actions/burger-ingredients-details";

const initialState = {
  ingredientSelected: {}
};

export const burgerIngredientsDetails = (state = initialState, action) => {
  switch (action.type) {
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