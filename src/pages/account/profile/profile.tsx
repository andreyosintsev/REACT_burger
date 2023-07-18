import { useRef, useEffect, useState, FC, FocusEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from '../../../declarations/hooks';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import  ProfileMenu  from '../../../components/profile-menu/profile-menu';

import {  USER_DATA_UPDATE,
          USER_ROLLBACK,
          USER_ROLLBACK_UPDATE,
  } from '../../../services/constants/user';

import {  requestDataUser,
          updateUserData, 
          } from '../../../services/actions/user';

import { userData } from '../../../services/selectors/user';

import { getCookie } from '../../../utils/cookie';

import ProfileStyles from './profile.module.css';

const Profile: FC = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  const [isButtonsShow, setButtonsShow] = useState(false);

  const accessToken = getCookie('accessToken');
  const dispatch = useDispatch();

  const { userName, 
          userEmail,
          userRollbackName,
          userRollbackEmail} = useSelector(userData);

  useEffect(()=>{
    dispatch(requestDataUser(accessToken));
  }, [dispatch, accessToken]);
  
  const onInputChange = () => {
    if (!(nameRef.current?.value === userName && emailRef.current?.value === userEmail)) {
      setButtonsShow(true);
    } else {
      setButtonsShow(false);
    }

    dispatch({
      type: USER_DATA_UPDATE,
      userName: nameRef.current?.value,
      userEmail: emailRef.current?.value
    });
  };

  const onInputFocus = (e: FocusEvent<HTMLInputElement>) => {
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    if (passwordRef.current) { passwordRef.current.type = 'text'; }
  };

  const onPasswordBlur = () => {
    if (passwordRef.current) { passwordRef.current.type = 'password'; }
  };


  return (
    <div className={ProfileStyles.wrapper}>
      <main className={ProfileStyles.content}>
        <ProfileMenu text="В этом разделе вы можете изменить свои персональные данные" />
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
            onChange={onInputChange}
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