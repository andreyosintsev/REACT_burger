import { FC } from 'react';

import { useSelector } from '../../declarations/hooks';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderIngredient from '../order-ingredient/order-ingredient';

import { burgerIngredientRequests } from '../../services/selectors/burger-ingredients';

import OrderInfoIngredientStyles from './order-info-ingredient.module.css';

type TOrderInfoIngredient = {
  id: string;
  pts: number;
}

const OrderInfoIngredient: FC<TOrderInfoIngredient> = ({id, pts}) => {

  const ingredientsList = useSelector(burgerIngredientRequests).ingredientsList;

  const ingredient = id && ingredientsList ? ingredientsList.find(ingredient => ingredient._id === id) : undefined;



  return (
    <>
    { ingredient &&
    <div className={`${OrderInfoIngredientStyles.content} mb-4`}>
      <div className={`${OrderInfoIngredientStyles.ingredient}`}>
        <OrderIngredient url={ingredient.image_mobile} />
        {/* <div className={`${OrderInfoIngredientStyles.name} ml-4`}> */}
          <p className="text text_type_main-small ml-4">
            {ingredient.name}
          </p>
        {/* </div> */}
      </div>
      <div className={`${OrderInfoIngredientStyles.num_price} ml-4 mr-6`}>
        <p className="text text_type_digits-default">
          <span>{pts.toString()} x {ingredient.price}</span><CurrencyIcon type="primary" />
        </p>
      </div>
    </div> }
    {!ingredient && null}
    </>
  )
}

export default OrderInfoIngredient