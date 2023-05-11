import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import {BurgerTotalContext} from '../../utils/burger-api';

function BurgerTotal() {
  const sum = useContext(BurgerTotalContext);

  return (
    <div>
      <p className="text text_type_digits-medium">
        {sum}<CurrencyIcon type="primary" />
      </p>
    </div>
  );
}

export default BurgerTotal