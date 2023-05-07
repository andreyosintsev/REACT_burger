import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerItem from '../burger-item/burger-item';
import BurgerTotal from '../burger-total/burger-total';
import AppScrollbar from '../app-scrollbar/app-scrollbar';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import BurgerIngredientsProps from '../burger-ingredients/burger-ingredients-props';

import BurgerConstructorStyles from './burger-constructor.module.css';


function BurgerConstructor({data}) {

  const [modalShow, setModalShow] = React.useState(false);

  const showOrderDetails = () => setModalShow(!modalShow);

  return (
    <>
    <section className={`${BurgerConstructorStyles.content} pt-25`}>
      
      <BurgerItem onClick={showOrderDetails}
        image = {data[0].image}
        price = {data[0].price} 
        title = {`${data[0].name} (верх)`} 
        isLocked={true}
        type="top"
      />

      <AppScrollbar style={{maxHeight: 'calc(100vh - 500px)'}}>
      <ul>
        {data.map((ingredient, index, arr) => {
          if (index > 0 && index < arr.length - 1) {
              return (
              <li key={index}>
                  <BurgerItem
                    image = {ingredient.image}
                    price = {ingredient.price} 
                    title = {ingredient.name} 
                    isLocked={false}
                  />
                </li>);            
          } else {
            return null;
          }
        })}
      </ul>
      </AppScrollbar>

      <BurgerItem
        image = {data[data.length - 1].image}
        price = {data[data.length - 1].price}
        title = {`${data[data.length - 1].name} (низ)`}
        isLocked={true}
        type="bottom"
      />

      <div className={`${BurgerConstructorStyles.summary} mt-10`}>
        <div className={`${BurgerConstructorStyles.total} mr-10`}>
          <BurgerTotal sum = {610} />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={showOrderDetails}>Оформить заказ</Button>
        <div style={{width: '16px'}}></div>
      </div>
    </section>
    {modalShow && 
      <Modal header={''} onclick={showOrderDetails}>
        <OrderDetails/>
      </Modal>
    }
    </>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(BurgerIngredientsProps)
}

export default BurgerConstructor