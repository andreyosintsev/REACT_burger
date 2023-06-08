import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import RegistrationStyles from './registration.module.css';

import {
  registerUser
} from '../../../services/actions/user';

function Registration() {
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  const [isPasswordShow, togglePasswordShow] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  
  const dispatch = useDispatch();

  const TogglePassword = () => {
    console.log('Toggle password ', passwordRef.current.icon);
    if (isPasswordShow) { 
      passwordRef.current.type = 'text';
      passwordRef.current.icon = 'ShowIcon';
    } 
    else { 
      passwordRef.current.type = 'password';
      passwordRef.current.icon = 'HideIcon';    
    }
    togglePasswordShow(!isPasswordShow);
  };

  const onInputChange = () => {
    setUserEmail(emailRef.current.value);
    setUserName(nameRef.current.value);
    setUserPassword(passwordRef.current.value);
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    dispatch(registerUser(userEmail, userPassword, userName));
  };

  return (
    <main className={RegistrationStyles.content}>
      <div className={RegistrationStyles.form}>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <Input
          type="text"
          placeholder="Имя"
          name="login"
          error={false}
          ref={nameRef}
          size="default"
          extraClass="mb-6"
          onChange={onInputChange}
          >
        </Input>
        <Input
          type="email"
          placeholder="E-mail"
          name="e-mail"
          error={false}
          ref={emailRef}
          size="default"
          extraClass="mb-6"
          onChange={onInputChange}
          >
        </Input>
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          icon={"ShowIcon"}
          error={false}
          ref={passwordRef}
          size="default"
          extraClass="mb-6"
          onIconClick={() => TogglePassword()}
          onChange={onInputChange}
          >
        </Input>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
          onClick={(e) => onButtonClick(e)}
        >Зарегистрироваться
        </Button>
        <p className="text text_type_main-default mb-4">
          Уже зарегистрированы?&nbsp;
          <Link to="/login">Войти</Link>
        </p>
      </div>
    </main>
  );
}

export default Registration