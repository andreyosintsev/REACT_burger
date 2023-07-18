import { FC, useEffect } from 'react';

import { useDispatch } from '../../../../declarations/hooks';

import ProfileMenu from '../../../../components/profile-menu/profile-menu';
import OrderList from '../../../../components/order-list/order-list';

import { WS_ROLE_PROFILE } from '../../../../declarations/ws-middleware';

import { WS_CONNECTION_START,
         WS_CONNECTION_CLOSE
       } from '../../../../services/constants/ws-middleware';

import { PROFILE_API } from '../../../../declarations/constants';

import { getCookie, trimTokenBearer } from '../../../../utils/cookie';

import ProfileOrdersStyles from './profile-orders.module.css';

const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const accessToken = trimTokenBearer(getCookie('accessToken'));

  useEffect(() => {
    console.log('Profile mounts');
    dispatch({
      type: WS_CONNECTION_START,
      url: PROFILE_API + `?token=${accessToken}`
    });

    return (()=>{
      console.log('Profile unmounts');
      dispatch({
        type: WS_CONNECTION_CLOSE
      })
    })
  }, []);

  return (
    <div className={ProfileOrdersStyles.wrapper}>
      <main className={ProfileOrdersStyles.content}>
        <ProfileMenu text = "В этом разделе вы можете просмотреть свою историю заказов"/>
        <div className={ProfileOrdersStyles.list}>
          <OrderList width="100%" role={WS_ROLE_PROFILE}/>    
        </div>
      </main>
    </div> 
  );
}

export default ProfileOrders