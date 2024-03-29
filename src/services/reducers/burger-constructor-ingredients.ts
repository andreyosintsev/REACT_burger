import { TConstructorIngredient, TConstructorIngredients } from '../../declarations/types';

import { TConstructorIngredientsActions } from '../actions/burger-constructor-ingredients';

export type TConstructorIngredientsState = {
  constructorList: TConstructorIngredients;
  bun: TConstructorIngredient | null;
}

export const initialState: TConstructorIngredientsState = {
  constructorList: [],
  bun: null
};

export const burgerConstructorIngredients = (state = initialState, action: TConstructorIngredientsActions) => {
  switch (action.type) {
    case 'CONSTRUCTOR_ADD_INGREDIENT': {
      return action.ingredient?.type === 'bun' 
      ? {
          ...state,
          bun: {
            uuid: action.uuid,
            ingredient: action.ingredient
          }
      }
      : {
          ...state,
          constructorList: [...state.constructorList,
            {
              uuid: action.uuid,
              ingredient: action.ingredient
            }
          ]
        };
    }
    case 'CONSTRUCTOR_REMOVE_INGREDIENT': {
      return (state.bun && state.bun.uuid) === action.uuid
      ? {
          ...state,
          bun: null
      }
      : {
        ...state,
        constructorList: state.constructorList.filter(ingredient => ingredient.uuid !== action.uuid)
      };
    }
    case 'CONSTRUCTOR_CLEAR_INGREDIENTS':
      return {
        ...state,
        constructorList: [],
        bun: null
      };
    case 'CONSTRUCTOR_SWAP_INGREDIENTS':
      const newList = [...state.constructorList];
      const ingredientToMove = newList.find(ingredient => ingredient.uuid === action.sourceIngredientUuid);
      const fromIndex = newList.findIndex(ingredient => ingredient.uuid === action.sourceIngredientUuid);
      const toIndex = newList.findIndex(ingredient => ingredient.uuid === action.targetIngredientUuid);
      if (ingredientToMove) {
        newList.splice(fromIndex, 1);
        newList.splice(toIndex, 0, ingredientToMove);
        return {
          ...state,
          constructorList: newList
        }
      } else {
          return state;
      };
    case 'CONSTRUCTOR_LOAD_INGREDIENTS':
      return {
        ...state,
        constructorList: action.constructorList,
        bun: action.bun
      };
    default:
      return state;
  }
};