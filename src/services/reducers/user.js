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
          USER_DATA_UPDATE,
          USER_ROLLBACK_UPDATE,
          USER_PASSWORD_REQUEST,
          USER_PASSWORD_REQUEST_SUCCESS,
          USER_PASSWORD_REQUEST_FAILED,
          USER_PASSWORD_RESET,
          USER_PASSWORD_RESET_SUCCESS,
          USER_PASSWORD_RESET_FAILED,
          USER_GET_USER_DATA,
          USER_GET_USER_DATA_SUCCESS,
          USER_GET_USER_DATA_FAILED,
          USER_UPDATE_USER_DATA,
          USER_UPDATE_USER_DATA_SUCCESS,
          USER_UPDATE_USER_DATA_FAILED
        } from "../actions/user";

const initialState = {
  userIsLogged: false,
  userPending:  false,
  userHasError: false,
  userPasswordResetting: false,

  userName: '',
  userEmail: '',
  userRollbackName: '',
  userRollbackEmail: ''
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
        ...initialState
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
    case USER_GET_USER_DATA: 
      return {
        ...state,
        userPending: true,
        userHasError: false
      };
    case USER_GET_USER_DATA_SUCCESS:
      return {
        ...state,
        userPending: false,
        userHasError: false,
        userIsLogged: true,
        userName: action.userName,
        userEmail: action.userEmail
      };
    case USER_GET_USER_DATA_FAILED:
      return {
        ...state,
        userPending: false,
        userHasError: true
      };
    case USER_DATA_UPDATE:
        return {
          ...state,
          userName: action.userName,
          userEmail: action.userEmail
        };
    case USER_ROLLBACK_UPDATE:
        return {
          ...state,
          userRollbackName: action.userRollbackName,
          userRollbackEmail: action.userRollbackEmail
        };
    case USER_UPDATE_USER_DATA: 
      return {
        ...state,
        userPending: true,
        userHasError: false
      };
    case USER_UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        userPending: false,
        userHasError: false,
        userName: action.userName,
        userEmail: action.userEmail
      };
    case USER_UPDATE_USER_DATA_FAILED:
      return {
        ...state,
        userPending: false,
        userHasError: true,
        userName: state.userRollbackName,
        userEmail: state.userRollbackEmail
      };
    default: return state;
  }
};

