import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { v4 as uuid } from 'uuid';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerItem from '../burger-item/burger-item';
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
  let data = useSelector(store => store.burgerConstructor.constructorList);
  let data1 = useSelector(store => store.burgerIngredients.ingredientsList);

  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  const [sumState, sumDispatch] = React.useReducer(reducer, {sum: 0});

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
  }, [data]);

  const showOrderDetails = () => {
    if (!modalShow) {
      dispatch(getOrderNumber(data));
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
    if (data1 && data1.length > 0) {
      dispatch(
        {
          type: CONSTRUCTOR_ADD_INGREDIENT,
          ingredient: data1[0],
          id: uuid()
        }
      );
      dispatch(
        {
          type: CONSTRUCTOR_ADD_INGREDIENT,
          ingredient: data1[1],
          id: uuid()
        }
      );
      dispatch(
        {
          type: CONSTRUCTOR_ADD_INGREDIENT,
          ingredient: data1[2],
          id: uuid()
        }
      );
    }
  }, [data1]);

  const removeHandler = (id) => {
    dispatch(
      {
        type: CONSTRUCTOR_REMOVE_INGREDIENT,
        id: id
      }
    );
  };

  const bun = data && data.length > 0 ? data.filter(item => item.ingredient.type === "bun")[0] : null;
  const ingredients = data && data.length > 0 ? data.filter(item => item.ingredient.type !== "bun"): [];

  return (
    <>
    <section className={`${BurgerConstructorStyles.content} pt-25`}>
      
      {
        bun && <BurgerItem
          id = {bun.id}
          image = {bun.ingredient.image}
          price = {bun.ingredient.price} 
          title = {`${bun.ingredient.name} (верх)`} 
          isLocked={true}
          type="top"
        />
      }

      <AppScrollbar style={{maxHeight: 'calc(100vh - 500px)'}}>
      <ul className={`${BurgerConstructorStyles.collected}`}>
        {ingredients.map(item => 
          {
            return (
              <li key={uuid()}>
                <BurgerItem
                  id = {item.id}
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
      </AppScrollbar>

      {
        bun && <BurgerItem
          id = {bun.id}
          image = {bun.ingredient.image}
          price = {bun.ingredient.price} 
          title = {`${bun.ingredient.name} (низ)`} 
          isLocked={true}
          type="bottom"
        />
      }

      <div className={`${BurgerConstructorStyles.summary} mt-10`}>
        <div className={`${BurgerConstructorStyles.total} mr-10`}>
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