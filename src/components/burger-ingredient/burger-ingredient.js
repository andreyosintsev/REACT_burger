import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientStyles from './burger-ingredient.module.css';

function BurgerIngredient({_id, image, price, title}) {

  const counters = useSelector(state => state.burgerConstructor.constructorCounters);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {_id}
  });

  const outCount = () => {
    if (!counters) {
      return {count: 0, style: {display: "none"}};
    }
    const counter = counters.find(counter => counter._id === _id);
    return counter && counter.count > 0 
    ? {count: counter.count, style: {display: "block"}} 
    : {count: 0, style: {display: "none"}};
  };

  return (
    <div className={`${BurgerIngredientStyles.card} mt-6 mb-8`} ref={dragRef}>
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