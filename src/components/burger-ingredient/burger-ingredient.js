import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientStyles from './burger-ingredient.module.css';

function BurgerIngredient({_id, image, price, title}) {

  const constructorList = useSelector(state => state.burgerConstructor.constructorList);
  
  let count = 0;
  constructorList.forEach(item => {
    if (item.ingredient._id === _id) { 
      if (item.ingredient.type === 'bun') {
        count = count + 2;
      } else {
        count++;
      }
    }
  });

  const outCount = () => {
    return count > 0 ? {count: count, style: {display: "block"}} : {count: 0, style: {display: "none"}};
  };

  return (
    <div className={`${BurgerIngredientStyles.card} mt-6 mb-8`}>
      <div className={BurgerIngredientStyles.card_count} style={outCount().style}>
        <p className="text text_type_digits-default">{outCount().count}</p>
      </div>
      <div className={`${BurgerIngredientStyles.card_image} ml-4 mr-4 mb-1`}>
        <img src={image} alt={title} />
      </div>
      <div className={`${BurgerIngredientStyles.card_price} mb-1`}>
        <p className="text text_type_digits-default">{price}</p><CurrencyIcon type="primary" />
      </div>
      <div className={BurgerIngredientStyles.card_title}>
        <p className="text text_type_main-small">{title}</p>
      </div>
    </div>
  );
}

BurgerIngredient.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default BurgerIngredient