import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerItem from '../burger-item/burger-item';
import BurgerTotal from '../burger-total/burger-total';
import AppScrollbar from '../app-scrollbar/app-scrollbar';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { BurgerTotalContext } from '../../utils/burger-api';
import { getOrderNumber } from '../../services/reducers/burger-constructor';

import BurgerConstructorStyles from './burger-constructor.module.css';

function BurgerConstructor() {
  const data = useSelector(store => store.burgerIngredients.ingredientsList);
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
    sumDispatch({ type: 'add', price: +bun.price * 2 });
    ingredients.forEach(item => sumDispatch({ type: 'add', price: +item.price }));
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

  const bun = data.filter(item => item.type === "bun")[0];
  const ingredients = data.filter(item => item.type !== "bun");

  return (
    <>
    <section className={`${BurgerConstructorStyles.content} pt-25`}>
      
      <BurgerItem
        image = {bun.image}
        price = {bun.price} 
        title = {`${bun.name} (верх)`} 
        isLocked={true}
        type="top"
      />

      <AppScrollbar style={{maxHeight: 'calc(100vh - 500px)'}}>
      <ul className={`${BurgerConstructorStyles.collected}`}>
        {ingredients.map((ingredient, index) => 
          {
            return (
              <li key={index}>
                <BurgerItem
                  image = {ingredient.image}
                  price = {ingredient.price} 
                  title = {ingredient.name} 
                  isLocked={false}
                />
              </li>);            
          })
        }
      </ul>
      </AppScrollbar>

      <BurgerItem
        image = {bun.image}
        price = {bun.price}
        title = {`${bun.name} (низ)`}
        isLocked={true}
        type="bottom"
      />

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