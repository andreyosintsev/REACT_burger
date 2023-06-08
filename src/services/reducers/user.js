import {  
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
          USER_PASSWORD_REQUEST,
          USER_PASSWORD_REQUEST_SUCCESS,
          USER_PASSWORD_REQUEST_FAILED,
          USER_PASSWORD_RESET,
          USER_PASSWORD_RESET_SUCCESS,
          USER_PASSWORD_RESET_FAILED } from "../actions/user";

const initialState = {
  userIsLogged: false,
  userPending:  false,
  userHasError: false,
  userPasswordResetting: false
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_REG: 
      return {
        ...state,
        userIsLogged: false,
        userPending: true,
        userHasError: false
      };
    case USER_REG_SUCCESS:
      return {
        ...state,
        userIsLogged: true,
        userPending: false,
        userHasError: false,
      };
    case USER_REG_FAILED:
      return {
        ...state,
        userIsLogged: false,
        userPending: false,
        userHasError: true
      };
    case USER_LOGIN: 
      return {
        ...state,
        userPending: true,
        userHasError: false
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userIsLogged: true,
        userPending: false,
        userHasError: false,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        userIsLogged: false,
        userPending: false,
        userHasError: true
      };
    case USER_LOGOUT: 
      return {
        ...state,
        userPending: true,
        userHasError: false
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        userIsLogged: false,
        userPending: false,
        userHasError: false,
      };
    case USER_LOGOUT_FAILED:
      return {
        ...state,
        userPending: false,
        userHasError: true
      };
    case USER_PASSWORD_REQUEST: 
      return {
        ...state,
        userPending: true,
        userHasError: false,
        userPasswordResetting: false
      };
    case USER_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        userHasError: false,
        userPasswordResetting: true
      };
    case USER_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        userHasError: true,
        userPasswordResetting: false
      };
      case USER_PASSWORD_RESET: 
      return {
        ...state,
        userPending: true,
        userHasError: false,
        userPasswordResetting: false
      };
    case USER_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        userHasError: false,
        userPasswordResetting: false
      };
    case USER_PASSWORD_RESET_FAILED:
      return {
        ...state,
        userHasError: true,
        userPasswordResetting: false
      };
    default: return state;
  }
};

