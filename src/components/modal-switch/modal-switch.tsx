import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { TDispatch } from '../../utils/store'

import AppHeader from '../app-header/app-header';
import ForgotPassword  from '../../pages/registration/forgot-password/forgot-password';
import HomePage  from '../../pages/homepage/homepage';
import Profile  from '../../pages/account/profile/profile';
import ProfileOrders  from '../../pages/account/profile/profile-orders/profile-orders';
import Registration  from '../../pages/registration/registration/registration';
import ResetPassword  from '../../pages/registration/reset-password/reset-password';
import SignIn  from '../../pages/registration/sign-in/sign-in';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import IngredientDetails from '../ingredient-details/ingredient-details';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import Modal from '../modal/modal';

import { INGREDIENTS_DESELECT_INGREDIENT } from '../../services/actions/burger-ingredients-details';

const ModalSwitch: FC = () => {
  const dispatch: TDispatch = useDispatch();
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
        <Route path='/orders' element={<ProtectedRouteElement 
                element={<ProfileOrders />}
                anonymous={false}/>
              } />
        <Route path='/' element={<HomePage />} />
        <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />         
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
        </Routes>
      )}
    </>
  );
}

export default ModalSwitch 