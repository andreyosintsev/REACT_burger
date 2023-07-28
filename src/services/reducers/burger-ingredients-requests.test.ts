import { burgerIngredientsRequests, initialState } from './burger-ingredients-requests';
import { TIngredientsRequestsActions } from '../actions/burger-ingredients-requests';
import * as TActionTypes from '../constants/burger-ingredients-requests';

const ingredients = [{
  "_id": "643d69a5c3f7b9001cfa093c",
  "name": "Краторная булка N-200i",
  "type": "bun",
  "proteins": 80,
  "fat": 24,
  "carbohydrates": 53,
  "calories": 420,
  "price": 1255,
  "image": "https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v": 0
}];

describe('burgerIngredientsRequests reducer', () => {
 
  it('should return initial state', () => {
    expect(
      burgerIngredientsRequests(
        undefined,
        {} as TIngredientsRequestsActions
      )
    ).toEqual(initialState);
  });

  it('should perform INGREDIENTS_GET_INGREDIENTS', () => {
    const action = {
      type: TActionTypes.INGREDIENTS_GET_INGREDIENTS
    }
    expect(
      burgerIngredientsRequests(
        initialState,
        action
      )
    ).toEqual({
      ingredientsList: [],
      ingredientsIsLoading: true,
      ingredientsHasError: false
      });
  });

  it('should perform INGREDIENTS_GET_INGREDIENTS_SUCCESS', () => {
    const action = {
      type: TActionTypes.INGREDIENTS_GET_INGREDIENTS_SUCCESS,
      ingredientsList: ingredients 
    }
    expect(
      burgerIngredientsRequests(
        initialState,
        action
      )
    ).toEqual({
      ingredientsList: ingredients,
      ingredientsIsLoading: false,
      ingredientsHasError: false
      });
  });

  it('should perform INGREDIENTS_GET_INGREDIENTS_FAILED', () => {
    const action = {
      type: TActionTypes.INGREDIENTS_GET_INGREDIENTS_FAILED
    }
    expect(
      burgerIngredientsRequests(
        initialState,
        action
      )
    ).toEqual({
      ...initialState,
      ingredientsIsLoading: false,
      ingredientsHasError: true
      });
  });
});