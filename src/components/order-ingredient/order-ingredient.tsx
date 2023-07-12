import { FC } from 'react';

import orderIngredientStyles from './order-ingredient.module.css';

type TOrderIngredient = {
  url: string;
  zIndex: string;
}

const OrderIngredient: FC<TOrderIngredient> = ({url, zIndex}) => {
  return (
    <div className = {orderIngredientStyles.content} 
      style={{backgroundImage: `url(${url})`, 'zIndex': zIndex}}>
      {/* style={{backgroundImage: `url(${url})`}}> */}
    </div>
  )
};

export default OrderIngredient;