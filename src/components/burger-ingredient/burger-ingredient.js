import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientStyles from './burger-ingredient.module.css';

import { burgerConstructorIngredients } from '../../services/selectors/burger-constructor';

function BurgerIngredient({_id, image, price, title}) {

  const constructorList = useSelector(burgerConstructorIngredients).constructorList;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {_id}
  });

  const outCount = () => {
    const counter = constructorList
    ? constructorList.reduce((acc, curr) => {
        if (curr.ingredient._id === _id) {
          return curr.ingredient.type === 'bun' ? acc + 2 : acc + 1;
        }
        return acc; 
      }, 0)
    : 0;

    return counter && counter > 0 
    ? {count: counter, style: {display: "block"}} 
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
  _id:   PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default BurgerIngredient