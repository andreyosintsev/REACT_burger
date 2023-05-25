import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppStyles from './app.module.css';

import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { getIngredients } from '../../services/reducers/burger-ingredients';

export const NORMA_API = 'https://norma.nomoreparties.space/api';

function App() {
  const {
          ingredientsList,
          isLoading,
          hasError
  } = useSelector(state => state.burgerIngredients);

  const dispatch = useDispatch();

  React.useEffect( ()=> {
    dispatch(getIngredients());
  }, []);

  return (
   <>
    <div className={AppStyles.wrapper}>
      <AppHeader />
      <main className={AppStyles.content}>
      {hasError && 
         <p className="text text_type_main-medium">
            <InfoIcon /> Ошибка связи сервером. Обновите страницу, нажав F5, или попробуйте позже.
         </p>
      }
      {!isLoading && !hasError && ingredientsList.length > 0 &&
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      }
      </main>
    </div>
    <div id="modals"></div>
    </>
  );
}

export default App