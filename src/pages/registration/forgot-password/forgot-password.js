import { Link } from "react-router-dom";

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import ForgotPasswordStyles from './forgot-password.module.css';

function ForgotPassword() {
  return (
    <main className={ForgotPasswordStyles.content}>
      <div className={ForgotPasswordStyles.form}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          name="e-mail"
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