import {  CONSTRUCTOR_ADD_INGREDIENT,
          CONSTRUCTOR_REMOVE_INGREDIENT,
          CONSTRUCTOR_SWAP_INGREDIENTS,
          CONSTRUCTOR_CLEAR_INGREDIENTS } from "../actions/burger-constructor-ingredients";

const initialState = {
  constructorList: []
};

export const burgerConstructorIngredients = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD_INGREDIENT: {
      return {
        ...state,
        constructorList: [...state.constructorList,
          {
            uuid: action.uuid,
            ingredient: action.ingredient
          }
        ]
      };
    }
    case CONSTRUCTOR_REMOVE_INGREDIENT: {
      return {
        ...state,
        constructorList: state.constructorList.filter(ingredient => ingredient.uuid !== action.uuid)
      };
    }
    case CONSTRUCTOR_CLEAR_INGREDIENTS:
      return {
        ...state,
        constructorList: []
      };
    case CONSTRUCTOR_SWAP_INGREDIENTS:
      const newList = JSON.parse(JSON.stringify(state.constructorList));
      const ingredientToMove = newList.find(ingredient => ingredient.uuid === action.sourceIngredientUuid);
      const fromIndex = newList.findIndex(ingredient => ingredient.uuid === action.sourceIngredientUuid);
      const toIndex = newList.findIndex(ingredient => ingredient.uuid === action.targetIngredientUuid);
      newList.splice(fromIndex, 1);
      newList.splice(toIndex, 0, ingredientToMove);
      return {
        ...state,
        constructorList: newList
      };
    default:
      return state;
  }
};