import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderList from '../../components/order-list/order-list';
import OrderPanel from '../../components/order-panel/order-panel';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE

} from '../../services/constants/ws-middleware';

import FeedStyles from './feed.module.css';

const Feed: FC = () => {

  const dispatch = useDispatch();

  dispatch({
    type: WS_CONNECTION_START
  });

  useEffect(() => {
    return () =>{
      dispatch({
        type: WS_CONNECTION_CLOSE
      })
    }
  });

  return (
    <main className={FeedStyles.content}>
      {false && 
      <p className="text text_type_main-medium">
          <InfoIcon type="primary"/> Ошибка связи сервером. Обновите страницу, нажав F5, или попробуйте позже.
      </p>
      }
      {true &&
        <>
          <OrderList title="Лента заказов" />
          <OrderPanel />
        </>
      }
    </main>
  )
};

export default Feed;