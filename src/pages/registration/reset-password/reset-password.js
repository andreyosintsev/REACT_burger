import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import {
  resetPasswordUser
} from '../../../services/actions/user';

import ResetPasswordStyles from './reset-password.module.css';

function ResetPassword() {
  const passwordRef = useRef('');
  const tokenRef = useRef('');

  const [userPassword, setUserPassword] = useState('');
  const [userToken, setUserToken] = useState('');

  const dispatch = useDispatch();

  const onInputChange = () => {
    setUserPassword(passwordRef.current.value);
    setUserToken(tokenRef.current.value);
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    dispatch(resetPasswordUser(userPassword, userToken));
  };

  return (
    <main className={ResetPasswordStyles.content}>
      <div className={ResetPasswordStyles.form}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <Input
          type="password"
          placeholder="Введите новый пароль"
          name="password"
          icon="ShowIcon"
          error={false}
          ref={passwordRef}
          size="default"
          extraClass="mb-6"
          onChange={onInputChange}
          >
        </Input>
        <Input
          type="text"
          placeholder="Введите код из письма"
          name="code"
          error={false}
          ref={tokenRef}
          size="default"
          extraClass="mb-6"
          onChange={onInputChange}
          >
        </Input>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
          onClick={(e) => onButtonClick(e)}
        >Сохранить
        </Button>
        <p className="text text_type_main-default mb-4">
          Вспомнили пароль?&nbsp;
          <Link to="/login">Войти</Link>
        </p>
      </div>
    </main>
  );
}

export default ResetPassword