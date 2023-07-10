import {  AppDispatch } from '../../declarations/types';

import {  postUserRegisterToApi,
          postUserLoginToApi,
          postUserLogoutToApi,
          postUserRequestPasswordToApi,
          postUserResetPasswordToApi,
          getUserDataFromApi,
          patchUserDataToApi,
          postRefreshTokenToApi } from '../../utils/burger-api';

import {  setCookie,
          getCookie,
          deleteCookie  } from "../../utils/cookie";

import {  getFromLocalStorage,
          saveToLocalStorage,
          deleteFromLocalStorage,
          clearBurgerLocalStorage } from "../../utils/local-storage";

import {
  USER_DATA_UPDATE,
  USER_ROLLBACK,
  USER_ROLLBACK_UPDATE,

  USER_REG,
  USER_REG_SUCCESS,
  USER_REG_FAILED,

  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,

  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,

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
} from "../constants/user";

export type TUserDataUpdateAction = {
  readonly type: typeof USER_DATA_UPDATE;  
  readonly userName: string | undefined;
  readonly userEmail: string | undefined;
}

export type TUserRollbackAction = {
  readonly type: typeof USER_ROLLBACK;  
  readonly userRollbackName: string;
  readonly userRollbackEmail: string;
}

export type TUserRollbackUpdateAction = {
  readonly type: typeof USER_ROLLBACK_UPDATE;  
  readonly userRollbackName: string;
  readonly userRollbackEmail: string;
}

export type TUserRegAction = {
  readonly type: typeof USER_REG;  
}

export type TUserRegSuccessAction = {
  readonly type: typeof USER_REG_SUCCESS;  
}

export type TUserRegFailedAction = {
  readonly type: typeof USER_REG_FAILED; 
}

export type TUserLoginAction = {
  readonly type: typeof USER_LOGIN;  
}

export type TUserLoginSuccessAction = {
  readonly type: typeof USER_LOGIN_SUCCESS;  
}

export type TUserLoginFailedAction = {
  readonly type: typeof USER_LOGIN_FAILED; 
}

export type TUserLogoutAction = {
  readonly type: typeof USER_LOGOUT;  
}

export type TUserLogoutSuccessAction = {
  readonly type: typeof USER_LOGOUT_SUCCESS;  
}

export type TUserLogoutFailedAction = {
  readonly type: typeof USER_LOGOUT_FAILED; 
}

export type TUserPasswordRequestAction = {
  readonly type: typeof USER_PASSWORD_REQUEST;  
}

export type TUserPasswordRequestSuccessAction = {
  readonly type: typeof USER_PASSWORD_REQUEST_SUCCESS;  
}

export type TUserPasswordRequestFailedAction = {
  readonly type: typeof USER_PASSWORD_REQUEST_FAILED; 
}

export type TUserPasswordResetAction = {
  readonly type: typeof USER_PASSWORD_RESET;  
}

export type TUserPasswordResetSuccessAction = {
  readonly type: typeof USER_PASSWORD_RESET_SUCCESS;  
}

export type TUserPasswordResetFailedAction = {
  readonly type: typeof USER_PASSWORD_RESET_FAILED; 
}

export type TUserGetUserDataAction = {
  readonly type: typeof USER_GET_USER_DATA;  
}

export type TUserGetUserDataSuccessAction = {
  readonly type: typeof USER_GET_USER_DATA_SUCCESS;
  readonly userName: string;
  readonly userEmail: string;
}

export type TUserGetUserDataFailedAction = {
  readonly type: typeof USER_GET_USER_DATA_FAILED; 
}

export type TUserUpdateUserDataAction = {
  readonly type: typeof USER_UPDATE_USER_DATA;  
}

export type TUserUpdateUserDataSuccessAction = {
  readonly type: typeof USER_UPDATE_USER_DATA_SUCCESS;
  readonly userName: string;
  readonly userEmail: string;
}

export type TUserUpdateUserDataFailedAction = {
  readonly type: typeof USER_UPDATE_USER_DATA_FAILED; 
}

