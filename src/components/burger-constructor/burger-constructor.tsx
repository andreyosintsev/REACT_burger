import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../declarations/hooks';
import { useNavigate } from 'react-router-dom';
import { useDrop } from "react-dnd";

import { v4 as uuid } from 'uuid';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerItem from '../burger-item/burger-item';
import BurgerStub from '../burger-stub/burger-stub';
import BurgerTotal from '../burger-total/burger-total';
import AppScrollbar from '../app-scrollbar/app-scrollbar';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { getOrderNumber } from '../../services/actions/burger-constructor-orders';
import { CONSTRUCTOR_CLEAR_ORDERNUM } from '../../services/constants/burger-constructor-orders';

import {
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_LOAD_INGREDIENTS
} from '../../services/constants/burger-constructor-ingredients';

import { FC } from 'react';
import { burgerIngredientRequests } from '../../services/selectors/burger-ingredients';
import { burgerConstructorIngredients } from '../../services/selectors/burger-constructor';
import { userData } from '../../services/selectors/user';

import {  saveBurgerToLocalStorage,
          loadBurgerFromLocalStorage,
          clearBurgerLocalStorage } from '../../utils/local-storage';

import { STUB_TEXT_1, STUB_TEXT_2 } from '../../utils/locale';

import { getIngredientDataById } from '../../utils/utils';

import { TIngredient, TConstructorIngredient } from '../../declarations/types';

import BurgerConstructorStyles from './burger-constructor.module.css';

const BurgerConstructor: FC = () => {
  const { ingredientsList } = useSelector(burgerIngredientRequests);
  const { constructorList, bun } = useSelector(burgerConstructorIngredients);
  const { userIsLogged } = useSelector(userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);

  const [{isHover}, dropTarget] = useDrop<TIngredient, void, {isHover: boolean}>({
    accept: "ingredient",
    drop(item) {
      if (item) onDropHandler(item._id);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const onDropHandler = (itemId: string) => {
    const droppedIngredient: TIngredient | undefined = getIngredientDataById(ingredientsList, itemId);
   
    if (droppedIngredient && droppedIngredient.type === 'bun' && bun) {
      dispatch({
        type: CONSTRUCTOR_REMOVE_INGREDIENT,
        uuid: bun.uuid
      });
    } 
    dispatch({
      type: CONSTRUCTOR_ADD_INGREDIENT,
      uuid: uuid(),
      ingredient: droppedIngredient
    });
  };

  const showOrderDetails = () => {
    if (!userIsLogged) {
      navigate('/login', {replace: true});
    }
    if (!modalShow && userIsLogged) {
      if (!bun) { return; }
      dispatch({
        type: CONSTRUCTOR_CLEAR_ORDERNUM
      });
      dispatch(getOrderNumber(constructorList, bun));
      clearBurgerLocalStorage();
      setModalShow(true);
    } else {
      setModalShow(false);
    }

    setModalShow(!modalShow);
  };

  useEffect(() => {
    const {constructorList, bun} = loadBurgerFromLocalStorage();
    dispatch({
      type: CONSTRUCTOR_LOAD_INGREDIENTS,
      constructorList: constructorList,
      bun: bun
    });
  }, [dispatch]);

  useEffect(() => {
    if (constructorList && bun) {
      console.log('CONSTRUCTOR_SAVE_INGREDIENTS');
      saveBurgerToLocalStorage(constructorList, bun);
    }
  }, [constructorList, bun]);

  const removeHandler = (type: 'top' | 'bottom' | undefined, uuid: string) => {
    if (type) { return; } 
    dispatch(
      {
        type: CONSTRUCTOR_REMOVE_INGREDIENT,
        uuid: uuid
      }
    );
  };

  const ingredients = constructorList && constructorList.length > 0 
  ? constructorList.filter((item: TConstructorIngredient) => item.ingredient.type !== "bun")
  : [];

  return (
    <>
      <section className={`${BurgerConstructorStyles.content} mt-25`} ref={dropTarget} data-test='drop-zone'>
        
        <div className={BurgerConstructorStyles.topbottom}>
        {
          bun && <BurgerItem
            uuid = {bun.uuid}
            image = {bun.ingredient.image}
            price = {bun.ingredient.price} 
            title = {`${bun.ingredient.name} (верх)`} 
            isLocked={true}
            type="top"
            removeHandler={removeHandler}
          />
        }
        </div>

        <AppScrollbar>
        {ingredients.length > 0 && <ul className={`${BurgerConstructorStyles.collected}`}>
          {ingredients.map((item: TConstructorIngredient) => 
            {
              return (
                <li key={item.uuid}>
                  <BurgerItem
                    uuid = {item.uuid}
                    type = {undefined}
                    image = {item.ingredient.image}
                    price = {item.ingredient.price} 
                    title = {item.ingredient.name} 
                    isLocked={false}
                    removeHandler={removeHandler}
                  />
                </li>);            
            })
          }
        </ul>
        }
        {ingredients.length === 0 && !bun && <BurgerStub text={STUB_TEXT_1} />}
        {ingredients.length === 0 &&  bun && <BurgerStub text={STUB_TEXT_2} />}
        </AppScrollbar>

        <div className={BurgerConstructorStyles.topbottom}>
        {
          bun && <BurgerItem
            uuid = {bun.uuid}
            image = {bun.ingredient.image}
            price = {bun.ingredient.price} 
            title = {`${bun.ingredient.name} (низ)`} 
            isLocked={true}
            type="bottom"
            removeHandler={removeHandler}
          />
        }
        </div>

        <div className={`${BurgerConstructorStyles.summary} pr-4`}>
          <div className="mr-10">
            <BurgerTotal/>
          </div>
          <Button
            htmlType="button" 
            type="primary" 
            size="large" 
            onClick={showOrderDetails}>
              Оформить заказ
          </Button>
        </div>
      </section>
      {modalShow && 
        <Modal onClick={showOrderDetails}>
          <OrderDetails />
        </Modal>
      }
    </>
  );
}

export default BurgerConstructor