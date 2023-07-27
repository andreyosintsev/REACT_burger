import { v4 as uuid } from 'uuid'; 

import { burgerConstructorIngredients, initialState } from './burger-constructor-ingredients';
import { TConstructorIngredientsActions } from '../actions/burger-constructor-ingredients';
import * as TActionTypes from '../constants/burger-constructor-ingredients';

const testBun = {
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
};

const testIngredient1 = {
  "_id": "643d69a5c3f7b9001cfa0941",
  "name": "Биокотлета из марсианской Магнолии",
  "type": "main",
  "proteins": 420,
  "fat": 142,
  "carbohydrates": 242,
  "calories": 4242,
  "price": 424,
  "image": "https://code.s3.yandex.net/react/code/meat-01.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
  "__v": 0
};

const testIngredient2 = {
  "_id": "643d69a5c3f7b9001cfa093e",
  "name": "Филе Люминесцентного тетраодонтимформа",
  "type": "main",
  "proteins": 44,
  "fat": 26,
  "carbohydrates": 85,
  "calories": 643,
  "price": 988,
  "image": "https://code.s3.yandex.net/react/code/meat-03.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
  "__v": 0
};

describe('burgerConstructorIngredients reducer', () => {
 
  it('should return initial state', () => {
    expect(
      burgerConstructorIngredients(undefined, {} as TConstructorIngredientsActions)
    ).toEqual(initialState);
  });

  it('should perform CONSTRUCTOR_ADD_INGREDIENT for bun', () => {
    const _uuid = uuid();
    const action = {
      type: TActionTypes.CONSTRUCTOR_ADD_INGREDIENT,
      uuid: _uuid, 
      ingredient: testBun
    }
    expect(
      burgerConstructorIngredients(initialState, action)
    ).toEqual({
      ...initialState,
      bun: { uuid: _uuid, ingredient: testBun }
    });
  });

  it('should perform CONSTRUCTOR_ADD_INGREDIENT for not bun', () => {
    const _uuid = uuid();
    const action = {
      type: TActionTypes.CONSTRUCTOR_ADD_INGREDIENT,
      uuid: _uuid, 
      ingredient: testIngredient1
    }
    expect(
      burgerConstructorIngredients(initialState, action)
    ).toEqual({
      ...initialState,
      constructorList: [{ uuid: _uuid, ingredient: testIngredient1 }],
      bun: null
    });
  });

  it('should perform CONSTRUCTOR_REMOVE_INGREDIENT for bun', () => {
    const _uuid = uuid();
    const initialState = {
      constructorList: [],
      bun: {
        uuid: _uuid,
        ingredient: testBun
      }
    }
    const action = {
      type: TActionTypes.CONSTRUCTOR_REMOVE_INGREDIENT,
      uuid: _uuid, 
    }
    expect(
      burgerConstructorIngredients(initialState, action)
    ).toEqual({
      ...initialState,
      constructorList: [],
      bun: null
    });
  });
  it('should perform CONSTRUCTOR_REMOVE_INGREDIENT for not bun', () => {
    const _uuid = uuid();
    const initialState = {
      constructorList: [{
        uuid: _uuid,
        ingredient: testIngredient1
      }],
      bun: null
    }
    const action = {
      type: TActionTypes.CONSTRUCTOR_REMOVE_INGREDIENT,
      uuid: _uuid, 
    }
    expect(
      burgerConstructorIngredients(initialState, action)
    ).toEqual({
      ...initialState,
      constructorList: [],
      bun: null
    });
  });
  it('should perform CONSTRUCTOR_CLEAR_INGREDIENTS', () => {
    const initialState = {
      constructorList: [{
        uuid: uuid(),
        ingredient: testIngredient1
      }],
      bun: {
        uuid: uuid(),
        ingredient: testBun
      }
    }
    const action = {
      type: TActionTypes.CONSTRUCTOR_CLEAR_INGREDIENTS,
    }
    expect(
      burgerConstructorIngredients(initialState, action)
    ).toEqual({
      ...initialState,
      constructorList: [],
      bun: null
    });
  });

  it('should perform CONSTRUCTOR_SWAP_INGREDIENTS', () => {
    const uuid1 = uuid();
    const uuid2 = uuid();
    const initialState = {
      constructorList: [{
        uuid: uuid1,
        ingredient: testIngredient1
      },
      {
        uuid: uuid2,
        ingredient: testIngredient2
      }],
      bun: null
    }
    const action = {
      type: TActionTypes.CONSTRUCTOR_SWAP_INGREDIENTS,
      sourceIngredientUuid: uuid1,
      targetIngredientUuid: uuid2
    }
    expect(
      burgerConstructorIngredients(initialState, action)
    ).toEqual({
      ...initialState,
      constructorList: [{
        uuid: uuid2,
        ingredient: testIngredient2
      }, {
        uuid: uuid1,
        ingredient: testIngredient1
      }]
    });
  });

  it('should perform CONSTRUCTOR_LOAD_INGREDIENTS', () => {
    const constructorList = [{
      uuid: uuid(),
      ingredient: testIngredient1,
    },
    {
      uuid: uuid(),
      ingredient: testIngredient2,
    }];
    const bun = {
      uuid: uuid(),
      ingredient: testBun
    }
    const action = {
      type: TActionTypes.CONSTRUCTOR_LOAD_INGREDIENTS,
      constructorList,
      bun
    }
    expect(
      burgerConstructorIngredients(initialState, action)
    ).toEqual({
      ...initialState,
      constructorList: constructorList,
      bun: bun
    });
  });
});