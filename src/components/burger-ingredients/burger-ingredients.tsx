import { FC, MouseEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../declarations/hooks';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import AppScrollbar from '../app-scrollbar/app-scrollbar';
import BurgerSection from '../burger-section/burger-section';

import { 
  INGREDIENTS_SELECT_INGREDIENT
} from "../../services/constants/burger-ingredients-details";

import { burgerIngredientRequests } from '../../services/selectors/burger-ingredients';

import { getIngredientDataById } from '../../utils/utils';

import { TIngredients } from '../../declarations/types';

import BurgerIngredientsStyles from './burger-ingredients.module.css';

const BurgerIngredients: FC = () => {

  const ingredientsList = useSelector(burgerIngredientRequests).ingredientsList;
  const dispatch = useDispatch();

  const [current, setCurrent] = useState('buns');

  const buns:   TIngredients = ingredientsList.filter(ingredientsList => ingredientsList.type === "bun");
  const sauces: TIngredients = ingredientsList.filter(ingredientsList => ingredientsList.type === "sauce");
  const mains:  TIngredients = ingredientsList.filter(ingredientsList => ingredientsList.type === "main");

  const showIngredientDetails = (e: MouseEvent<HTMLLIElement> ) => {
    dispatch({
      type: INGREDIENTS_SELECT_INGREDIENT,
      ingredientSelected: getIngredientDataById(ingredientsList, e.currentTarget.getAttribute('data-id')!)
    });
  };

  const setTabAndScroll = (tab: string) => {
    setCurrent(tab);
    document.querySelector(`#${tab}`)?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    const intersectOptions = {
      root: document.querySelector('.ingredientsViewport'),
      rootMargin: '0px 0px 100px 0px',
      threshold: 1
    };    

    const intersectCallback = (entries: IntersectionObserverEntry[]) => {
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
    <section className={BurgerIngredientsStyles.content}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div className={`${BurgerIngredientsStyles.tabs} mb-8`}>
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
  );
}

export default BurgerIngredients