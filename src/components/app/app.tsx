import { FC } from 'react';
import { AnyAction } from "redux";
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import { BrowserRouter as Router} from 'react-router-dom';

import ModalSwitch from '../modal-switch/modal-switch';

import { getIngredients } from '../../services/actions/burger-ingredients-requests';
import { requestDataUser } from '../../services/actions/user';

import { getCookie } from '../../utils/cookie';

import AppStyles from './app.module.css';

type TState = { a: string };
type TAppDispatch = ThunkDispatch<TState, any, AnyAction>; 

const App: FC = () => {
  const dispatch: TAppDispatch = useDispatch();
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