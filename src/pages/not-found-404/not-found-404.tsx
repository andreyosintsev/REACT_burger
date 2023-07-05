import { FC } from 'react';

import NotFound404Styles from './not-found-404.module.css';

const NotFound404: FC = () => {
  return ( 
    <main className={NotFound404Styles.content}>
      <p className="text text_type_main-large">
        Ошибка 404 - страница не найдена
      </p>
    </main>
  )
}

export default NotFound404