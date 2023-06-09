import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { ProfileOrders } from './profile-orders/profile-orders';

import { CONSTRUCTOR_CLEAR_INGREDIENTS } from '../../../services/actions/burger-constructor-ingredients';
import {  USER_DATA_UPDATE,
          USER_ROLLBACK_UPDATE,
          logoutUser, 
          requestDataUser,
          updateUserData, 
          } from '../../../services/actions/user';
import { userData } from '../../../services/selectors/user';

import { getCookie } from '../../../utils/cookie';
import { getFromLocalStorage } from '../../../utils/local-storage';

import ProfileStyles from './profile.module.css';

function Profile() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  const accessToken = getCookie('accessToken');
  const refreshToken = getFromLocalStorage('refreshToken');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userIsLogged, userName, userEmail } = useSelector(userData);

  const onInputChange = () => {
    dispatch({
      type: USER_DATA_UPDATE,
      userName: nameRef.current.value,
      userEmail: emailRef.current.value
    });
  };

  const onInputFocus = () => {
    console.log('onFocus: Rollback Update');
    dispatch({
      type: USER_ROLLBACK_UPDATE,
      userRollbackName: userName,
      userRollbackEmail: userEmail
    });
  };

  const onInputBlur = () => {
    console.log('onBlur: Data Update');
    dispatch(updateUserData(userName, userEmail, accessToken));
  };

  const onLogoutHandler = () => {
    dispatch({
      type: CONSTRUCTOR_CLEAR_INGREDIENTS
    });
    dispatch(logoutUser(refreshToken));
  };

  // useEffect(()=>{
  //   console.log('useEffect -> !userIsLogged: ', userIsLogged);
  //   if (!userIsLogged) {
  //     navigate('/login', {replace: true});
  //   }
  //   if (userIsLogged) {
  //     dispatch(requestDataUser(accessToken));
  //   }
  // }, [userIsLogged]);
    useEffect(()=>{
      dispatch(requestDataUser(accessToken));
    }, []);

  const setActiveStyle = ({isActive}) => isActive ? ProfileStyles.active : ProfileStyles.inactive;

  return (
    <main className={ProfileStyles.content}>
      <div className={ProfileStyles.form}>
        <Input
          type="text"
          placeholder="Имя"
          value={userName}
          name="name"
          icon="EditIcon"
          error={false}
          ref={nameRef}
          size="default"
          extraClass="mb-6"
          onChange={onInputChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          >
        </Input>
        <Input
          type="email"
          placeholder="Логин"
          value={userEmail}
          name="login"
          icon="EditIcon"
          error={false}
          ref={emailRef}
          size="default"
          extraClass="mb-6"
          onChange={onInputChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          >
        </Input>
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          value="Бутафория"
          icon="EditIcon"
          error={false}
          ref={passwordRef}
          size="default"
          extraClass="mb-6"
          >
        </Input>
        <div className={ProfileStyles.menu}>
          <NavLink className={ setActiveStyle } to="/profile">
            <p className={`text text_type_main-medium ${ProfileStyles.clickable}`}>Профиль</p>
          </NavLink>
          <NavLink className={ setActiveStyle } to="/profile/orders">
            <p className={`text text_type_main-medium ${ProfileStyles.clickable}`}>История заказов</p>
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