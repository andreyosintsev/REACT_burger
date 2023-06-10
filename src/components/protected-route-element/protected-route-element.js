import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { userData } from '../../services/selectors/user';

function ProtectedRouteElement ({ifLogged, ifNotLogged}) {
  const {userIsLogged} = useSelector(userData);
  
  if (userIsLogged) {
    return ifLogged;
  } else {
    return <Navigate to={ifNotLogged} replace={true}/>
  }
}

export default ProtectedRouteElement