import { useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';

import {  CONSTRUCTOR_CLEAR_INGREDIENTS } from '../../services/actions/burger-constructor-ingredients';

import {  logoutUser  } from '../../services/actions/user';

import { getFromLocalStorage } from '../../utils/local-storage';
import ProfileMenuStyles from './profile-menu.module.css';

export function ProfileMenu () {
  const dispatch = useDispatch();
  const refreshToken = getFromLocalStorage('refreshToken');

  const onLogoutHandler = () => {
    dispatch({
      type: CONSTRUCTOR_CLEAR_INGREDIENTS
    });
    dispatch(logoutUser(refreshToken));
  };

  const setActiveStyle = ({isActive}) => isActive ? ProfileMenuStyles.active : ProfileMenuStyles.inactive;

  return (
    <aside className={ProfileMenuStyles.menu}>
      <NavLink className={ setActiveStyle } to="/profile">
        <p className={`text text_type_main-medium ${ProfileMenuStyles.clickable}`}>Профиль</p>
      </NavLink>
      <NavLink className={ setActiveStyle } to="/orders">
        <p className={`text text_type_main-medium ${ProfileMenuStyles.clickable}`}>История заказов</p>
      </NavLink>
      <p className={`text text_type_main-medium mb-20 ${ProfileMenuStyles.clickable}`} 
        onClick={() => onLogoutHandler()}>
        Выход
      </p>
      <p className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные.
      </p>
  </aside>    
  )
}