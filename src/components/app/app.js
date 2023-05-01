import React from 'react';
import AppStyles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import ingredientsData from '../../utils/data';

//Файл с имитацией сформированного заказа
import constructorData from '../../utils/cdata';

function App() {
  return (
    <div className={AppStyles.wrapper}>
      <AppHeader />
      <main className={AppStyles.content}>
        <BurgerIngredients data={ingredientsData}/>
        <BurgerConstructor data={constructorData}/>
      </main>
    </div>
  );
}

export default App;