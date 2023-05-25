import { postConstructorDataToApi } from '../../utils/burger-api';
import { NORMA_API } from '../../components/app/app';

import  { CONSTRUCTOR_ADD_INGREDIENT,
          CONSTRUCTOR_SWAP_INGREDIENTS,
          CONSTRUCTOR_REMOVE_INGREDIENT,
          CONSTRUCTOR_CLEAR_INGREDIENTS,
          CONSTRUCTOR_GET_ORDERNUM,
          CONSTRUCTOR_GET_ORDERNUM_SUCCESS,
          CONSTRUCTOR_GET_ORDERNUM_FAILED
        } from "../actions/burger-constructor";

const initialState = {
  constructorList: [],
  constructorCounters : [],

  orderNum: '----',
  orderIsLoading: false,
  orderHasError: false
};

export const getOrderNumber = (data) => {
  return function (dispatch) {
    dispatch({
      type: CONSTRUCTOR_GET_ORDERNUM
    });
    try {
      postConstructorDataToApi(
          NORMA_API, {
            'ingredients': data.map(item => item.ingredient._id)
          }
        )
        .then(data => {
          dispatch({
            type: CONSTRUCTOR_GET_ORDERNUM_SUCCESS,
            orderNum: data.number
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: CONSTRUCTOR_GET_ORDERNUM_FAILED,
          });
        });
    } catch (error) {
      console.error(error);
      dispatch({
        type: CONSTRUCTOR_GET_ORDERNUM_FAILED,
      });
    }
  };
};

export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD_INGREDIENT: {
      const newConstructorCounters = JSON.parse(JSON.stringify(state.constructorCounters));
      const ingredient = newConstructorCounters.find(ingredient => ingredient._id === action.ingredient._id);
      if (ingredient) {
        ingredient.count = ingredient.count + 1;
      } else {
        newConstructorCounters.push({
          _id: action.ingredient._id,
          count: action.ingredient.type === 'bun' ? 2 : 1
        });
      }
      return {
        ...state,
        constructorList: [...state.constructorList,
          {
            uuid: action.uuid,
            ingredient: action.ingredient
          }
        ],
        constructorCounters: newConstructorCounters
      };
    }
    case CONSTRUCTOR_REMOVE_INGREDIENT: {
      const newConstructorCounters = JSON.parse(JSON.stringify(state.constructorCounters));
      const constructorItem = state.constructorList.find(ingredient => ingredient.uuid === action.uuid);
      const constructorNum = state.constructorList.findIndex(ingredient => ingredient.uuid === action.uuid);
      const ingredient = newConstructorCounters.find(ingredient => ingredient._id === constructorItem.ingredient._id);
      ingredient.count = constructorItem.ingredient.type === 'bun' ? ingredient.count - 2 : ingredient.count - 1;
      if (ingredient.count <= 0) {
        newConstructorCounters.splice(constructorNum, 1);
      }
      return {
        ...state,
        constructorList: state.constructorList.filter(ingredient => ingredient.uuid !== action.uuid),
        constructorCounters: newConstructorCounters
      };
    }
    case CONSTRUCTOR_CLEAR_INGREDIENTS:
      return {
        ...state,
        constructorList: [],
          ingredientsCounters: []
      };
    case CONSTRUCTOR_GET_ORDERNUM:
      return {
        ...state,
        orderIsLoading: true,
          orderHasError: false
      };
    case CONSTRUCTOR_GET_ORDERNUM_SUCCESS:
      return {
        ...state,
        orderIsLoading: false,
          orderHasError: false,
          orderNum: action.orderNum
      };
    case CONSTRUCTOR_GET_ORDERNUM_FAILED:
      return {
        ...state,
        orderIsLoading: false,
          orderHasError: true,
          orderNum: 'Error!'
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