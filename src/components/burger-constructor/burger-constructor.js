import { useState, useEffect } from 'react';
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

import { getOrderNumber } from '../../services/actions/burger-constructor-orders';

import {
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_CLEAR_INGREDIENTS
} from '../../services/actions/burger-constructor-ingredients';

import BurgerConstructorStyles from './burger-constructor.module.css';

import { stubText1, stubText2 } from '../../utils/locale';

import { burgerIngredientRequests,
         burgerConstructorIngredients } from '../app/app';

function BurgerConstructor() {
  const ingredientsList = useSelector(burgerIngredientRequests).ingredientsList;
  const constructorList = useSelector(burgerConstructorIngredients).constructorList;
  const bun = useSelector(burgerConstructorIngredients).bun;

  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  const [, dropTarget] = useDrop({
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
      if (bun) {
        dispatch({
          type: CONSTRUCTOR_REMOVE_INGREDIENT,
          uuid: bun.uuid
        });
      }
    } 
    dispatch({
      type: CONSTRUCTOR_ADD_INGREDIENT,
      uuid: uuid(),
      ingredient: droppedIngredient
    });
  };

  const showOrderDetails = () => {
    if (!modalShow) {
      if (!bun) { return; }
      dispatch(getOrderNumber(constructorList, bun));
      setModalShow(true);
    } else {
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
      {ingredients.length === 0 && !bun && <BurgerStub text={stubText1} />}
      {ingredients.length === 0 &&  bun && <BurgerStub text={stubText2} />}
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
          <BurgerTotal/>
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