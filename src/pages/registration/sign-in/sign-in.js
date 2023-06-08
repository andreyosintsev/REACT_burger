import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import SignInStyles from './sign-in.module.css';

import { userData } from '../../../services/selectors/user';

import {
  loginUser,
  USER_DATA_UPDATE
} from '../../../services/actions/user';

function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const {userEmail, userPassword, userIsLogged} = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onInputChange = (e) => {
    dispatch({
      type: USER_DATA_UPDATE,
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    dispatch(loginUser(userEmail, userPassword));
  };

  useEffect(()=>{
    console.log('useEffect -> userIsLogged: ', userIsLogged);
    if (userIsLogged) {
      navigate('/', {replace: true});
    }    
  }, [userIsLogged]);

  return (
    <main className={SignInStyles.content}>
      <div className={SignInStyles.form}>
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
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
          icon="ShowIcon"
          error={false}
          ref={passwordRef}
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
        >Войти
        </Button>

        <p className="text text_type_main-default mb-4">
          Вы новый пользователь?&nbsp;
          <Link to="/register">Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default mb-4">
          Забыли пароль?&nbsp;
          <Link to="/forgot-password">Восстановить пароль</Link>
        </p>
      </div>
    </main>
  );
}

export default SignIn