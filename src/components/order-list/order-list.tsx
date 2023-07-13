import { FC } from 'react';
import { useSelector } from '../../declarations/hooks';

import AppScrollbar from '../app-scrollbar/app-scrollbar';
import OrderCard from '../order-card/order-card';

import { wsOrders } from '../../services/selectors/ws-middleware';

import OrderListStyles from './order-list.module.css';

type TOrderList = {
  title?: string;
  width?: string;
}

const OrderList: FC<TOrderList> = ({title, width}) => {
  const orders = useSelector(wsOrders);


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
              <li key={order._id}><OrderCard id={order._id} displayStatus={false}/></li>
            ))
          }
          </ul>
        </AppScrollbar>
      }
    </section>
  )
};

export default OrderList;