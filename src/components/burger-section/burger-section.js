import PropTypes from 'prop-types';

import Ingredient from '../burger-ingredient/burger-ingredient';

import BurgerSectionStyles from './burger-section.module.css';

function BurgerSection({id, title, ingredients, onShowDetails}) {
  return (
    <>
      <h3 className="text text_type_main-medium mt-2" id={id}>{title}</h3>
        <div className={`${BurgerSectionStyles.sections} pl-4`}>
          <ul>
            { 
              ingredients.map((ingredient) => (
                <li data-id={ingredient._id} key={ingredient._id} onClick={onShowDetails}>
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

BurgerSection.propTypes = {
  id:             PropTypes.string.isRequired,
  title:          PropTypes.string.isRequired,
  ingredients:    PropTypes.array.isRequired,
  onShowDetails:  PropTypes.func.isRequired
}

export default BurgerSection