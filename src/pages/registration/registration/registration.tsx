import { FC, useState, useRef, FormEvent } from "react";
import { useDispatch } from "../../../declarations/hooks";
import { Link } from "react-router-dom";

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { registerUser } from '../../../services/actions/user';

import RegistrationStyles from './registration.module.css';

const Registration: FC = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [isPasswordShow, togglePasswordShow] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  
  const dispatch = useDispatch();

  const togglePassword = () => {
    if (isPasswordShow) { 
      if (passwordRef && passwordRef.current) {
        passwordRef.current.type = 'text';
      }
    } 
    else { 
      if (passwordRef && passwordRef.current) {
        passwordRef.current.type = 'password';
      }
    }
    togglePasswordShow(!isPasswordShow);
  };

  const onInputChange = () => {
    if (emailRef && emailRef.current) { setUserEmail(emailRef.current.value) };
    if (nameRef && nameRef.current) { setUserName(nameRef.current.value) };
    if (passwordRef && passwordRef.current) { setUserPassword(passwordRef.current.value) };
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(userEmail, userPassword, userName));
  };

  return (
    <main className={RegistrationStyles.content}>
      <form className={RegistrationStyles.form} action="" onSubmit={onSubmit}>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <Input
          type="text"
          placeholder="Имя"
          name="login"
          value={userName}
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
          value={userEmail}
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
          value={userPassword}
          icon="ShowIcon"
          error={false}
          ref={passwordRef}
          size="default"
          extraClass="mb-6"
          onIconClick={() => togglePassword()}
          onChange={onInputChange}
          >
        </Input>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >Зарегистрироваться
        </Button>
        <p className="text text_type_main-default mb-4">
          Уже зарегистрированы?&nbsp;
          <Link to="/login">Войти</Link>
        </p>
      </form>
    </main>
  );
}

export default Registration