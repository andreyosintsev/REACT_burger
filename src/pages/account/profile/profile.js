import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { logoutUser } from '../../../services/actions/user';
import { getFromLocalStorage } from '../../../utils/local-storage';

import { userData } from '../../../services/selectors/user';

import { clearBurgerLocalStorage } from '../../../utils/local-storage';

// import { setActiveStyle } from '../../../utils/ui';

import ProfileStyles from './profile.module.css';
import { CONSTRUCTOR_CLEAR_INGREDIENTS } from '../../../services/actions/burger-constructor-ingredients';

function Profile() {
  const refreshToken = getFromLocalStorage('refreshToken');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userIsLogged} = useSelector(userData);

  const onLogoutHandler = () => {
    dispatch({
      type: CONSTRUCTOR_CLEAR_INGREDIENTS
    });
    dispatch(logoutUser(refreshToken));
  };

  useEffect(()=>{
    console.log('useEffect -> !userIsLogged: ', userIsLogged);
    if (!userIsLogged) {
      navigate('/login', {replace: true});
    }    
  }, [userIsLogged]);

  const setActiveStyle = ({isActive}) => isActive ? ProfileStyles.active : ProfileStyles.inactive;

  return (
    <main className={ProfileStyles.content}>
      <div className={ProfileStyles.form}>
        <Input
          type="text"
          placeholder="Имя"
          value="Марк"
          name="name"
          icon="EditIcon"
          error={false}
          ref={null}
          size="default"
          extraClass="mb-6"
          >
        </Input>
        <Input
          type="text"
          placeholder="Логин"
          value="email@mail.ru"
          name="login"
          icon="EditIcon"
          error={false}
          ref={null}
          size="default"
          extraClass="mb-6"
          >
        </Input>
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          icon="EditIcon"
          error={false}
          ref={null}
          size="default"
          extraClass="mb-6"
          >
        </Input>
        <div className={ProfileStyles.menu}>
          <NavLink className={ setActiveStyle } to="/profile">
            <p className="text text_type_main-medium">Профиль</p>
          </NavLink>
          <NavLink className={ setActiveStyle } to="/history">
            <p className="text text_type_main-medium">История заказов</p>
          </NavLink>
          <p className={`text text_type_main-medium mb-20 ${ProfileStyles.clickable}`} 
             onClick={() => onLogoutHandler()}>
             Выход
          </p>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные.
          </p>
        </div>
      </div>

    </main>
  );
}

export default Profile