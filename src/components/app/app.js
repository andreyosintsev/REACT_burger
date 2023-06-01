import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppStyles from './app.module.css';

import AppHeader from '../app-header/app-header';

import HomePage  from '../../pages/homepage/homepage';
import SignIn  from '../../pages/registration/sign-in/sign-in';
import Registration  from '../../pages/registration/registration/registration';
import ForgotPassword  from '../../pages/registration/forgot-password/forgot-password';
import ResetPassword  from '../../pages/registration/reset-password/reset-password';

import { getIngredients } from '../../services/actions/burger-ingredients-requests';

export const NORMA_API = 'https://norma.nomoreparties.space/api';

function App() {

  const dispatch = useDispatch();

  useEffect( ()=> {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
   <>
    <div className={AppStyles.wrapper}>

      <Router>
        <AppHeader />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/ingredients:id' element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
    <div id="modals"></div>
    </>
  );
}

export default App