import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import AppScrollbar from '../app-scrollbar/app-scrollbar';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgerSection from '../burger-section/burger-section';

import BurgerIngredientsStyles from './burger-ingredients.module.css';

import { 
  INGREDIENTS_SELECT_INGREDIENT,
  INGREDIENTS_DESELECT_INGREDIENT
} from "../../services/actions/burger-ingredients";

function BurgerIngredients() {

  const data = useSelector(store => store.burgerIngredients.ingredientsList);
  const dispatch = useDispatch();

  const [current, setCurrent] = React.useState('buns');
  const [modalShow, setModalShow] = React.useState(false);

  const buns = data.filter(data => data.type === "bun");
  const sauces = data.filter(data => data.type === "sauce");
  const mains = data.filter(data => data.type === "main");

  const getIngredientDataById = (data, id) => data.find(data => data._id === id);

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

  const setTabAndScroll = (tab) => {
    setCurrent(tab);
    document.querySelector(`#${tab}`).scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    const intersectOptions = {
      root: document.querySelector('.ingredientsViewport'),
      rootMargin: '0px 0px 100px 0px',
      threshold: 1
    };    

    const intersectCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          setCurrent(entry.target.id);
        }
      });
    };

    let observer = new IntersectionObserver(intersectCallback, intersectOptions);

    const ingredientSections = document.querySelectorAll('h3');
    ingredientSections.forEach((ingredientSection) => {
      observer.observe(ingredientSection);
    });
  }, []);

  return (
    <>
    <section className={BurgerIngredientsStyles.content}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div style={{ display: 'flex' }} className="mb-8">
        <Tab value="buns" active={current === 'buns'} onClick={() => setTabAndScroll('buns')}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={() => setTabAndScroll('sauces')}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={() => setTabAndScroll('mains')}>
          Начинки
        </Tab>
      </div>
      <AppScrollbar style={{maxHeight: 'calc(100vh - 304px)'}}>
        <BurgerSection id="buns" title="Булки" ingredients={buns} onShowDetails={showIngredientDetails}/>
        <BurgerSection id="sauces" title="Соусы" ingredients={sauces} onShowDetails={showIngredientDetails}/>
        <BurgerSection id="mains" title="Начинки" ingredients={mains} onShowDetails={showIngredientDetails}/>
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