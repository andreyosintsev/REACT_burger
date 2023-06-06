import setCookie from "../../utils/cookie";
import saveToLocalStorage from "../../utils/local-storage";

import {  
          USER_DATA_UPDATE,
          USER_REG,
          USER_REG_SUCCESS,
          USER_REG_FAILED,
          USER_LOGOUT,
          USER_LOGOUT_SUCCESS,
          USER_LOGOUT_FAILED,
          USER_AUTH,
          USER_PASSWORD_RESET } from "../actions/user";

const initialState = {
  userIsLogged:  false,
  userIsLogging: false,
  userHasError:  false,

  userEmail: '',
  userPassword: '',
  userName: ''
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA_UPDATE:
      return {
        ...state,
        userEmail: action.email,
        userPassword: action.password,
        userName: action.name
      };
    case USER_REG: 
      return {
        ...state,
        userIsLogged: false,
        userIsLogging: true,
        userHasError: false
      };
    case USER_REG_SUCCESS:
      setCookie('accessToken', action.accessToken);
      saveToLocalStorage('refreshToken', action.refreshToken);
      return {
        ...state,
        userIsLogged: true,
        userIsLogging: false,
        userHasError: false,
      };
    case USER_REG_FAILED:
      return {
        ...state,
        userIsLogged: false,
        userIsLogging: false,
        userHasError: true
      };
    default: return state;
  }
};

