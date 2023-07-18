import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../declarations/hooks';

import { 
  InfoIcon,
  CurrencyIcon, 
  FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { getCookie, trimTokenBearer } from '../../utils/cookie';

import AppScrollbar from '../../components/app-scrollbar/app-scrollbar';
import OrderInfoIngredient from '../../components/order-info-ingredient/order-info-ingredient';

import { burgerIngredientRequests } from '../../services/selectors/burger-ingredients';
import { wsOrders } from '../../services/selectors/ws-middleware';

import { convertStatus } from '../../utils/utils';

import OrderInfoStyles from './order-info.module.css';

import { TWSRole, WS_ROLE_FEED, WS_ROLE_PROFILE } from '../../declarations/ws-middleware';

import { 
  WS_CONNECTION_START,
} from '../../services/constants/ws-middleware';

import { FEED_API } from '../../declarations/constants';
import { PROFILE_API } from '../../declarations/constants';

type TOrderInfo = {
  role: TWSRole;
}

const OrderInfo: FC<TOrderInfo> = ({ role }) => {
  console.log('In Order info');
  const ingredientsList = useSelector(burgerIngredientRequests).ingredientsList;
  const orders = useSelector(wsOrders);
  const dispatch = useDispatch();
  
  const { id } = useParams();

  const accessToken = trimTokenBearer(getCookie('accessToken'));

  let url = '';

  switch (role) {
    case WS_ROLE_FEED: url = FEED_API; break;
    case WS_ROLE_PROFILE: url = PROFILE_API+'?token='+accessToken; break;
  }

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      url
    });
  }, []);
  
  const order = id && orders ? orders.find(order => order._id === id) : undefined;

  const sum = order ? order.ingredients.reduce((acc, curr, i, arr: string[]) => 
    acc += ingredientsList.find(data => data._id === arr[i])!.price, 0
  ) : undefined;

  const ingredientsQuantity = order 
  ? order.ingredients.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) 
  : undefined;

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
              return <li key={ingredient[0]}><OrderInfoIngredient id={ingredient[0]} pts={ingredient[1]}/></li>
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
    {!order && 
      <div className={OrderInfoStyles.wrapper}>
        <div className={OrderInfoStyles.content}>
          <p className={`${OrderInfoStyles.error} text text_type_main-medium`}>
            <InfoIcon type="primary"/> Заказ не найден.
          </p>
        </div>
      </div>
    }
    </>
  );
};

export default OrderInfo;