import { useSelector } from 'react-redux';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetailsStyles from './order-details.module.css';

import { burgerConstructorOrders } from '../../services/selectors/burger-constructor';

function OrderDetails() {
  const orderNum = useSelector(burgerConstructorOrders).orderNum.toString();

  return (
    <div className={OrderDetailsStyles.content}>
      <div className={`${OrderDetailsStyles.num} mt-8 mb-8`}>
        <p className="text text_type_digits-large">{orderNum}</p>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">идентификатор заказа</p>
      </div>
      <div className={OrderDetailsStyles.checkmark}>
        <CheckMarkIcon type="primary" />
      </div>
      <div className="mt-15 mb-2">
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  );
}

export default OrderDetails