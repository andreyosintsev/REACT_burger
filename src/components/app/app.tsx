import { FC, useEffect } from 'react';
import { useDispatch } from '../../declarations/hooks';
import { BrowserRouter as Router} from 'react-router-dom';

import ModalSwitch from '../modal-switch/modal-switch';

import { getIngredients } from '../../services/actions/burger-ingredients-requests';
import { requestDataUser } from '../../services/actions/user';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE

} from '../../services/constants/ws-middleware';


import { getCookie } from '../../utils/cookie';

import AppStyles from './app.module.css';


const App: FC = () => {
  const dispatch = useDispatch();
  const accessToken: string = getCookie('accessToken');

  dispatch(getIngredients());
  dispatch(requestDataUser(accessToken));


  dispatch({
    type: WS_CONNECTION_START
  });

  useEffect(() => {
    return () =>{
      dispatch({
        type: WS_CONNECTION_CLOSE
      })
    }
  });

  return (
    <div className={AppStyles.wrapper}>
      <Router>
        <ModalSwitch /> 
      </Router>
    </div>
  );
}

export default App