import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from '../../declarations/hooks';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderIngredient from '../order-ingredient/order-ingredient';

import { TWSOrder } from '../../declarations/ws-middleware';
import { burgerIngredientRequests } from '../../services/selectors/burger-ingredients';

import { convertStatus } from '../../utils/utils';

import OrderCardStyles from './order-card.module.css';

type TOrderCard = {
  order: TWSOrder;
  displayStatus: boolean;
}

const OrderCard: FC<TOrderCard> = ({ order, displayStatus }) => {
  const ingredientsList = useSelector(burgerIngredientRequests).ingredientsList;
  const location = useLocation();

  const link: string = location.pathname === '/profile/orders' 
    ? `/profile/orders/${order._id}` 
    : `/feed/${order._id}`;
  
  const status = convertStatus(order.status);

  const text = order.ingredients.length > 5 
  ? "+" + (order.ingredients.length - 5)
  : "";

  const sum = order.ingredients.reduce((acc, curr, i, arr) => 
    acc += ingredientsList.find(data => data._id === arr[i])!.price, 0
  );

  return (
    <Link
      to={link}
      state={{ background: location }}
      className={OrderCardStyles.link}
    >
      <div className = {`${OrderCardStyles.card} pt-6 pl-6 pr-6 pb-6`}>
        <div className = {`${OrderCardStyles.card_header} mb-6`}>
          <div className = {OrderCardStyles.card_header_counter}>
            <p className="text text_type_digits-default">
              #{order.number}
            </p>
          </div>
          <div className = {OrderCardStyles.card_header_date}>
            <p className="text text_type_main-small text_color_inactive">
              <FormattedDate date={ 
                new Date(order.updatedAt)
              } />
            </p>
          </div>
        </div>
        <div className = {OrderCardStyles.card_title}>
          <p className="text text_type_main-medium">
            {order.name}
          </p>
        </div>
        { displayStatus && 
          <div className = {`${OrderCardStyles.card_status} ${OrderCardStyles.created} mt-2`}>
            <p className="text text_type_main-small">
              {status}
            </p>
          </div>
        }
        <div className = {`${OrderCardStyles.card_content} mt-6`}>
          <div className = {OrderCardStyles.card_content_ingredients}>
            <ul>
            {
              order.ingredients.slice(0, 5).map((ingredient, i, arr) => {
                const url = ingredientsList.find(data => data._id === ingredient)!.image_mobile;
                const zIndex = (arr.length - i).toString();
                return (
                  <li key={ingredient + i} style={{'zIndex': zIndex}}>
                    {i === arr.length - 1 
                      ? <OrderIngredient url={url} text={text}/>
                      : <OrderIngredient url={url}/>
                    }
                  </li>
                )
              })
            }
             </ul>
           </div>
           <div className = {`${OrderCardStyles.card_content_price}`}>
             <p className="text text_type_digits-default">
               <span>{sum}</span><CurrencyIcon type="primary" />
             </p>
           </div>
         </div>
       </div>
     </Link>
  )
}

export default OrderCard;