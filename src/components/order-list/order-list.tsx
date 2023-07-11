import { FC } from 'react';

import AppScrollbar from '../app-scrollbar/app-scrollbar';
import OrderCard from '../order-card/order-card';

import OrderListStyles from './order-list.module.css';

type TOrderList = {
  title?: string;
  width?: string;
}

const OrderList: FC<TOrderList> = ({title, width}) => {
  return (
    <section className={OrderListStyles.content} style={width ? {'width': width} : undefined}>
      {title 
        && <h2 className="text text_type_main-large mt-10 mb-5">{title}</h2>
      }
      <AppScrollbar style={{maxHeight: 'calc(100vh - 200px)'}}>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </AppScrollbar>
    </section>
  )
};

export default OrderList;