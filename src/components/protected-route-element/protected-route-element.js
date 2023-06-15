import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { userData } from '../../services/selectors/user';

function ProtectedRouteElement ({element, anonymous = false}) {
  const {userIsLogged} = useSelector(userData);
  const location = useLocation();
  const from = location.state?.from || '/';

  console.log('anonymous: '+anonymous);
  console.log('userIsLogged: '+userIsLogged);
  
  if (anonymous && userIsLogged) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !userIsLogged) {
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  return element;
}

ProtectedRouteElement.propTypes = {
  element:   PropTypes.element.isRequired,
  anonymous: PropTypes.bool.isRequired
}

export default ProtectedRouteElement