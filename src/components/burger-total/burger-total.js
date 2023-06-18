import { useSelector } from 'react-redux';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { burgerConstructorIngredients } from '../../services/selectors/burger-constructor';

function BurgerTotal() {
  const { constructorList, bun } = useSelector(burgerConstructorIngredients);
  const bunPrice = bun ? bun.ingredient.price : 0;

  const sum = constructorList
  ? constructorList.reduce((acc, curr) => acc + curr.ingredient.price, 0) + bunPrice * 2 
  : 0;

  return (
    <div>
      <p className="text text_type_digits-medium">
        {sum}<CurrencyIcon type="primary" />
      </p>
    </div>
  );
}

export default BurgerTotal