import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { userData } from '../../services/selectors/user';

function ProtectedRouteElement ({element, redirectTo}) {
  const {userIsLogged} = useSelector(userData);

  console.log('userLogged? '+userIsLogged);

  return userIsLogged ? element : <Navigate to={redirectTo} replace/>;
}

export default ProtectedRouteElement