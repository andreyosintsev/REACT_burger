import { combineReducers } from '@reduxjs/toolkit';

import { burgerConstructorIngredients } from './burger-constructor-ingredients';
import { burgerConstructorOrders } from './burger-constructor-orders';
import { burgerIngredientsDetails } from './burger-ingredients-details';
import { burgerIngredientsRequests } from './burger-ingredients-requests';
import { user } from './user';

export const rootReducer = combineReducers({
  burgerConstructorIngredients,
  burgerConstructorOrders,
  burgerIngredientsDetails,
  burgerIngredientsRequests,
  user
});