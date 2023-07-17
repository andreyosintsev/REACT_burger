import { FC } from 'react';
import { useDispatch } from '../../declarations/hooks';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import ForgotPassword  from '../../pages/registration/forgot-password/forgot-password';
import HomePage  from '../../pages/homepage/homepage';
import Feed from '../../pages/feed/feed';
import OrderInfo from '../../pages/order-info/order-info';
import Profile  from '../../pages/account/profile/profile';
import ProfileOrders  from '../../pages/account/profile/profile-orders/profile-orders';
import Registration  from '../../pages/registration/registration/registration';
import ResetPassword  from '../../pages/registration/reset-password/reset-password';
import SignIn  from '../../pages/registration/sign-in/sign-in';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import IngredientDetails from '../ingredient-details/ingredient-details';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import Modal from '../modal/modal';

import { INGREDIENTS_DESELECT_INGREDIENT } from '../../services/constants/burger-ingredients-details';

import { WS_ROLE_FEED, WS_ROLE_PROFILE } from '../../declarations/ws-middleware';

const ModalSwitch: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    dispatch({
      type: INGREDIENTS_DESELECT_INGREDIENT
    });
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/login' element={<ProtectedRouteElement 
                element={<SignIn />}
                anonymous={true} /> /* Редирект при условии, что пользователь УЖЕ залогинен*/
              } />
        <Route path='/register' element={<ProtectedRouteElement 
                element={<Registration />}
                anonymous={true}/>
              } />
        <Route path='/forgot-password' element={<ProtectedRouteElement 
                element={<ForgotPassword />}
                anonymous={true}/>
              } />
        <Route path='/reset-password' element={<ProtectedRouteElement 
                element={<ResetPassword />}
                anonymous={true}/>
              } />
        <Route path='/profile' element={<ProtectedRouteElement 
                element={<Profile />}
                anonymous={false}/> /* Редирект при условии, что пользователь ЕЩЁ НЕ залогинен*/
              } />
        <Route path='/profile/orders' element={<ProtectedRouteElement 
                element={<ProfileOrders />}
                anonymous={false}/>
              } />
        <Route path='/profile/orders/:id' element={<ProtectedRouteElement 
                element={<OrderInfo role={WS_ROLE_PROFILE} />}
                anonymous={false}/>
              } />
        <Route path='/' element={<HomePage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />    
        <Route path='/feed/:id' element={<OrderInfo role={WS_ROLE_FEED} />} />     
        <Route path="*" element={<NotFound404 />} />   
      </Routes>

      {background && (
        <Routes>
          <Route path='/ingredients/:ingredientId'
                  element={
                    <Modal onClick={handleModalClose}>
                      <IngredientDetails />
                    </Modal>
                  }
          />
          <Route path='/feed/:id' 
                  element={
                    <Modal onClick={handleModalClose}>
                      <OrderInfo role={WS_ROLE_FEED} />
                    </Modal>
                  }
          /> 
          <Route path='/profile/orders/:id'
                  element={<ProtectedRouteElement 
                    element={
                      <Modal onClick={handleModalClose}>
                        <OrderInfo role={WS_ROLE_PROFILE} />
                      </Modal>
                    }
                    anonymous={false}/>
                  } />
        </Routes>
      )}
    </>
  );
}

export default ModalSwitch 