import { Link } from "react-router-dom";

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import RegistrationStyles from './registration.module.css';

function Registration() {
  return (
    <main className={RegistrationStyles.content}>
      <div className={RegistrationStyles.form}>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <Input
          type="text"
          placeholder="Имя"
          name="login"
          error={false}
          ref={null}
          size="default"
          extraClass="mb-6"
          >
        </Input>
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