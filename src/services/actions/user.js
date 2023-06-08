import {  postUserRegisterToApi,
          postUserLoginToApi,
          postUserLogoutToApi,
          postUserRequestPasswordToApi,
          postUserResetPasswordToApi } from '../../utils/burger-api';

import {  setCookie,
          deleteCookie  } from "../../utils/cookie";

import {  saveToLocalStorage,
          deleteFromLocalStorage,
          clearBurgerLocalStorage } from "../../utils/local-storage";

import { NORMA_API } from '../../components/app/app';

export const USER_DATA_UPDATE =    'USER_DATA_UPDATE';

export const USER_REG =            'USER_REG';
export const USER_REG_SUCCESS =    'USER_REG_SUCCESS';
export const USER_REG_FAILED  =    'USER_REG_FAILED';

export const USER_LOGIN =         'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED  = 'USER_LOGIN_FAILED';

export const USER_LOGOUT =         'USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED  = 'USER_LOGOUT_FAILED';

export const USER_AUTH =           'USER_AUTH';

export const USER_PASSWORD_REQUEST = 'USER_PASSWORD_REQUEST';
export const USER_PASSWORD_REQUEST_SUCCESS = 'USER_PASSWORD_REQUEST_SUCCESS';
export const USER_PASSWORD_REQUEST_FAILED = 'USER_PASSWORD_REQUEST_FAILED';

export const USER_PASSWORD_RESET = 'USER_PASSWORD_RESET';
export const USER_PASSWORD_RESET_SUCCESS = 'USER_PASSWORD_RESET_SUCCESS';
export const USER_PASSWORD_RESET_FAILED = 'USER_PASSWORD_RESET_FAILED';

export const registerUser = (userEmail, userPassword, userName) => {
  return function (dispatch) {
    dispatch({
      type: USER_REG
    });
    try {
      postUserRegisterToApi(
          NORMA_API, {
            "email": userEmail, 
            "password": userPassword,
            "name": userName
          }
        )
        .then(data => {
          setCookie('accessToken', data.accessToken);
          saveToLocalStorage('refreshToken', data.refreshToken);
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

export const loginUser = (userEmail, userPassword) => {
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN
    });
    try {
      //
      postUserLoginToApi(
          NORMA_API, {
            "email": userEmail, 
            "password": userPassword,
          }
        )
        .then(data => {
          console.log(data);
          setCookie('accessToken', data.accessToken);
          saveToLocalStorage('refreshToken', data.refreshToken);
          dispatch({
            type: USER_LOGIN_SUCCESS,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken 
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: USER_LOGIN_FAILED,
          });
        });
    } catch (error) {
      console.error(error);
      dispatch({
        type: USER_LOGIN_FAILED,
      });
    }
  };
};

export const logoutUser = (refreshToken) => {
  return function (dispatch) {
    dispatch({
      type: USER_LOGOUT
    });
    try {
      //
      postUserLogoutToApi(
          NORMA_API, {
            "token": refreshToken
          }
        )
        .then(data => {
          console.log(data);
          deleteCookie('accessToken');
          deleteFromLocalStorage('refreshToken');
          clearBurgerLocalStorage();
          dispatch({
            type: USER_LOGOUT_SUCCESS
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: USER_LOGOUT_FAILED,
          });
        });
    } catch (error) {
      console.error(error);
      dispatch({
        type: USER_LOGOUT_FAILED,
      });
    }
  };
};

export const requestPasswordUser = (email) => {
  return function (dispatch) {
    dispatch({
      type: USER_PASSWORD_REQUEST
    });
    try {
      //
      postUserRequestPasswordToApi(
          NORMA_API, {
            "email": email
          }
        )
        .then(data => {
          console.log(data);
          dispatch({
            type: USER_PASSWORD_REQUEST_SUCCESS
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: USER_PASSWORD_REQUEST_FAILED,
          });
        });
    } catch (error) {
      console.error(error);
      dispatch({
        type: USER_PASSWORD_REQUEST_FAILED,
      });
    }
  };
};

export const resetPasswordUser = (password, token) => {
  return function (dispatch) {
    dispatch({
      type: USER_PASSWORD_RESET
    });
    try {
      //
      postUserResetPasswordToApi(
          NORMA_API, {
            "password": password,
            "token" : token
          } 
        )
        .then(data => {
          console.log(data);
          dispatch({
            type: USER_PASSWORD_RESET_SUCCESS
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: USER_PASSWORD_RESET_FAILED,
          });
        });
    } catch (error) {
      console.error(error);
      dispatch({
        type: USER_PASSWORD_REQUEST_FAILED,
      });
    }
  };
};