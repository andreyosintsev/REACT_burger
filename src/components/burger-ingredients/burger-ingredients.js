import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import AppScrollbar from '../app-scrollbar/app-scrollbar';
import Ingredient from '../burger-ingredient/burger-ingredient';
import BurgerIngredientsProps from './burger-ingredients-props';

import BurgerIngredientsStyles from './burger-ingredients.module.css';

function BurgerIngredients({data}) {
  const [current, setCurrent] = React.useState('buns');

  const buns = data.filter(data => data.type === "bun");
  const sauces = data.filter(data => data.type === "sauces");
  const mains = data.filter(data => data.type === "main");

  return (
    <section className={BurgerIngredientsStyles.content}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div style={{ display: 'flex' }} className="mb-8">
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauses" active={current === 'sauses'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <AppScrollbar style={{maxHeight: 'calc(100vh - 304px)'}}>
        <h3 className="text text_type_main-medium mt-2">Булки</h3>
        <div className={`${BurgerIngredientsStyles.sections} pl-4`}>
          <ul>
            { 
              buns.map((ingredient) => (
                <li key={ingredient._id}>
                  <Ingredient 
                    image = {ingredient.image} 
                    price = {ingredient.price} 
                    title = {ingredient.name}
                  />
                </li>
              ))
            }
          </ul>
        </div>
        <h3 className="text text_type_main-medium mt-2">Соусы</h3>
        <div className={`${BurgerIngredientsStyles.sections} pl-4`}>
          <ul>
            { 
              sauces.map((ingredient) => (
                <li key={ingredient._id}>
                  <Ingredient 
                    image = {ingredient.image} 
                    price = {ingredient.price} 
                    title = {ingredient.name}
                  />
                </li>
              ))
            }
          </ul>
        </div>
        <h3 className="text text_type_main-medium mb-6">Начинки</h3>
        <div className={`${BurgerIngredientsStyles.sections} pl-4`}>
          <ul>
            { 
              mains.map((ingredient) => (
                <li key={ingredient._id}>
                  <Ingredient 
                    image = {ingredient.image} 
                    price = {ingredient.price} 
                    title = {ingredient.name}
                  />
                </li>
              ))
            }
          </ul>          
        </div>
      </AppScrollbar>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: BurgerIngredientsProps
}

export default BurgerIngredients