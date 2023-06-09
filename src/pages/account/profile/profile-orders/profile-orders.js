import { useNavigate } from 'react-router-dom';

function ProfileOrders() {

  //Пока ещё нечего показывать
  const navigate = useNavigate();
  navigate('/profile', {replace: true});
}

export default ProfileOrders