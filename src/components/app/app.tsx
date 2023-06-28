import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { TDispatch } from '../../utils/store'
import { BrowserRouter as Router} from 'react-router-dom';

import ModalSwitch from '../modal-switch/modal-switch';

import { getIngredients } from '../../services/actions/burger-ingredients-requests';
import { requestDataUser } from '../../services/actions/user';


import { getCookie } from '../../utils/cookie';

import AppStyles from './app.module.css';


const App: FC = () => {
  const dispatch: TDispatch = useDispatch();
  const accessToken: string = getCookie('accessToken');

  dispatch(getIngredients());
  dispatch(requestDataUser(accessToken));

  return (
    <div className={AppStyles.wrapper}>
      <Router>
        <ModalSwitch /> 
      </Router>
    </div>
  );
}

export default App