import { Link, NavLink } from "react-router-dom";

import {  Logo, 
          BurgerIcon, 
          ListIcon, 
          ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeaderStyles from './app-header.module.css';

function AppHeader() {

  const setActiveStyle = ({isActive}) => isActive ? AppHeaderStyles.active : AppHeaderStyles.inactive;

  return (
    <nav>
      <div className={`${AppHeaderStyles.wrapper} pt-4 pb-4`}>
        <div className={AppHeaderStyles.header_menu}>
          <div className={`${AppHeaderStyles.header_item} pt-4 pl-5 pr-5 pb-4`}>
            <NavLink className={ setActiveStyle } to="/">
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default">
                Конструктор
              </p>
            </NavLink>  
          </div>
          <div className={`${AppHeaderStyles.header_item} pt-4 pl-5 pr-5 pb-4`}>
            <NavLink className={ setActiveStyle } to="/">
              <ListIcon type="primary" />
              <p className="text text_type_main-default">
                Лента заказов
              </p>
            </NavLink>
          </div>
        </div>
          <div className={AppHeaderStyles.header_logo}>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className={`${AppHeaderStyles.header_account} pt-4 pl-5 pr-5 pb-4`}>
            <NavLink className={ setActiveStyle } to="/profile">
              <ProfileIcon type="primary" />
              <p className="text text_type_main-default">
                Личный кабинет
              </p>
            </NavLink>
          </div>
      </div>
    </nav>
  );
}

export default AppHeader