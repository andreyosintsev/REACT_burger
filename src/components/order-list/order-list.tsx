import { FC } from 'react';
import { useSelector } from '../../declarations/hooks';

import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppScrollbar from '../app-scrollbar/app-scrollbar';
import OrderCard from '../order-card/order-card';

import { TWSOrder } from '../../declarations/ws-middleware';
import { wsFeedOrders } from '../../services/selectors/ws-middleware';
import { wsProfileOrders } from '../../services/selectors/ws-middleware';

import OrderListStyles from './order-list.module.css';

type TOrderList = {
  title?: string;
  width?: string;
  role: 'feed' | 'profile';
}

const OrderList: FC<TOrderList> = ({title, width, role}) => {
  const feedOrders = useSelector(wsFeedOrders);
  const profileOrders = useSelector(wsProfileOrders);
  let orders: TWSOrder[] | undefined;
  let displayStatus = false;
  
  switch (role) {
    case 'feed':
      orders = feedOrders;
      displayStatus = false;
      break;
    case 'profile':
      orders = profileOrders;
      displayStatus = true;
      break;
  } 

  return (
    <section className={OrderListStyles.content} style={width ? {'width': width} : undefined}>
      { title &&
        <h2 className="text text_type_main-large mt-10 mb-5">{title}</h2>
      }
      { orders &&
        <AppScrollbar style={{maxHeight: 'calc(100vh - 200px)'}}>
          <ul className={OrderListStyles.card}>
          {
            orders.map(order => (
              <li key={order._id}>
                <OrderCard order={order} displayStatus={displayStatus}/>
              </li>
            ))
          }
          </ul>
        </AppScrollbar>
      }
      {orders && orders.length === 0 &&       
        <p className="text text_type_main-medium">
          <InfoIcon type="primary"/> Заказы отсутствуют.
        </p>
      }
    </section>
  )
};

export default OrderList;