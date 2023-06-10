import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { ProfileMenu } from '../../../components/profile-menu/profile-menu';
import { ProfileOrders } from './profile-orders/profile-orders';

import {  USER_DATA_UPDATE,
          USER_ROLLBACK_UPDATE,
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
  const dispatch = useDispatch();

  const { userName, userEmail } = useSelector(userData);

  useEffect(()=>{
    console.log('Profile: requestDataUser')
    dispatch(requestDataUser(accessToken));
  }, []);

  
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

  return (
    <div className={ProfileStyles.wrapper}>
      <main className={ProfileStyles.content}>
        <ProfileMenu />
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
        </div>
      </main>
    </div>
  );
}

export default Profile