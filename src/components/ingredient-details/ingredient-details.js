import React from 'react';
import { useSelector } from 'react-redux';

import BurgerIngredientsProps from '../burger-ingredients/burger-ingredients-props';

import IngredientDetailsStyles from './ingredient-details.module.css';

function IngredientDetails() {
  
  const ingredientData = useSelector(store => store.burgerIngredients.ingredientSelected);

  return (
    <div className={IngredientDetailsStyles.content}>
      <div className={`${IngredientDetailsStyles.image} mb-4`}>
        <img 
            src={ingredientData.image} 
            alt={ingredientData.name}
        />
      </div>
      <div className={`${IngredientDetailsStyles.caption} mb-8`}>
        <p className="text text_type_main-medium">{ingredientData.name}</p>
      </div>
      <div className={`${IngredientDetailsStyles.specs}`}>
        <div className={`${IngredientDetailsStyles.specs_item} mr-5`}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientData.calories}</p>
        </div>
        <div className={`${IngredientDetailsStyles.specs_item} mr-5`}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientData.proteins}</p>
        </div>
        <div className={`${IngredientDetailsStyles.specs_item} mr-5`}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientData.fat}</p>
        </div>
        <div className={`${IngredientDetailsStyles.specs_item}`}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientData.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredientData: BurgerIngredientsProps
}

export default IngredientDetails