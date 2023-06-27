import { FC, FormEvent } from 'react';
import { useRef, useState, useEffect } from 'react';
import { AnyAction } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from '../../../hooks/useForm';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { requestPasswordUser } from '../../../services/actions/user';
import { userData } from '../../../services/selectors/user';

import ForgotPasswordStyles from './forgot-password.module.css';

type TState = { a: string };
type TAppDispatch = ThunkDispatch<TState, any, AnyAction>;

const ForgotPassword: FC = () => {
  const { values, handleChange } = useForm({});
  const { userPasswordResetting } = useSelector(userData);
  const dispatch: TAppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(requestPasswordUser(values.email));
  };

  useEffect(()=>{
    if (userPasswordResetting) {
      navigate('/reset-password', {replace: true});
    }    
  }, [navigate, userPasswordResetting]);

  return (
    <main className={ForgotPasswordStyles.content}>
      <form className={ForgotPasswordStyles.form} action="" onSubmit={onSubmit}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          name="email"
          value={values.email ?? ''}
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
        >Восстановить
        </Button>
        <p className="text text_type_main-default mb-4">
          Вспомнили пароль?&nbsp;
          <Link to="/login">Войти</Link>
        </p>
      </form>
    </main>
  );
}

export default ForgotPassword