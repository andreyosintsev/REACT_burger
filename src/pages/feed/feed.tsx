import { FC } from 'react';

import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderList from '../../components/order-list/order-list';
import OrderPanel from '../../components/order-panel/order-panel';

import FeedStyles from './feed.module.css';

const Feed: FC = () => {
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