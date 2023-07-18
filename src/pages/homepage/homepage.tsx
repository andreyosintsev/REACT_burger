import { FC } from 'react';
import { useSelector } from '../../declarations/hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';

import { burgerIngredientRequests } from '../../services/selectors/burger-ingredients';

import HomePageStyles from './homepage.module.css';

const HomePage: FC = () => {
  const {
    ingredientsList,
    ingredientsIsLoading,
    ingredientsHasError
  } = useSelector(burgerIngredientRequests);

  return (
    <main className={HomePageStyles.content}>
      {ingredientsHasError && 
      <p className="text text_type_main-medium">
          <InfoIcon type="primary"/> Ошибка связи сервером. Обновите страницу, нажав F5, или попробуйте позже.
      </p>
      }
      {!ingredientsIsLoading && !ingredientsHasError && ingredientsList.length > 0 &&
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      }
    </main>
  );
};

export default HomePage;