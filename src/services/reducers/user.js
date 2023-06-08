import {  
          USER_DATA_UPDATE,
          USER_REG,
          USER_REG_SUCCESS,
          USER_REG_FAILED,
          USER_LOGIN,
          USER_LOGIN_SUCCESS,
          USER_LOGIN_FAILED,
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
    case USER_LOGIN: 
      return {
        ...state,
        userIsLogging: true,
        userHasError: false
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userIsLogged: true,
        userIsLogging: false,
        userHasError: false,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        userIsLogged: false,
        userIsLogging: false,
        userHasError: true
      };
      case USER_LOGOUT: 
      return {
        ...state,
        userIsLogging: true,
        userHasError: false
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        userIsLogged: false,
        userIsLogging: false,
        userHasError: false,
      };
    case USER_LOGOUT_FAILED:
      return {
        ...state,
        userIsLogging: false,
        userHasError: true
      };
    default: return state;
  }
};

