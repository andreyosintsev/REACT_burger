import React from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerTotal({sum}) {
  return (
    <div>
      <p className="text text_type_digits-medium">
        {sum}<CurrencyIcon type="primary" />
      </p>
    </div>
  );
}

BurgerTotal.propTypes = {
  sum: PropTypes.number.isRequired
}

export default BurgerTotal