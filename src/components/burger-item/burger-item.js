import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag, useDrop } from "react-dnd";

import BurgerItemStyles from './burger-item.module.css';

function BurgerItem(props) {

  const {uuid, image, price, title, isLocked, type, removeHandler} = props;

  const drag = () => !isLocked ? <div className={BurgerItemStyles.drag}><DragIcon /></div> :
        <div className={BurgerItemStyles.drag}></div>

  const dispatch = useDispatch();

  const onSwapHandler = (sourceIngredientUuid, targetIngredientUuid) => {
    dispatch({
      type: 'CONSTRUCTOR_SWAP_INGREDIENTS',
      sourceIngredientUuid,
      targetIngredientUuid
    })
  }

  const [, dragRef] = useDrag({
    type: "constructorIngredient",
    item: {uuid}
  });

  const [{isHover}, dropTarget] = useDrop({
    accept: 'constructorIngredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      onSwapHandler(item.uuid, uuid);
    }
  });

  const style = {};//isHover ? {paddingBottom: '104px'} : {paddingBottom: '0'};

  return (
    <div className={`${BurgerItemStyles.content} ml-4 mr-4`} 
         style={style}
         ref={isLocked ? null : (e) => { dragRef(e); dropTarget(e); }}>
      {drag()}
      <ConstructorElement 
        isLocked={isLocked} 
        text={title} 
        price={price} 
        thumbnail={image} 
        type={type} 
        handleClose={() => removeHandler(uuid)}
      />
    </div>
  );
}

BurgerItem.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isLocked: PropTypes.bool, //в ConstructorElement может быть и undefined, поэтому не isRequired
  type: PropTypes.string,   //то же самое
}

export default BurgerItem