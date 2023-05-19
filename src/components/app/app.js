import React from 'react';


import AppStyles from './app.module.css';

import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import {getIngredientsFromApi, testData} from '../../utils/burger-api';
import {BurgerIngredientsContext, BurgerConstructorContext} from '../../utils/burger-api';

const NORMA_API = 'https://norma.nomoreparties.space/api';


function App() {

   const [state, setState] = React.useState(
      {
         ingredientsData: [],
         isLoading: false,
         hasError: false
      });

   React.useEffect( ()=> {
      getIngredientsData();
   }, []);

  const getIngredientsData = () => {
    setState({...state, hasError: false, isLoading: true});
    try {
      getIngredientsFromApi(NORMA_API)
      .then(data => setState({...state, ingredientsData: data, isLoading: false}))
      .catch (() => {
        setState({...state, ingredientsData: [], hasError: true, isLoading: false});
      });
    } catch (error) {
      setState({...state, ingredientsData: [], hasError: true, isLoading: false});
    }
  };
   
  return (
   <>
    <div className={AppStyles.wrapper}>
      <AppHeader />
      <main className={AppStyles.content}>
      {state.hasError && 
         <p className="text text_type_main-medium">
            <InfoIcon /> Ошибка связи сервером. Обновите страницу, нажав F5, или попробуйте позже.
         </p>
      }
      {!state.isLoading && !state.hasError && state.ingredientsData.length > 0 &&
        <>
        <BurgerIngredientsContext.Provider value={state.ingredientsData}>
          <BurgerIngredients />
        </BurgerIngredientsContext.Provider>
        <BurgerConstructorContext.Provider value={testData(state.ingredientsData, 7)}>
          <BurgerConstructor />
        </BurgerConstructorContext.Provider>
        </>
      }
      </main>
    </div>
    <div id="modals"></div>
    </>
  );
}

export default App