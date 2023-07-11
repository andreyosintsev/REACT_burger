import { FC } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderIngredient from '../order-ingredient/order-ingredient';

import OrderInfoIngredientStyles from './order-info-ingredient.module.css';

const OrderInfoIngredient: FC = () => {
  return (
    <div className={`${OrderInfoIngredientStyles.content} mb-4`}>
      <div className={`${OrderInfoIngredientStyles.ingredient}`}>
        <OrderIngredient url="https://code.s3.yandex.net/react/code/bun-02-mobile.png" zIndex="50" />
        {/* <div className={`${OrderInfoIngredientStyles.name} ml-4`}> */}
          <p className="text text_type_main-small ml-4">
            Флюоресцентная булка R2-D3
          </p>
        {/* </div> */}
      </div>
      <div className={`${OrderInfoIngredientStyles.num_price} ml-4 mr-6`}>
        <p className="text text_type_digits-default">
          <span>2 x 20</span><CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  )
}

export default OrderInfoIngredient