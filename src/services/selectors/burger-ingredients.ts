import { RootState } from '../../declarations/types';

import { TIngredientsRequestsState } from '../reducers/burger-ingredients-requests';
import { TBurgerIngredientsDetailState } from '../reducers/burger-ingredients-details';

export const burgerIngredientRequests = (store: RootState): TIngredientsRequestsState => store.burgerIngredientsRequests;
export const burgerIngredientsDetails = (store: RootState): TBurgerIngredientsDetailState => store.burgerIngredientsDetails;