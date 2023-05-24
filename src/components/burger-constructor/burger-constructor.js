import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";

import { v4 as uuid } from 'uuid';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerItem from '../burger-item/burger-item';
import BurgerStub from '../burger-stub/burger-stub';
import BurgerTotal from '../burger-total/burger-total';
import AppScrollbar from '../app-scrollbar/app-scrollbar';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { BurgerTotalContext } from '../../utils/burger-api';
import { getOrderNumber } from '../../services/reducers/burger-constructor';

import BurgerConstructorStyles from './burger-constructor.module.css';
import {
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_CLEAR_INGREDIENTS
} from '../../services/actions/burger-constructor';

function BurgerConstructor() {
  let constructorList = useSelector(store => store.burgerConstructor.constructorList);
  let ingredientsList = useSelector(store => store.burgerIngredients.ingredientsList);

  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [sumState, sumDispatch] = React.useReducer(reducer, {sum: 0});

  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item._id);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const getIngredientById = (_id, ingredients) => 
    ingredients.find(ingredient => ingredient._id === _id);

  const onDropHandler = (itemId) => {
    const droppedIngredient = getIngredientById(itemId, ingredientsList);
    if (droppedIngredient.type === 'bun') {
      const existedBun = constructorList.find(ingredient => ingredient.ingredient.type === 'bun');
      if (existedBun) {
        dispatch({
          type: CONSTRUCTOR_REMOVE_INGREDIENT,
          uuid: existedBun.uuid
        });
      }
    } 
    dispatch({
      type: CONSTRUCTOR_ADD_INGREDIENT,
      uuid: uuid(),
      ingredient: droppedIngredient
    });
  };

  function reducer(sumState, action) {
    switch (action.type) {
      case "add":
        return { sum: sumState.sum + action.price };
      case "reset":
        return { sum: 0 };
      default:
        throw new Error(`Неверный action.type: ${action.type}`);
    }
  }

  useEffect (()=> {
    sumDispatch({ type: 'reset' });
    if (bun) {
      sumDispatch({ type: 'add', price: +bun.ingredient.price * 2 });
    }
    if (ingredients && ingredients.length > 0) {
      ingredients.forEach(item => sumDispatch({ type: 'add', price: +item.ingredient.price }));
    }
  }, [constructorList]);

  const showOrderDetails = () => {
    if (!modalShow) {
      dispatch(getOrderNumber(constructorList));
      setModalShow(true);
    }  else {
      setModalShow(false);
    }

    setModalShow(!modalShow);
  };

  useEffect(() => {
    dispatch(
      {
        type: CONSTRUCTOR_CLEAR_INGREDIENTS
      }
    );  
  }, [ingredientsList]);

  const removeHandler = (uuid) => {
    dispatch(
      {
        type: CONSTRUCTOR_REMOVE_INGREDIENT,
        uuid: uuid
      }
    );
  };

  const bun = constructorList && constructorList.length > 0 
  ? constructorList.filter(item => item.ingredient.type === "bun")[0] 
  : null;

  const ingredients = constructorList && constructorList.length > 0 
  ? constructorList.filter(item => item.ingredient.type !== "bun")
  : [];

  return (
    <>
    <section className={`${BurgerConstructorStyles.content} mt-25`} ref={dropTarget}>
      
      <div className={BurgerConstructorStyles.topbottom}>
      {
        bun && <BurgerItem
          uuid = {bun.uuid}
          image = {bun.ingredient.image}
          price = {bun.ingredient.price} 
          title = {`${bun.ingredient.name} (верх)`} 
          isLocked={true}
          type="top"
        />
      }
      </div>

      <AppScrollbar>
      {ingredients.length > 0 && <ul className={`${BurgerConstructorStyles.collected}`}>
        {ingredients.map(item => 
          {
            return (
              <li key={uuid()}>
                <BurgerItem
                  uuid = {item.uuid}
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
      {ingredients.length === 0 && !bun && <BurgerStub text={`Соберите свой бургер.
        Начните с булок и не забудьте о начинке и соусах!\nДавай, перетаскивайте сюда скорее всё самое вкусное!`} />}
      {ingredients.length === 0 && bun && <BurgerStub text={`Булочки без начинки - это невкусно! Добавьте начинку и соусы!`} />}
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
        />
      }
      </div>

      <div className={`${BurgerConstructorStyles.summary}`}>
        <div className={`mr-10`}>
          <BurgerTotalContext.Provider value={sumState.sum}>
            <BurgerTotal/>
          </BurgerTotalContext.Provider>
        </div>
        <Button 
          htmlType="button" 
          type="primary" 
          size="large" 
          onClick={showOrderDetails}>
            Оформить заказ
        </Button>
        <div style={{width: '16px'}}></div>
      </div>
    </section>
    {modalShow && 
      <Modal header={''} onclick={showOrderDetails}>
        <OrderDetails />
      </Modal>
    }
    </>
  );
}

export default BurgerConstructor