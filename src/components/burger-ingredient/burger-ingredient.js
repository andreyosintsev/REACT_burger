import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { burgerConstructorIngredients } from '../../services/selectors/burger-constructor';

import BurgerIngredientStyles from './burger-ingredient.module.css';

function BurgerIngredient({_id, image, price, title}) {
  const location = useLocation();
  
  const {constructorList, bun} = useSelector(burgerConstructorIngredients);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {_id}
  });

  const outCount = () => {
    let counter = 0;

    if (bun && bun.ingredient._id === _id) {
      counter = 2;
    } else {
      counter = constructorList
      ? constructorList.reduce((acc, curr) => {
          if (curr.ingredient._id === _id) {
            return acc + 1;
          }
          return acc; 
        }, 0)
      : 0;
    }

    return counter > 0 
    ? {count: counter, style: {display: "block"}} 
    : {count: 0, style: {display: "none"}};
  };
  
  return (
    <Link key={_id}
          to={`/ingredients/${_id}`}
          state={{ background: location }}
          className={BurgerIngredientStyles.link}
    >
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
    </Link>
  );
}

BurgerIngredient.propTypes = {
  _id:   PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default BurgerIngredient