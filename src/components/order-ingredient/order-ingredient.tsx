import { FC } from 'react';

import orderIngredientStyles from './order-ingredient.module.css';

type TOrderIngredient = {
  url: string;
  text?: string;
}

const OrderIngredient: FC<TOrderIngredient> = ({url, text}) => {

  const brightness = text ? "60%" : "100%"; 

  return (
    <div className = {orderIngredientStyles.content} 
      style={{backgroundImage: `url(${url})`, 'filter': `brightness(${brightness})`}}>
        {text &&
          <p className="text text_type_main-default">{text}</p> 
        }
    </div>
  )
};

export default OrderIngredient;