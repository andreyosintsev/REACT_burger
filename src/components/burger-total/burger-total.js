import { useSelector } from 'react-redux';


import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { burgerConstructorIngredients } from '../app/app';

function BurgerTotal() {
  const sum = useSelector(burgerConstructorIngredients).constructorList
              .reduce((acc, curr) => {
                const price = curr.ingredient.type === 'bun'
                ? curr.ingredient.price * 2 
                : curr.ingredient.price;
                return acc + price;
              }, 0 );

  return (
    <div>
      <p className="text text_type_digits-medium">
        {sum}<CurrencyIcon type="primary" />
      </p>
    </div>
  );
}

export default BurgerTotal