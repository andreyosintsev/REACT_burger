import { Link } from "react-router-dom";

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import SignInStyles from './sign-in.module.css';

function SignIn() {
  return (
    <main className={SignInStyles.content}>
      <div className={SignInStyles.form}>
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
        <Input
          type="email"
          placeholder="E-mail"
          name="e-mail"
          error={false}
          ref={null}
          size="default"
          extraClass="mb-6"
          >
        </Input>
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          icon="ShowIcon"
          error={false}
          ref={null}
          size="default"
          extraClass="mb-6"
          >
        </Input>
        <Button
          htmlType="button"
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
      </div>
    </main>
  );
}

export default SignIn