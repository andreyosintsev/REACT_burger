import { TRequestOptions, TRequestStringPayload, TRequestArrayPayload } from '../declarations/types';

export const NORMA_API = 'https://norma.nomoreparties.space/api';

const checkFetchResponse = (res: any): Promise<any> => {
  return res.ok 
    ? res.json()
    : Promise.reject(`Ошибка Fetch: ${res.status}`);
};

const checkSuccess = (data: any): Promise<any> => {
  return data && data.success 
  ? data
  : Promise.reject(`Ошибка Fetch не success: ${data}`);
};

const request = (endpoint: string, options?: TRequestOptions): Promise<any> => {
  return fetch(`${NORMA_API}${endpoint}`, options)
    .then(checkFetchResponse)
    .then(checkSuccess);
};

export const getIngredientsFromApi = (): (Promise<any> | void) => {
  try {  
    return request('/ingredients');
  } catch (error: any) {
    console.error(`Не удалось получить от API ингредиенты: ${error.message || 'неизвестная ошибка'}`);
    throw new Error(`Не удалось получить от API ингредиенты: ${error.message || 'неизвестная ошибка'}`);
  }
};

export const postConstructorDataToApi = (payload: TRequestArrayPayload): (Promise<any> | void) => {
  try {  
    return request('/orders',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error: any) {
    if (error.message) {
      console.error(`Не удалось отправить в API данные конструктора: ${error.message || 'неизвестная ошибка'}`);
      throw new Error(`Не удалось отправить в API данные конструктора: ${error.message || 'неизвестная ошибка'}`);
    }
  }
};

export const postUserRegisterToApi = (payload: TRequestStringPayload): Promise<any> => {
  try {  
    return request('/auth/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error: any) {
    console.error(`Не удалось отправить в API данные для регистрации пользователя: ${error.message || 'неизвестная ошибка'}`);
    throw new Error(`Не удалось отправить в API данные для регистрации пользователя: ${error.message || 'неизвестная ошибка'}`);
  }
};

export const postUserLoginToApi = (payload: TRequestStringPayload): Promise<any> => {
  try {  
    return request('/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error: any) {
    console.error(`Не удалось отправить в API данные для входа пользователя: ${error.message || 'неизвестная ошибка'}`);
    throw new Error(`Не удалось отправить в API данные для входа пользователя: ${error.message || 'неизвестная ошибка'}`);
  }
};

export const postUserLogoutToApi = (payload: TRequestStringPayload): Promise<any> => {
  try {  
    return request('/auth/logout',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error: any) {
    console.error(`Не удалось отправить данные в API для выхода пользователя: ${error.message || 'неизвестная ошибка'}`);
    throw new Error(`Не удалось отправить данные в API для выхода пользователя: ${error.message || 'неизвестная ошибка'}`);
  }
};

export const postUserRequestPasswordToApi = (payload: TRequestStringPayload): Promise<any> => {
  try {  
    return request('/password-reset',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error: any) {
    console.error(`Не удалось отправить данные в API для запроса сброса пароля: ${error.message || 'неизвестная ошибка'}`);
    throw new Error(`Не удалось отправить данные в API для запроса сброса пароля: ${error.message || 'неизвестная ошибка'}`);
  }
};

export const postUserResetPasswordToApi = (payload: TRequestStringPayload): Promise<any> => {
  try {  
    return request('/password-reset/reset',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error: any) {
    console.error(`Не удалось отправить данные в API для выполнения сброса пароля: ${error.message || 'неизвестная ошибка'}`);
    throw new Error(`Не удалось отправить данные в API для выполнения сброса пароля: ${error.message || 'неизвестная ошибка'}`);
  }
};

export const postUserRefreshTokenToApi = (payload: TRequestStringPayload): Promise<any> => {
  try {  
    return request('/auth/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error: any) {
    console.error(`Не удалось отправить данные в API для обновление Access Token: ${error.message || 'неизвестная ошибка'}`);
    throw new Error(`Не удалось отправить данные в API для запроса Access Token: ${error.message || 'неизвестная ошибка'}`);
  }
};

export const getUserDataFromApi = (payload: TRequestStringPayload): Promise<any> => {
  try {  
    return request('/auth/user',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': payload.accessToken
        }
      });
  } catch (error: any) {
    console.error(`Не удалось отправить данные в API для получения данных пользователя: ${error.message || 'неизвестная ошибка'}`);
    throw new Error(`Не удалось отправить данные в API для получения данных пользователя: ${error.message || 'неизвестная ошибка'}`);
  }
};

export const patchUserDataToApi = (payload: TRequestStringPayload, accessToken: string): Promise<any> => {
  try {  
    return request('/auth/user',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': accessToken
        },
        body: JSON.stringify(payload)
      });
  } catch (error: any) {
    console.error(`Не удалось отправить данные в API для обновления данных пользователя: ${error.message || 'неизвестная ошибка'}`);
    throw new Error(`Не удалось отправить данные в API для обновления данных пользователя: ${error.message || 'неизвестная ошибка'}`);
  }
};

export const postRefreshTokenToApi = (payload: TRequestStringPayload): Promise<any> => {
  try {
    return request('/auth/token', 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(payload)
    });
  } catch (error: any) {
    console.error(`Не удалось отправить данные в API для обновления токена: ${error.message || 'неизвестная ошибка'}`);
    throw new Error(`Не удалось отправить данные в API для обновления токена: ${error.message || 'неизвестная ошибка'}`);
  }
};