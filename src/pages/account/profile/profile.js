import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useForm } from '../../../hooks/useForm';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { ProfileMenu } from '../../../components/profile-menu/profile-menu';

import {  USER_DATA_UPDATE,
          USER_ROLLBACK,
          USER_ROLLBACK_UPDATE,
          requestDataUser,
          updateUserData, 
          } from '../../../services/actions/user';

import { userData } from '../../../services/selectors/user';

import { getCookie } from '../../../utils/cookie';

import ProfileStyles from './profile.module.css';

function Profile() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const buttonsRef = useRef(null);

  const [isButtonsShow, setButtonsShow] = useState(false);

  const accessToken = getCookie('accessToken');
  const dispatch = useDispatch();

  const { userName, 
          userEmail,
          userRollbackName,
          userRollbackEmail,
          userHasError } = useSelector(userData);

  useEffect(()=>{
    dispatch(requestDataUser(accessToken));
  }, [dispatch, accessToken]);
  
  const onInputChange = () => {
    if (!(nameRef.current.value === userName && emailRef.current.value === userEmail)) {
      setButtonsShow(true);
    } else {
      setButtonsShow(false);
    }

    dispatch({
      type: USER_DATA_UPDATE,
      userName: nameRef.current.value,
      userEmail: emailRef.current.value
    });
  };

  const onInputFocus = (e) => {
    if (e.target.name==='userName') {
      dispatch({
        type: USER_ROLLBACK_UPDATE,
        userRollbackName: userName,
        userRollbackEmail: userRollbackEmail
      });
    }
    if (e.target.name==='userEmail') {
      dispatch({
        type: USER_ROLLBACK_UPDATE,
        userRollbackName: userRollbackName,
        userRollbackEmail: userEmail
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData(userName, userEmail, accessToken));
    dispatch({
      type: USER_ROLLBACK_UPDATE,
      userRollbackName: userName,
      userRollbackEmail: userEmail
    });
    setButtonsShow(false);
  };

  const formReset = () => {
    dispatch({
      type: USER_ROLLBACK,
      userRollbackName,
      userRollbackEmail
    });
    setButtonsShow(false);
  };

  const onPasswordFocus = () => {
    passwordRef.current.type = 'text';
  };

  const onPasswordBlur = () => {
    passwordRef.current.type = 'password';
  };


  return (
    <div className={ProfileStyles.wrapper}>
      <main className={ProfileStyles.content}>
        <ProfileMenu />
        <form className={ProfileStyles.form} 
              action=""
              onSubmit={onSubmit} 
              onReset={formReset}
              >
          <Input
            type="text"
            placeholder="Имя"
            value={userName}
            name="userName"
            icon="EditIcon"
            error={false}
            ref={nameRef}
            size="default"
            extraClass="mb-6"
            onChange={onInputChange}
            onFocus={onInputFocus}
            >
          </Input>
          <Input
            type="email"
            placeholder="Логин"
            value={userEmail}
            name="userEmail"
            icon="EditIcon"
            error={false}
            ref={emailRef}
            size="default"
            extraClass="mb-6"
            onChange={onInputChange}
            onFocus={onInputFocus}
            >
          </Input>
          <Input
            type="password"
            placeholder="Пароль"
            name="userPassword"
            value="Бутафория"
            readOnly={true}
            icon="EditIcon"
            error={false}
            ref={passwordRef}
            size="default"
            extraClass="mb-6"
            onFocus={onPasswordFocus}
            onBlur={onPasswordBlur}
            >
          </Input>
          {isButtonsShow && 
            <div className={ProfileStyles.buttons} ref={buttonsRef}>
              <Button
                htmlType="submit" 
                type="primary" 
                size="large">
                  Сохранить
              </Button>
              <Button
                htmlType="reset" 
                type="primary" 
                size="large">
                  Отменить
              </Button>
            </div>
          }
        </form>
      </main>
    </div>
  );
}

export default Profile