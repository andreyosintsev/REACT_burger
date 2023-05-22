import React from 'react';

import { 
  useSelector,
  useDispatch 
} from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import AppScrollbar from '../app-scrollbar/app-scrollbar';
import Ingredient from '../burger-ingredient/burger-ingredient';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { 
  INGREDIENTS_SELECT_INGREDIENT,
  INGREDIENTS_DESELECT_INGREDIENT
} from "../../services/actions/burger-ingredients";

import BurgerIngredientsStyles from './burger-ingredients.module.css';

function BurgerIngredients() {

  const data = useSelector(store => store.burgerIngredients.ingredientsList);
  const dispatch = useDispatch();

  const [current, setCurrent] = React.useState('buns');
  const [modalShow, setModalShow] = React.useState(false);

  const buns = data.filter(data => data.type === "bun");
  const sauces = data.filter(data => data.type === "sauce");
  const mains = data.filter(data => data.type === "main");

  const getIngredientDataById = (data, id) => data.filter(data => data._id === id)[0];

  const showIngredientDetails = (e) => {
    if (!modalShow) {
      dispatch({
        type: INGREDIENTS_SELECT_INGREDIENT,
        ingredientSelected: getIngredientDataById(data, e.currentTarget.dataset.id)
      });
      setModalShow(true);
    }  else {
      dispatch({
        type: INGREDIENTS_DESELECT_INGREDIENT
      });
      setModalShow(false);
    }
  };

  return (
    <>
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
                <li data-id={ingredient._id} key={ingredient._id} onClick={showIngredientDetails}>
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
                <li data-id={ingredient._id} key={ingredient._id} onClick={showIngredientDetails}>
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
                <li data-id={ingredient._id} key={ingredient._id} onClick={showIngredientDetails}>
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
    {modalShow && 
      <Modal header={'Детали ингредиента'} onclick={showIngredientDetails}>
        <IngredientDetails />
      </Modal>}
    </>
  );
}

export default BurgerIngredients