export type TUserActions = 
  | TUserDataUpdateAction
  | TUserRollbackAction
  | TUserRollbackUpdateAction
  | TUserRegAction
  | TUserRegSuccessAction
  | TUserRegFailedAction
  | TUserLoginAction
  | TUserLoginSuccessAction
  | TUserLoginFailedAction
  | TUserLogoutAction
  | TUserLogoutSuccessAction
  | TUserLogoutFailedAction
  | TUserPasswordRequestAction
  | TUserPasswordRequestSuccessAction
  | TUserPasswordRequestFailedAction
  | TUserPasswordResetAction
  | TUserPasswordResetSuccessAction
  | TUserPasswordResetFailedAction
  | TUserGetUserDataAction
  | TUserGetUserDataSuccessAction
  | TUserGetUserDataFailedAction
  | TUserUpdateUserDataAction
  | TUserUpdateUserDataSuccessAction
  | TUserUpdateUserDataFailedAction;

export const registerUser = (userEmail: string, userPassword: string, userName: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_REG
    });
    postUserRegisterToApi(
      {
        "email": userEmail, 
        "password": userPassword,
        "name": userName
      }
    )
    .then(data => {
      setCookie('accessToken', data.accessToken);
      saveToLocalStorage('refreshToken', data.refreshToken);
      dispatch({
        type: USER_REG_SUCCESS
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: USER_REG_FAILED,
      });
    });
  };
};

export const loginUser = (userEmail: string, userPassword: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_LOGIN
    });
    postUserLoginToApi(
      {
        "email": userEmail, 
        "password": userPassword,
      }
    )
    .then(data => {
      console.log(data);
      setCookie('accessToken', data.accessToken);
      saveToLocalStorage('refreshToken', data.refreshToken);
      dispatch({
        type: USER_LOGIN_SUCCESS
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: USER_LOGIN_FAILED
      });
    });
  };
};

export const logoutUser = (refreshToken: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_LOGOUT
    });
    postUserLogoutToApi(
      {
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
  };
};

export const requestPasswordUser = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_PASSWORD_REQUEST
    });
    postUserRequestPasswordToApi(
      {
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
  };
};

export const resetPasswordUser = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_PASSWORD_RESET
    });
    postUserResetPasswordToApi(
      {
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
  };
};

export const requestDataUser = (accessToken: string) => {
  console.log('In requestDataUser: ' + accessToken);
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_GET_USER_DATA
    });
    getUserDataFromApi(
      {
        "accessToken": accessToken
      } 
    )
    .then(data => {
      dispatch({
        type: USER_GET_USER_DATA_SUCCESS,
        userName: data.user.name,
        userEmail: data.user.email
      });
    })
    .catch((error) => {
      if (error.message === 'jwt expired') {
        console.log('User request Failed: JWT EXPIRED');
        dispatch(
          refreshToken(
            requestDataUser(getCookie('accessToken'))
          )
        );
      } else {
        console.log('In requestDataUser: User Request Failed');
        dispatch({
          type: USER_LOGIN_FAILED,
        });
      }
    });
  };
};

const refreshToken = (afterRefresh: any) => (dispatch: AppDispatch) => {
  console.log('In refreshToken');
  postRefreshTokenToApi(          
    {
    "token": getFromLocalStorage('refreshToken')
  })
  .then((data) => {
    setCookie('accessToken', data.accessToken);
    saveToLocalStorage('refreshToken', data.refreshToken);
    dispatch(afterRefresh);
  })
  .catch((error) => {
    console.error('Token Refresh Failed: '+error.message);
  });
};

export const updateUserData = (userName: string, userEmail: string, accessToken: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_UPDATE_USER_DATA
    });
    patchUserDataToApi(
      {
        "name": userName,
        "email": userEmail
      },
      accessToken
    )
    .then(data => {
      dispatch({
        type: USER_UPDATE_USER_DATA_SUCCESS,
        userName: data.user.name,
        userEmail: data.user.email
      });
    })
    .catch((error: any) => {
      if (error.message === 'jwt expired') {
        console.log('User request Failed: JWT EXPIRED');
        dispatch(
          refreshToken(
            updateUserData(userName, userEmail, getCookie(accessToken))
          )
        );
      } else {
        console.log('In requestDataUser: User Request Failed');
        dispatch({
          type: USER_LOGIN_FAILED,
        });
      }
    });
  };
};