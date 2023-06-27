import { FC, useEffect, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { useForm } from '../../../hooks/useForm';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { loginUser } from '../../../services/actions/user';
import { userData } from '../../../services/selectors/user';

import SignInStyles from './sign-in.module.css';

type TState = { a: string };
type TAppDispatch = ThunkDispatch<TState, any, AnyAction>; 

const SignIn: FC = () => {
  const { values, handleChange } = useForm({});
  const {userIsLogged} = useSelector(userData); 
  const dispatch: TAppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if (userIsLogged) {
      navigate('/', {replace: true});
    }    
  }, [userIsLogged]);

  const onSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(values.userEmail, values.userPassword));
  };

  return (
    <main className={SignInStyles.content}>
      <form className={SignInStyles.form} action="" onSubmit={onSubmit}>
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
        <Input
          type="email"
          placeholder="E-mail"
          name="userEmail"
          value={values.userEmail ?? ''}
          error={false}
          size="default"
          extraClass="mb-6"
          onChange={handleChange}
          >
        </Input>
        <Input
          type="password"
          placeholder="Пароль"
          name="userPassword"
          value={values.userPassword ?? ''}
          icon="ShowIcon"
          error={false}
          size="default"
          extraClass="mb-6"
          onChange={handleChange}
          >
        </Input>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
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
      </form>
    </main>
  );
}

export default SignIn