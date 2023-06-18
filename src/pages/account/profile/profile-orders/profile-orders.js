import { ProfileMenu } from '../../../../components/profile-menu/profile-menu';

import ProfileOrdersStyles from './profile-orders.module.css';

function ProfileOrders() {
  return (
    <div className={ProfileOrdersStyles.wrapper}>
      <main className={ProfileOrdersStyles.content}>
        <ProfileMenu />
        <div className={ProfileOrdersStyles.list}>
          <p className="text text_type_main-medium">Здесь будет лента заказов</p>
        </div>
      </main>
    </div> 
  );
}

export default ProfileOrders