import { RootState } from '../../declarations/types';

import { TConstructorIngredientsState } from '../reducers/burger-constructor-ingredients';
import { TConstructorOrderState } from '../reducers/burger-constructor-orders';

export const burgerConstructorIngredients = (store: RootState): TConstructorIngredientsState => store.burgerConstructorIngredients;
export const burgerConstructorOrders = (store: RootState): TConstructorOrderState => store.burgerConstructorOrders;