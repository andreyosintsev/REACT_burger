import { postConstructorDataToApi } from '../../utils/burger-api';
import { NORMA_API } from '../../components/app/app';

import { CONSTRUCTOR_ADD_INGREDIENT } from "../actions/burger-constructor";
import { CONSTRUCTOR_REMOVE_INGREDIENT } from "../actions/burger-constructor";
import { CONSTRUCTOR_CLEAR_INGREDIENTS } from "../actions/burger-constructor";
import { CONSTRUCTOR_GET_ORDERNUM } from "../actions/burger-constructor";
import { CONSTRUCTOR_GET_ORDERNUM_SUCCESS } from "../actions/burger-constructor";
import { CONSTRUCTOR_GET_ORDERNUM_FAILED } from "../actions/burger-constructor";

const initialState = {
  constructorList : [],
  
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
        NORMA_API, 
        {'ingredients': data.map(item => item.ingredient._id)}
      )
      .then(data => {
        dispatch({
          type: CONSTRUCTOR_GET_ORDERNUM_SUCCESS,
          orderNum: data.number
        });
      })
      .catch ((error) => {
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
  console.log(action);
  switch (action.type) {
    case CONSTRUCTOR_ADD_INGREDIENT:
      return {
        ...state,
          constructorList: [...state.constructorList, 
            { 
              id: action.id, 
              ingredient: action.ingredient
            }
          ]
      };
    case CONSTRUCTOR_REMOVE_INGREDIENT:
      return {
        ...state,
          constructorList: state.constructorList.filter(ingredient => ingredient.id !== action.id)
      };
    case CONSTRUCTOR_CLEAR_INGREDIENTS:
      return {
        ...state,
          constructorList: []
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
    default: return state;
  }
};