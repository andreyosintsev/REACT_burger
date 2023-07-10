import {
  TIngredient,
  TConstructorIngredient,
  TConstructorIngredients
} from '../../declarations/types';

import {
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_CLEAR_INGREDIENTS,
  CONSTRUCTOR_SWAP_INGREDIENTS,
  CONSTRUCTOR_LOAD_INGREDIENTS
} from '../constants/burger-constructor-ingredients';

export type TConstructorAddIngredientAction = {
  readonly type: typeof CONSTRUCTOR_ADD_INGREDIENT;
  readonly ingredient: TIngredient | undefined;
  readonly uuid: string;
};

export type TConstructorRemoveIngredientAction = {
  readonly type: typeof CONSTRUCTOR_REMOVE_INGREDIENT;
  readonly uuid: string;
};

export type TConstructorClearIngredientsAction = {
  readonly type: typeof CONSTRUCTOR_CLEAR_INGREDIENTS;
};

export type TConstructorSwapIngredientsAction = {
  readonly type: typeof CONSTRUCTOR_SWAP_INGREDIENTS;
  readonly sourceIngredientUuid: string;
  readonly targetIngredientUuid: string;
};

export type TConstructorLoadIngredientsAction = {
  readonly type: typeof CONSTRUCTOR_LOAD_INGREDIENTS;
  readonly constructorList: TConstructorIngredients;
  readonly bun: TConstructorIngredient | null;
};

export type TConstructorIngredientsActions = 
  | TConstructorAddIngredientAction
  | TConstructorRemoveIngredientAction
  | TConstructorClearIngredientsAction
  | TConstructorSwapIngredientsAction
  | TConstructorLoadIngredientsAction;