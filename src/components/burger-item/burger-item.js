import React from 'react';
import PropTypes from 'prop-types';

import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerItemStyles from './burger-item.module.css';

function BurgerItem({image, price, title, isLocked, type}) {

  const drag = () => !isLocked ? <div className={BurgerItemStyles.drag}><DragIcon /></div> :
        <div className={BurgerItemStyles.drag}></div>

  return (
    <div className={`${BurgerItemStyles.content} ml-4 mr-4`}>
      {drag()}
      <ConstructorElement isLocked={isLocked} text={title} price={price} thumbnail={image} type={type}/>
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