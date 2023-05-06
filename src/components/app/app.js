import React from 'react';


import AppStyles from './app.module.css';

import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

// Тестовые testData данные для конструктора бургеров.
// Раньше данные брались из файла cdata.js
// но ревьюер написал удалить этот файл.
// Я добавил данные прямо сюда.

const testData = 
[
    {
       "_id":"60666c42cc7b410027a1a9b1",
       "name":"Краторная булка N-200i",
       "type":"bun",
       "proteins":80,
       "fat":24,
       "carbohydrates":53,
       "calories":420,
       "price":1255,
       "image":"https://code.s3.yandex.net/react/code/bun-02.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9b9",
       "name":"Соус традиционный галактический",
       "type":"sauce",
       "proteins":42,
       "fat":24,
       "carbohydrates":42,
       "calories":99,
       "price":15,
       "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9b4",
       "name":"Мясо бессмертных моллюсков Protostomia",
       "type":"main",
       "proteins":433,
       "fat":244,
       "carbohydrates":33,
       "calories":420,
       "price":1337,
       "image":"https://code.s3.yandex.net/react/code/meat-02.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9bc",
       "name":"Плоды Фалленианского дерева",
       "type":"main",
       "proteins":20,
       "fat":5,
       "carbohydrates":55,
       "calories":77,
       "price":874,
       "image":"https://code.s3.yandex.net/react/code/sp_1.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9bb",
       "name":"Хрустящие минеральные кольца",
       "type":"main",
       "proteins":808,
       "fat":689,
       "carbohydrates":609,
       "calories":986,
       "price":300,
       "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9bb",
       "name":"Хрустящие минеральные кольца",
       "type":"main",
       "proteins":808,
       "fat":689,
       "carbohydrates":609,
       "calories":986,
       "price":300,
       "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
       "__v":0
    },
    {
       "_id":"60666c42cc7b410027a1a9b1",
       "name":"Краторная булка N-200i",
       "type":"bun",
       "proteins":80,
       "fat":24,
       "carbohydrates":53,
       "calories":420,
       "price":1255,
       "image":"https://code.s3.yandex.net/react/code/bun-02.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
       "__v":0
    }
];

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

   const checkFetchResponse = (res) => {
      if (res.ok) {
         return res.json();
      } else {
         return res
               .json()
               .then((err) => Promise.reject(err));
      }
   };

   const getIngredientsData = () => {
      try {
         setState({ ...state, hasError: false, isLoading: true});
         fetch(`${NORMA_API}/ingredients`)
         .then(checkFetchResponse)
         .then((data)=>{
            setState({...state, ingredientsData: data.data, hasError: false, isLoading: false});
         })
         .catch(error => {
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
        <BurgerIngredients data={state.ingredientsData}/>
        <BurgerConstructor data={testData}/>
        </>
      }
      </main>
    </div>
    <div id="modals"></div>
    </>
  );
}

export default App;