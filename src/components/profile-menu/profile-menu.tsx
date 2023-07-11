import { FC } from 'react';
import { useDispatch } from '../../declarations/hooks';

import { NavLink } from 'react-router-dom';

import { CONSTRUCTOR_CLEAR_INGREDIENTS } from '../../services/constants/burger-constructor-ingredients';

import { logoutUser  } from '../../services/actions/user';

import { getFromLocalStorage } from '../../utils/local-storage';

import ProfileMenuStyles from './profile-menu.module.css';

type TProfileMenu = {
  text: string;
}

const ProfileMenu: FC<TProfileMenu> = ({text}) => {
  const dispatch = useDispatch();
  const refreshToken = getFromLocalStorage('refreshToken');

  const onLogoutHandler = () => {
    dispatch({
      type: CONSTRUCTOR_CLEAR_INGREDIENTS
    });
    dispatch(logoutUser(refreshToken));
  };

  const setActiveStyle = ({isActive} : {isActive: boolean}) => isActive ? ProfileMenuStyles.active : ProfileMenuStyles.inactive;

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
        {text}
      </p>
  </aside>    
  )
}

export default ProfileMenu