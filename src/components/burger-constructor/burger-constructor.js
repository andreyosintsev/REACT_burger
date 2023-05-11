import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerItem from '../burger-item/burger-item';
import BurgerTotal from '../burger-total/burger-total';
import AppScrollbar from '../app-scrollbar/app-scrollbar';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { postBurgerIngredientsToApi } from '../../utils/burger-api';

import { BurgerConstructorContext } from '../../utils/burger-api';
import { BurgerTotalContext } from '../../utils/burger-api';

import BurgerIngredientsProps from '../burger-ingredients/burger-ingredients-props';

import BurgerConstructorStyles from './burger-constructor.module.css';

const NORMA_API = 'https://norma.nomoreparties.space/api';

function BurgerConstructor() {
  const data = useContext(BurgerConstructorContext);
  const [modalShow, setModalShow] = React.useState(false);
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

  const payload = { 
    "ingredients": ["609646e4dc916e00276b286e","609646e4dc916e00276b2870"]
  } ;

  const postBurgerIngredients = (NORMA_API, payload) => {
    //setState({...state, hasError: false, isLoading: true});
    try {
      postBurgerIngredientsToApi(NORMA_API, payload)
      .then(
        // data => setState({...state, ingredientsData: data, isLoading: false})
           data => { console.log(data);}
        );
      // .catch (() => {
      //   setState({...state, ingredientsData: [], hasError: true, isLoading: false});
      // });
    } catch (error) {
      // setState({...state, ingredientsData: [], hasError: true, isLoading: false});
    }
  };

  React.useEffect (()=> {
    dispatch({type: 'reset'});
    dispatch({type: 'add', price: +bun.price * 2 });
    ingredients.forEach(item => dispatch({type: 'add', price: +item.price}));
  }, [data]);

  const showOrderDetails = () => {
    postBurgerIngredients(NORMA_API, payload);
    setModalShow(!modalShow);
  };

  const bun = data.filter(item => item.type === "bun")[0];
  const ingredients = data.filter(item => item.type !== "bun");

  return (
    <>
    <section className={`${BurgerConstructorStyles.content} pt-25`}>
      
      <BurgerItem onClick={showOrderDetails}
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
        <OrderDetails />
      </Modal>
    }
    </>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(BurgerIngredientsProps)
}

export default BurgerConstructor