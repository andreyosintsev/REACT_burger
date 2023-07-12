import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import store from '../utils/store';

import { TConstructorIngredientsActions } from '../services/actions/burger-constructor-ingredients';
import { TConstructorGetOrderNumActions }  from '../services/actions/burger-constructor-orders';
import { TIngredientsDetailsActions } from '../services/actions/burger-ingredients-details';
import { TIngredientsRequestsActions } from '../services/actions/burger-ingredients-requests';
import { TUserActions } from '../services/actions/user';
import { TWSActions } from '../services/actions/ws-middleware';

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredients = Array<TIngredient>;

export type TConstructorIngredient = {
  ingredient: TIngredient;
  uuid: string;
};

export type TConstructorIngredients = Array<TConstructorIngredient>;

export type TBurgerItemType = {
  type: 'top' | 'bottom' | undefined;
}

export type TBurgerItem = {
  uuid: string;
  image: string;
  price: number;
  title: string;
  isLocked: boolean;
  type?: "top" | "bottom" | undefined;
  removeHandler: (type: 'top' | 'bottom' | undefined, uuid: string) => void;
}

export type TApplicationActions = 
  | TConstructorIngredientsActions
  | TConstructorGetOrderNumActions
  | TIngredientsDetailsActions
  | TIngredientsRequestsActions
  | TUserActions
  | TWSActions;

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, Action, RootState, TApplicationActions>;