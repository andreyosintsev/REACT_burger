import { TIngredient, TIngredients } from '../declarations/types';

export const getIngredientDataById = (data: TIngredients, id: string): (TIngredient | undefined) => 
                                      data.find(data => data._id === id);