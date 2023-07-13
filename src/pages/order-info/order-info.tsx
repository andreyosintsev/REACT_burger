import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { 
  CurrencyIcon, 
  FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from '../../declarations/hooks';

import AppScrollbar from '../../components/app-scrollbar/app-scrollbar';
import OrderInfoIngredient from '../../components/order-info-ingredient/order-info-ingredient';

import { burgerIngredientRequests } from '../../services/selectors/burger-ingredients';
import { wsOrders } from '../../services/selectors/ws-middleware';

import { convertStatus } from '../../utils/utils';

import OrderInfoStyles from './order-info.module.css';

type TIngredientsQuantity = {
  [key: string]: number;
}

const OrderInfo: FC = () => {

  const ingredientsList = useSelector(burgerIngredientRequests).ingredientsList;
  const orders = useSelector(wsOrders);
  const { id } = useParams();



  const order = id && orders ? orders.find(order => order._id === id) : undefined;
 
  const sum = order ? order.ingredients.reduce((acc, curr, i, arr) => 
    acc += ingredientsList.find(data => data._id === arr[i])!.price, 0
  ) : undefined;

  const ingredientsQuantity = order 
  ? order.ingredients.reduce((acc: TIngredientsQuantity, el: string) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {}) 
  : undefined;

  console.log('OrderInfo: id');
  console.log(id);
  console.log('OrderInfo: orderS');
  console.log(orders);
  console.log('OrderInfo: order');
  console.log(order);

  return (
    <>
    {order && ingredientsQuantity &&
    <div className={OrderInfoStyles.wrapper}>
      <div className={OrderInfoStyles.content}>
          <div className={`${OrderInfoStyles.order_num}`}>
            <p className="text text_type_digits-default">
              #{order.number}
            </p>
          </div>
          <div className={`${OrderInfoStyles.order_name} mt-10 mb-3`}>
            <p className="text text_type_main-medium">
              {order.name}
            </p>
          </div>
          <div className={`${OrderInfoStyles.order_status} mb-15`}>
            <p className="text text_type_main-small">
              {convertStatus(order.status)}
            </p>
          </div>
          <div className={`${OrderInfoStyles.order_title} mb-6`}>
            <p className="text text_type_main-medium">
              Состав:
            </p>
          </div>
          <div className={`${OrderInfoStyles.order_content} mb-10`}>
            <AppScrollbar  style={{height: '300px'}}>
            <ul>
            {
              Object.entries(ingredientsQuantity).map(ingredient => {
                return <OrderInfoIngredient id={ingredient[0]} pts={ingredient[1]}/>
              })
            }
            </ul>            
            </AppScrollbar>
          </div>          
          <div className={`${OrderInfoStyles.order_footer}`}>
            <div className = {OrderInfoStyles.order_footer_date}>
              <p className="text text_type_main-small text_color_inactive">
                <FormattedDate date={ 
                  new Date(order.updatedAt)
                } />
              </p>
            </div>
            <div className = {OrderInfoStyles.order_footer_price}>
              <p className="text text_type_digits-default">
                <span>{sum}</span><CurrencyIcon type="primary" />
              </p>
            </div>
          </div> 
      </div>
    </div>
    }
    {!order && null}
    </>
  );
};

export default OrderInfo;