import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

import { userData } from '../../services/selectors/user';

type TProtectedRouteElement = {
  element: ReactElement;
  anonymous?: boolean;
};

const ProtectedRouteElement: FC<TProtectedRouteElement> = ({element, anonymous = false}) => {
  const {userIsLogged} = useSelector(userData);
  const location = useLocation();
  const from = location.state?.from || '/';
  
  if (anonymous && userIsLogged) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !userIsLogged) {
    return <Navigate to="/login" state={{ from: location }}/>;
  }

  return element;
}

export default ProtectedRouteElement