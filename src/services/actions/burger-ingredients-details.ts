import {
  TIngredient
} from '../../declarations/types';

import {
  INGREDIENTS_SELECT_INGREDIENT,
  INGREDIENTS_DESELECT_INGREDIENT
} from '../constants/burger-ingredients-details';

export type TIngredientsSelectIngredientAction = {
  readonly type: typeof INGREDIENTS_SELECT_INGREDIENT;
  readonly ingredientSelected: TIngredient | undefined;
};

export type TIngredientsDeselectIngredientAction = {
  readonly type: typeof INGREDIENTS_DESELECT_INGREDIENT;
};

export type TIngredientsDetailsActions =
  | TIngredientsSelectIngredientAction
  | TIngredientsDeselectIngredientAction;