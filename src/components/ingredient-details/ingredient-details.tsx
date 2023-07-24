import { FC } from 'react';

import { useSelector } from '../../declarations/hooks';
import { useParams } from 'react-router-dom';
import { TIngredients } from '../../declarations/types';

import {  burgerIngredientRequests, 
          burgerIngredientsDetails } from '../../services/selectors/burger-ingredients';

import { getIngredientDataById } from '../../utils/utils';

import IngredientDetailsStyles from './ingredient-details.module.css';

const IngredientDetails: FC = () => {
  const { ingredientsList, ingredientsIsLoading } : {
    ingredientsList: TIngredients;
    ingredientsIsLoading: boolean;
  } = useSelector(burgerIngredientRequests);

  const title: string  = 'Детали ингредиента';
  
  let data = useSelector(burgerIngredientsDetails).ingredientSelected || undefined;
  const { ingredientId } = useParams();

  if (!data || Object.keys(data).length === 0) {
    if (ingredientId) {
      data = getIngredientDataById(ingredientsList, ingredientId);
    };
  }

  return (
    <>
    {
      (!ingredientsIsLoading && data) ? (
        <div className={IngredientDetailsStyles.wrapper}>
          <div className={IngredientDetailsStyles.content}>
            <p className={`${IngredientDetailsStyles.title} text text_type_main-large`}>{title}</p>
            <div className={`${IngredientDetailsStyles.image} mb-4`}>
              <img 
                  src={data!.image} 
                  alt={data!.name}
              />
            </div>
            <div className="mb-8">
              <p className="text text_type_main-medium" data-test="ingredient-name">{data.name}</p>
            </div>
            <div className={`${IngredientDetailsStyles.specs}`}>
              <div className={`${IngredientDetailsStyles.specs_item} mr-5`}>
                <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                <p className="text text_type_digits-default text_color_inactive" data-test="calories">{data.calories}</p>
              </div>
              <div className={`${IngredientDetailsStyles.specs_item} mr-5`}>
                <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                <p className="text text_type_digits-default text_color_inactive" data-test="proteins">{data.proteins}</p>
              </div>
              <div className={`${IngredientDetailsStyles.specs_item} mr-5`}>
                <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                <p className="text text_type_digits-default text_color_inactive" data-test="fat">{data.fat}</p>
              </div>
              <div className={`${IngredientDetailsStyles.specs_item}`}>
                <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                <p className="text text_type_digits-default text_color_inactive" data-test="carbohydrates">{data.carbohydrates}</p>
              </div>
            </div>
          </div>
        </div>) : null 
      }
    </>
  );
}

export default IngredientDetails