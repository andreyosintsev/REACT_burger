import {
  TIngredient
} from "../../declarations/types";

import {
  TIngredientsDetailsActions
} from "../actions/burger-ingredients-details";

export type TBurgerIngredientsDetailState = {
  ingredientSelected: TIngredient | null;
}

const initialState: TBurgerIngredientsDetailState = {
  //ingredientSelected: []
  ingredientSelected: null
};

export const burgerIngredientsDetails = (state = initialState, action: TIngredientsDetailsActions) => {
  switch (action.type) {
    case 'INGREDIENTS_SELECT_INGREDIENT':
      return {
        ...state,
        ingredientSelected: action.ingredientSelected
      };
    case 'INGREDIENTS_DESELECT_INGREDIENT':
      return {
        ...state,
        //ingredientSelected: []
        ingredientSelected: null
      };
    default: return state;
  }
};