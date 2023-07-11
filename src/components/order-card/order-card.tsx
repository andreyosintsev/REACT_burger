import { FC } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderIngredient from '../order-ingredient/order-ingredient';

import orderCardStyles from './order-card.module.css';

const OrderCard: FC = () => {
  return (
    <div className = {`${orderCardStyles.card} pt-6 pl-6 pr-6 pb-6`}>
      <div className = {`${orderCardStyles.card_header} mb-6`}>
        <div className = {orderCardStyles.card_header_counter}>
          <p className="text text_type_digits-default">
            #034535
          </p>
        </div>
        <div className = {orderCardStyles.card_header_date}>
          <p className="text text_type_main-small text_color_inactive">
            Сегодня, 16:20
          </p>
        </div>
      </div>
      <div className = {orderCardStyles.card_title}>
        <p className="text text_type_main-medium">
          Death Star Starship Main бургер
        </p>
      </div>
      <div className = {`${orderCardStyles.card_status} mt-2`}>
        <p className="text text_type_main-small">
          Создан
        </p>
      </div>
      <div className = {`${orderCardStyles.card_content} mt-6`}>
        <div className = {orderCardStyles.card_content_ingredients}>
          <OrderIngredient url="https://code.s3.yandex.net/react/code/bun-02-mobile.png" zIndex="50" />
          <OrderIngredient url="https://code.s3.yandex.net/react/code/sauce-04-mobile.png" zIndex="40" />
          <OrderIngredient url="https://code.s3.yandex.net/react/code/meat-01-mobile.png" zIndex="30" />
          <OrderIngredient url="https://code.s3.yandex.net/react/code/meat-03-mobile.png" zIndex="20" />
          <OrderIngredient url="https://code.s3.yandex.net/react/code/sp_1-mobile.png" zIndex="10" />
        </div>
        <div className = {`${orderCardStyles.card_content_price}`}>
          <p className="text text_type_digits-default">
             <span>480</span><CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderCard;