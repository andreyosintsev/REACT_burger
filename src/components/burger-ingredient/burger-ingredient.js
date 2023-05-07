import React, {useState}  from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientStyles from './burger-ingredient.module.css';

function BurgerIngredient({image, price, title}) {

  //Состояние хранит количество ингредиента
  //Временно, только для демонстрации цифры количества ингредиентов
  const [count, setCount] = useState(Math.trunc(price/1000));

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