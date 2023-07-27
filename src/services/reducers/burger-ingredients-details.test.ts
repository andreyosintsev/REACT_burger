import { burgerIngredientsDetails, initialState } from './burger-ingredients-details';
import { TIngredientsDetailsActions } from '../actions/burger-ingredients-details';
import * as TActionTypes from '../constants/burger-ingredients-details';

const ingredient = {
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
}

describe('burgerIngredientsDetails reducer', () => {
 
  it('should return initial state', () => {
    expect(
      burgerIngredientsDetails(undefined, {} as TIngredientsDetailsActions)
    ).toEqual(initialState);
  });

  it('should perform INGREDIENTS_SELECT_INGREDIENT', () => {
    const action = {
      type: TActionTypes.INGREDIENTS_SELECT_INGREDIENT,
      ingredientSelected: ingredient
    }
    expect(
      burgerIngredientsDetails(initialState, action
      )
    ).toEqual({
      ingredientSelected: ingredient
    });
  });

  it('should perform INGREDIENTS_DESELECT_INGREDIENT', () => {
    const action = {
      type: TActionTypes.INGREDIENTS_DESELECT_INGREDIENT,
    }
    expect(
      burgerIngredientsDetails(initialState, action)
    ).toEqual({
      ingredientSelected: null
      });
  });
});