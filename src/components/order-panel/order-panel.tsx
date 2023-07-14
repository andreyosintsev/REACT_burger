import { FC } from 'react';
import { useSelector } from '../../declarations/hooks';

import AppScrollbar from '../app-scrollbar/app-scrollbar';

import { wsFeedMessage } from '../../services/selectors/ws-feed-middleware';

import OrderPanelStyles from './order-panel.module.css';

const OrderPanel: FC = () => {
  const message = useSelector(wsFeedMessage);

  const ordersDone = message 
  ? message.orders.filter(order =>(order.status === 'done')).slice(0, 10)
  : [];

  const ordersNotDone = message 
  ? message.orders.filter(order =>(order.status !== 'done')).slice(0, 10)
  : [];

  return (
    <section className={OrderPanelStyles.content}>
      <AppScrollbar style={{maxHeight: 'calc(100vh - 10px)', overflow: 'hidden'}}>
        <div className={`${OrderPanelStyles.header} mb-15`}>
          <div className={OrderPanelStyles.header_ready}>
            <p className="text text_type_main-medium mb-6">Готовы</p>
            <ul className={OrderPanelStyles.order_list}>
              {ordersDone.map(order => 
                <li key={order.number}><p className="text text_type_digits-default">{order.number}</p></li>
              )}
            </ul>
          </div>
          <div className={OrderPanelStyles.header_process}>
            <p className="text text_type_main-medium mb-6">В работе</p>
            <ul className={OrderPanelStyles.order_list}>
              {ordersNotDone.map(order => 
                <li key={order.number}><p className="text text_type_digits-default">{order.number}</p></li>
              )}
            </ul>
          </div>
        </div>
        <div className={`${OrderPanelStyles.total_overall} mb-15`}>
          <p className="text text_type_main-medium">Выполнено за все время</p>
          <p className="text text_type_digits-large">{message && message.total.toString()}</p>
        </div>
        <div className={OrderPanelStyles.total_today}>
          <p className="text text_type_main-medium">Выполнено за сегодня</p>
          <p className="text text_type_digits-large">{message && message.totalToday.toString()}</p>
        </div>
      </AppScrollbar>
    </section>
  )
}

export default OrderPanel;