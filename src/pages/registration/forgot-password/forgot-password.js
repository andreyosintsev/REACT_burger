import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import ForgotPasswordStyles from './forgot-password.module.css';

import {
  requestPasswordUser
} from '../../../services/actions/user';

import { userData } from '../../../services/selectors/user';

function ForgotPassword() {
  const emailRef = useRef(null);
  const [userEmail, setUserEmail] = useState('');

  const userPasswordResetting = useSelector(userData).userPasswordResetting;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setUserEmail(emailRef.current.value);
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    dispatch(requestPasswordUser(userEmail));
  };

  useEffect(()=>{
    console.log('useEffect -> userPasswordResetting: ', userPasswordResetting);
    if (userPasswordResetting) {
      navigate('/reset-password', {replace: true});
    }    
  }, [userPasswordResetting]);

  return (
    <main className={ForgotPasswordStyles.content}>
      <div className={ForgotPasswordStyles.form}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          name="e-mail"
          error={false}
          ref={emailRef}
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
          onClick={onButtonClick}
        >Восстановить
        </Button>
        <p className="text text_type_main-default mb-4">
          Вспомнили пароль?&nbsp;
          <Link to="/login">Войти</Link>
        </p>
      </div>
    </main>
  );
}

export default ForgotPassword