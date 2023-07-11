import { FC } from 'react'

import AppScrollbar from '../app-scrollbar/app-scrollbar';

import OrderPanelStyles from './order-panel.module.css';

const OrderPanel: FC = () => {
  return (
    <section className={OrderPanelStyles.content}>
      <AppScrollbar style={{maxHeight: 'calc(100vh - 10px)', overflow: 'hidden'}}>
        <div className={`${OrderPanelStyles.header} mb-15`}>
          <div className={OrderPanelStyles.header_ready}>
            <p className="text text_type_main-medium mb-6">Готовы</p>
            <p className="text text_type_digits-default">
            <ul className={OrderPanelStyles.order_list}>
              <li>034533</li>
              <li>034532</li>
              <li>034530</li>
              <li>034527</li>
              <li>034525</li>
            </ul>
            </p>
          </div>
          <div className={OrderPanelStyles.header_process}>
            <p className="text text_type_main-medium mb-6">В работе</p>
            <p className="text text_type_digits-default">
            <ul className={OrderPanelStyles.order_list}>
              <li>034538</li>
              <li>034540</li>
              <li>034541</li>
            </ul>
            </p>
          </div>
        </div>
        <div className={`${OrderPanelStyles.total_overall} mb-15`}>
          <p className="text text_type_main-medium">Выполнено за все время</p>
          <p className="text text_type_digits-large">28752</p>
        </div>
        <div className={OrderPanelStyles.total_today}>
          <p className="text text_type_main-medium">Выполнено за сегодня</p>
          <p className="text text_type_digits-large">138</p>
        </div>
      </AppScrollbar>
    </section>
  )
}

export default OrderPanel;