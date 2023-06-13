import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { userData } from '../../services/selectors/user';

function ProtectedRouteElement ({element, redirect, ifLogged}) {
  const {userIsLogged} = useSelector(userData);
  
  if (ifLogged) { /* Сделать переадресацию, если пользователь УЖЕ залогинен */
    return userIsLogged ? <Navigate to={redirect} replace={true} /> : element;
  } else {        /* Сделать переадресацию, если пользователь ЕЩЁ НЕ залогинен */
    return userIsLogged ? element : <Navigate to={redirect} replace={true} />;
  }
}

ProtectedRouteElement.propTypes = {
  element:   PropTypes.element.isRequired,
  redirect:  PropTypes.string.isRequired,
  ifLogged: PropTypes.bool.isRequired
}

export default ProtectedRouteElement