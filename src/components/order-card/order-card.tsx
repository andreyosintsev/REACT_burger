import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from '../../declarations/hooks';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderIngredient from '../order-ingredient/order-ingredient';

import { wsOrders } from '../../services/selectors/ws-middleware';

import OrderCardStyles from './order-card.module.css';

type TOrderCard = {
  id: string;
  displayStatus: boolean;
}

const OrderCard: FC<TOrderCard> = ({ id, displayStatus }) => {
  const orders = useSelector(wsOrders);
  const location = useLocation();
  console.log("Current Location");
  console.log(location);

  const link: string = location.pathname === '/profile/orders' ? '/profile/orders/id' : '/feed/id';

  const order = orders!.find(order => order._id === id)!;
  let status: string = '';

  switch (order.status) {
    case 'done': status = "Выполнен"; break;
    case 'cancelled': status = "Отменён"; break;
  }
  
  return (
    // <Link key={_id}
    //   to={`/ingredients/${_id}`}
    //   state={{ background: location }}
    //   className={BurgerIngredientStyles.link}
    // >
    <Link
      to={link}
      state={{ background: location }}
      className={OrderCardStyles.link}
    >
      <div className = {`${OrderCardStyles.card} pt-6 pl-6 pr-6 pb-6`}>
        <div className = {`${OrderCardStyles.card_header} mb-6`}>
          <div className = {OrderCardStyles.card_header_counter}>
            <p className="text text_type_digits-default">
              #{order.number}
            </p>
          </div>
          <div className = {OrderCardStyles.card_header_date}>
            <p className="text text_type_main-small text_color_inactive">
              <FormattedDate date={ 
                new Date(order.updatedAt)
              } />
            </p>
          </div>
        </div>
        <div className = {OrderCardStyles.card_title}>
          <p className="text text_type_main-medium">
            {order.name}
          </p>
        </div>
        { displayStatus && 
          <div className = {`${OrderCardStyles.card_status} ${OrderCardStyles.created} mt-2`}>
            <p className="text text_type_main-small">
              {status}
            </p>
          </div>
        }
        <div className = {`${OrderCardStyles.card_content} mt-6`}>
          <div className = {OrderCardStyles.card_content_ingredients}>
            <OrderIngredient url="https://code.s3.yandex.net/react/code/bun-02-mobile.png" zIndex="50" />
            <OrderIngredient url="https://code.s3.yandex.net/react/code/sauce-04-mobile.png" zIndex="40" />
            <OrderIngredient url="https://code.s3.yandex.net/react/code/meat-01-mobile.png" zIndex="30" />
            <OrderIngredient url="https://code.s3.yandex.net/react/code/meat-03-mobile.png" zIndex="20" />
            <OrderIngredient url="https://code.s3.yandex.net/react/code/sp_1-mobile.png" zIndex="10" />
          </div>
          <div className = {`${OrderCardStyles.card_content_price}`}>
            <p className="text text_type_digits-default">
              <span>480</span><CurrencyIcon type="primary" />
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default OrderCard;