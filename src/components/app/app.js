import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import ForgotPassword  from '../../pages/registration/forgot-password/forgot-password';
import HomePage  from '../../pages/homepage/homepage';
import Profile  from '../../pages/account/profile/profile';
import ProfileOrders  from '../../pages/account/profile/profile-orders/profile-orders';
import Registration  from '../../pages/registration/registration/registration';
import ResetPassword  from '../../pages/registration/reset-password/reset-password';
import SignIn  from '../../pages/registration/sign-in/sign-in';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';

import { getIngredients } from '../../services/actions/burger-ingredients-requests';
import { requestDataUser } from '../../services/actions/user';

import { getCookie } from '../../utils/cookie';

import AppStyles from './app.module.css';

export const NORMA_API = 'https://norma.nomoreparties.space/api';

function App() {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  useEffect( ()=> {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(()=>{
    console.log('App: requestDataUser')
    dispatch(requestDataUser(accessToken));
  }, []);

  return (
   <>
    <div className={AppStyles.wrapper}>
      <Router>
        <AppHeader />
        <Routes>
          <Route path='/login' element={<SignIn 
                  // ifLogged={<HomePage />} 
                  // ifNotLogged={'/login'} 
                />} />
          <Route path='/register' element={<ProtectedRouteElement 
                  ifLogged={<HomePage />} 
                  ifNotLogged={'/register'} 
                />} />
          <Route path='/forgot-password' element={<ProtectedRouteElement 
                  ifLogged={<HomePage />} 
                  ifNotLogged={'/forgot-password'} 
                />} />
          <Route path='/reset-password' element={<ProtectedRouteElement 
                  ifLogged={<HomePage />} 
                  ifNotLogged={'/reset-password'} 
                />} />
          <Route path='/profile' element={<ProtectedRouteElement 
                  ifLogged={<Profile />} 
                  ifNotLogged={'/login'} 
                />} />
          <Route path='/orders' element={<ProtectedRouteElement 
                  ifLogged={<ProfileOrders />}
                  ifNotLogged={'/login'} 
                />} />
          <Route path='/ingredients:id' element={<ResetPassword />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </div>
    <div id="modals"></div>
    </>
  );
}

export default App