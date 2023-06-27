import { FC, useEffect, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import { useForm } from '../../../hooks/useForm';
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { resetPasswordUser } from '../../../services/actions/user';
import { userData } from '../../../services/selectors/user';

import ResetPasswordStyles from './reset-password.module.css';

type TState = { a: string };
type TAppDispatch = ThunkDispatch<TState, any, AnyAction>; 

const ResetPassword: FC = () => {
  const { values, handleChange } = useForm({});

  const {userPasswordResetting} = useSelector(userData);

  const dispatch: TAppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPasswordUser(values.userPassword, values.userToken));
    navigate('/', {replace: true});
  };

  useEffect(()=>{
    if (!userPasswordResetting) {
      navigate('/forgot-password', {replace: true});
    }    
  }, [userPasswordResetting]);

  return (
    <main className={ResetPasswordStyles.content}>
      <form className={ResetPasswordStyles.form} action="" onSubmit={onSubmit}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <Input
          type="password"
          placeholder="Введите новый пароль"
          name="userPassword"
          value={values.userPassword ?? ''}
          icon="ShowIcon"
          error={false}
          size="default"
          extraClass="mb-6"
          onChange={handleChange}
          >
        </Input>
        <Input
          type="text"
          placeholder="Введите код из письма"
          name="userToken"
          value={values.userToken ?? ''}
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
        >Сохранить
        </Button>
        <p className="text text_type_main-default mb-4">
          Вспомнили пароль?&nbsp;
          <Link to="/login">Войти</Link>
        </p>
      </form>
    </main>
  );
}

export default ResetPassword