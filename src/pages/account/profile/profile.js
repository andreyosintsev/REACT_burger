import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import ProfileStyles from './profile.module.css';

function Profile() {
  return (
    <main className={ProfileStyles.content}>
      <div className={ProfileStyles.form}>
        <Input
          type="text"
          placeholder="Имя"
          value="Марк"
          name="name"
          icon="EditIcon"
          error={false}
          ref={null}
          size="default"
          extraClass="mb-6"
          >
        </Input>
        <Input
          type="text"
          placeholder="Логин"
          value="email@mail.ru"
          name="login"
          icon="EditIcon"
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
          icon="EditIcon"
          error={false}
          ref={null}
          size="default"
          extraClass="mb-6"
          >
        </Input>
        <div className={ProfileStyles.menu}>
          <p className="text text_type_main-medium">Профиль</p>
          <p className="text text_type_main-medium">История заказов</p>
          <p className="text text_type_main-medium mb-20">Выход</p>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные.
          </p>
        </div>
      </div>

    </main>
  );
}

export default Profile