import { FC } from 'react';
import { useDispatch } from '../../declarations/hooks';
import { BrowserRouter as Router} from 'react-router-dom';

import ModalSwitch from '../modal-switch/modal-switch';

import { getIngredients } from '../../services/actions/burger-ingredients-requests';
import { requestDataUser } from '../../services/actions/user';

import { WS_FEED_CONNECTION_START } from '../../services/constants/ws-feed-middleware';
import { WS_PROFILE_CONNECTION_START } from '../../services/constants/ws-profile-middleware';

import { getCookie } from '../../utils/cookie';

import AppStyles from './app.module.css';


const App: FC = () => {
  const dispatch = useDispatch();
  const accessToken: string = getCookie('accessToken');

  dispatch(getIngredients());
  dispatch(requestDataUser(accessToken));


  dispatch({
    type: WS_FEED_CONNECTION_START
  });

  dispatch({
    type: WS_PROFILE_CONNECTION_START
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