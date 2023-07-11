import { FC } from 'react';

import ProfileMenu from '../../../../components/profile-menu/profile-menu';
import AppScrollbar from '../../../../components/app-scrollbar/app-scrollbar';
import OrderList from '../../../../components/order-list/order-list';

import ProfileOrdersStyles from './profile-orders.module.css';

const ProfileOrders: FC = () => {
  return (
    <div className={ProfileOrdersStyles.wrapper}>
      <main className={ProfileOrdersStyles.content}>
        <ProfileMenu text = "В этом разделе вы можете просмотреть свою историю заказов"/>
        <div className={ProfileOrdersStyles.list}>
          <OrderList width="100%"/>    
        </div>
      </main>
    </div> 
  );
}

export default ProfileOrders