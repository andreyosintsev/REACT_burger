import React, { useState, useContext } from 'react';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerItem from '../burger-item/burger-item';
import BurgerTotal from '../burger-total/burger-total';
import AppScrollbar from '../app-scrollbar/app-scrollbar';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { BurgerConstructorContext } from '../../utils/burger-api';
import { BurgerTotalContext } from '../../utils/burger-api';
import { getDataFromApi } from '../../utils/burger-api';

import BurgerConstructorStyles from './burger-constructor.module.css';

const NORMA_API = 'https://norma.nomoreparties.space/api';

function BurgerConstructor() {
  const data = useContext(BurgerConstructorContext);
  const [modalShow, setModalShow] = useState(false);
  const [orderNum, setOrderNum] = useState({num:'----', isLoading: false, hasError: false});

  const [state, dispatch] = React.useReducer(reducer, {sum: 0});

  function reducer(state, action) {
    switch (action.type) {
      case "add":
        return { sum: state.sum + action.price };
      case "reset":
        return { sum: 0 };
      default:
        throw new Error(`Неверный action.type: ${action.type}`);
    }
  }

  const getOrderNumber = () => {
    try {
      getDataFromApi(
        NORMA_API, 
        'post', 
        {'ingredients': data.map(ingredient => ingredient._id)}
      )
      .then(data => setOrderNum({...orderNum, num: data.number, isLoading: false}))
      .catch ((error) => {
        console.error(error);
        setOrderNum({...orderNum, num: 'ERROR!', hasError: true, isLoading: false});
      });
    } catch (error) {
      console.error(error);
      setOrderNum({...orderNum, num: 'ERROR!', hasError: true, isLoading: false});
    }
  };

  React.useEffect (()=> {
    dispatch({ type: 'reset' });
    dispatch({ type: 'add', price: +bun.price * 2 });
    ingredients.forEach(item => dispatch({ type: 'add', price: +item.price }));
  }, [data]);

  const showOrderDetails = () => {
    if (!modalShow) {
      getOrderNumber();
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
      <ul>
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
          <BurgerTotalContext.Provider value={state.sum}>
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
        <OrderDetails orderNum={orderNum.num}/>
      </Modal>
    }
    </>
  );
}

export default BurgerConstructor