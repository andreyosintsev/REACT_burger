import { FC, MouseEvent } from 'react';

import Ingredient from '../burger-ingredient/burger-ingredient';

import BurgerSectionStyles from './burger-section.module.css';
import { TIngredients } from '../../declarations/types';

type TBurgerSection = {
  id: string;
  title: string;
  ingredients: TIngredients;
  onShowDetails: (e: MouseEvent<HTMLLIElement> ) => void;
}

const BurgerSection: FC<TBurgerSection> = ({id, title, ingredients, onShowDetails}) => {
  return (
    <>
      <h3 className="text text_type_main-medium mt-2" id={id}>{title}</h3>
        <div className={`${BurgerSectionStyles.sections} pl-4`}>
          <ul data-test={id}>
            { 
              ingredients.map((ingredient) => (
                <li data-id={ingredient._id} key={ingredient._id} onClick={onShowDetails} >
                  <Ingredient 
                    _id = {ingredient._id}
                    image = {ingredient.image} 
                    price = {ingredient.price} 
                    title = {ingredient.name}
                  />
                </li>
              ))
            }
          </ul>
        </div>
    </>
  );
}

export default BurgerSection