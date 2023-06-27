import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { TBurgerItem, TConstructorIngredient } from '../../declarations/types';

import BurgerItemStyles from './burger-item.module.css';

const BurgerItem: FC<TBurgerItem> = (props) => {

  const { uuid, 
          image, 
          price, 
          title, 
          isLocked, 
          type, 
          removeHandler} = props;

  const drag = () => !isLocked
  ? <div className={BurgerItemStyles.drag}><DragIcon type="primary"/></div>
  : <div className={BurgerItemStyles.drag}></div>

  const dispatch = useDispatch();

  const onSwapHandler = (sourceIngredientUuid: string, targetIngredientUuid: string) => {
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

  const [, dropTarget] = useDrop<TConstructorIngredient, void, {isHover: boolean}>({
    accept: 'constructorIngredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      onSwapHandler(item.uuid, uuid);
    }
  });

  return (
    <div className={`${BurgerItemStyles.content} ml-4 mr-4`} 
         ref={isLocked ? null : (e) => { dragRef(e); dropTarget(e); }}>
      {drag()}
      <ConstructorElement 
        isLocked={isLocked} 
        text={title} 
        price={price} 
        thumbnail={image} 
        type={type} 
        handleClose={() => removeHandler(type, uuid)}
      />
    </div>
  );
}

export default BurgerItem