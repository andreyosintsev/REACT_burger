import { postUserRegisterToApi } from '../../utils/burger-api';
import { NORMA_API } from '../../components/app/app';

export const USER_DATA_UPDATE =    'USER_DATA_UPDATE';

export const USER_REG =            'USER_REG';
export const USER_REG_SUCCESS =    'USER_REG_SUCCESS';
export const USER_REG_FAILED  =    'USER_REG_FAILED';

export const USER_AUTH =           'USER_AUTH';
export const USER_PASSWORD_RESET = 'USER_PASSWORD_RESET';

//TO DO: переделать на getState()
export const registerUser = (userEmail, userPassword, userName) => {
    return function (dispatch) {
      dispatch({
        type: USER_REG
      });
      try {
        //
        postUserRegisterToApi(
            NORMA_API, {
              "email": userEmail, 
              "password": userPassword,
              "name": userName
            }
          )
          .then(data => {
            console.log(data);
            dispatch({
              type: USER_REG_SUCCESS,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken 
            });
          })
          .catch((error) => {
            console.error(error);
            dispatch({
              type: USER_REG_FAILED,
            });
          });
      } catch (error) {
        console.error(error);
        dispatch({
          type: USER_REG_FAILED,
        });
      }
    };
  };