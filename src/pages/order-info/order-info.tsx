import { FC } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppScrollbar from '../../components/app-scrollbar/app-scrollbar';
import OrderInfoIngredient from '../../components/order-info-ingredient/order-info-ingredient';

import OrderInfoStyles from './order-info.module.css';

const OrderInfo: FC = () => {
  return (
    <div className={OrderInfoStyles.wrapper}>
      <div className={OrderInfoStyles.content}>
          <div className={`${OrderInfoStyles.order_num}`}>
            <p className="text text_type_digits-default">
              #034533
            </p>
          </div>
          <div className={`${OrderInfoStyles.order_name} mt-10 mb-3`}>
            <p className="text text_type_main-medium">
              Black Hole Singularity острый бургер
            </p>
          </div>
          <div className={`${OrderInfoStyles.order_status} mb-15`}>
            <p className="text text_type_main-small">
              Выполнен
            </p>
          </div>
          <div className={`${OrderInfoStyles.order_title} mb-6`}>
            <p className="text text_type_main-medium">
              Состав:
            </p>
          </div>
          <div className={`${OrderInfoStyles.order_content} mb-10`}>
            <AppScrollbar  style={{height: '300px'}}>
              <OrderInfoIngredient />
              <OrderInfoIngredient />
              <OrderInfoIngredient />
              <OrderInfoIngredient />
              <OrderInfoIngredient />              
            </AppScrollbar>
          </div>          
          <div className={`${OrderInfoStyles.order_footer}`}>
            <div className = {OrderInfoStyles.order_footer_date}>
              <p className="text text_type_main-small text_color_inactive">
                Сегодня, 16:20
              </p>
            </div>
            <div className = {OrderInfoStyles.order_footer_price}>
              <p className="text text_type_digits-default">
                <span>540</span><CurrencyIcon type="primary" />
              </p>
            </div>
          </div> 
      </div>
    </div>
  );
};

export default OrderInfo;