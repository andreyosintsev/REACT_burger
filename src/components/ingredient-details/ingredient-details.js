import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {  burgerIngredientRequests, 
          burgerIngredientsDetails } from '../../services/selectors/burger-ingredients';

import { getIngredientDataById } from '../../utils/utils';

import IngredientDetailsStyles from './ingredient-details.module.css';

function IngredientDetails() {
  const { ingredientsList, ingredientsIsLoading } = useSelector(burgerIngredientRequests);

  let title = 'Детали ингредиента';
  let data = useSelector(burgerIngredientsDetails).ingredientSelected;
  const { ingredientId } = useParams();

  if (Object.keys(data).length === 0) {
    data = getIngredientDataById(ingredientsList, ingredientId);
  }

  return (
    !ingredientsIsLoading &&
    <>
      <div className={IngredientDetailsStyles.wrapper}>
        <div className={IngredientDetailsStyles.content}>
          <p className={`${IngredientDetailsStyles.title} text text_type_main-large`}>{title}</p>
          <div className={`${IngredientDetailsStyles.image} mb-4`}>
            <img 
                src={data.image} 
                alt={data.name}
            />
          </div>
          <div className="mb-8">
            <p className="text text_type_main-medium">{data.name}</p>
          </div>
          <div className={`${IngredientDetailsStyles.specs}`}>
            <div className={`${IngredientDetailsStyles.specs_item} mr-5`}>
              <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
              <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
            </div>
            <div className={`${IngredientDetailsStyles.specs_item} mr-5`}>
              <p className="text text_type_main-default text_color_inactive">Белки, г</p>
              <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
            </div>
            <div className={`${IngredientDetailsStyles.specs_item} mr-5`}>
              <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
              <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
            </div>
            <div className={`${IngredientDetailsStyles.specs_item}`}>
              <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IngredientDetails