import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../declarations/hooks';

import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppScrollbar from '../app-scrollbar/app-scrollbar';
import OrderCard from '../order-card/order-card';

import { TWSRole, WS_ROLE_FEED, WS_ROLE_PROFILE } from '../../declarations/ws-middleware';
import { wsOrders } from '../../services/selectors/ws-middleware';

import { getCookie, trimTokenBearer } from '../../utils/cookie';

import OrderListStyles from './order-list.module.css';

import { 
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE
} from '../../services/constants/ws-middleware';
import { 
  FEED_API, 
  PROFILE_API
} from '../../components/app/app';

type TOrderList = {
  title?: string;
  width?: string;
  role: TWSRole;
}

const OrderList: FC<TOrderList> = ({title, width, role}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = trimTokenBearer(getCookie('accessToken'));

    let url = '';

    switch (role) {
      case WS_ROLE_FEED: url = FEED_API; break;
      case WS_ROLE_PROFILE: url = PROFILE_API+'?token='+accessToken; break;
    }
    
    if (url) {    
      dispatch({
        type: WS_CONNECTION_START,
        url
      });
    }

    return (()=>{
      dispatch({
        type: WS_CONNECTION_CLOSE
      })
    })
  }, []);

  const orders = useSelector(wsOrders);
  let displayStatus = false;

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