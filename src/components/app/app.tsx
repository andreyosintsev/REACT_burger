import { FC, useEffect } from 'react';
import { useDispatch } from '../../declarations/hooks';
import { BrowserRouter as Router} from 'react-router-dom';

import ModalSwitch from '../modal-switch/modal-switch';

import { getIngredients } from '../../services/actions/burger-ingredients-requests';
import { requestDataUser } from '../../services/actions/user';

import { getCookie } from '../../utils/cookie';

import AppStyles from './app.module.css';

const App: FC = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(requestDataUser(accessToken));
  }, []);

  return (
    <div className={AppStyles.wrapper}>
      {/* <Router basename={'burger'}> */}
      <Router>
        <ModalSwitch /> 
      </Router>
    </div>
  );
}

export default App