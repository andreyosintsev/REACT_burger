import { TIngredient, TIngredients } from '../declarations/types';

export const getIngredientDataById = (data: TIngredients, id: string): (TIngredient | undefined) => 
                                      data.find(data => data._id === id);

export const convertStatus = (orderStatus: string) =>{
  let status: string;

  switch (orderStatus) {
    case 'created':   status = "Создан"; break;
    case 'pending':   status = "Готовится"; break;
    case 'done':      status = "Выполнен"; break;
    case 'cancelled': status = "Отменён"; break;
    default:          status = "Ошибка";
  }

  return status;
} 
