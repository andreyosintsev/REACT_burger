import React from 'react';

import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeaderStyles from './app-header.module.css';

function AppHeader() {
  return (
    <nav>
      <div className={`${AppHeaderStyles.wrapper} pt-4 pb-4`}>
        <div className={AppHeaderStyles.header_menu}>
          <div className={`${AppHeaderStyles.header_item} pt-4 pl-5 pr-5 pb-4`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </div>
          <div className={`${AppHeaderStyles.header_item} pt-4 pl-5 pr-5 pb-4`}>
            <ListIcon type="primary" />
            <p className="text text_type_main-default">Лента заказов</p>
          </div>
        </div>
          <div className={AppHeaderStyles.header_logo}>
            <Logo /> 
          </div>
          <div className={`${AppHeaderStyles.header_account} pt-4 pl-5 pr-5 pb-4`}>
            <ProfileIcon type="primary" />
            <p className="text text_type_main-default">Личный кабинет</p>
          </div>
      </div>
    </nav>
  );
}

export default AppHeader