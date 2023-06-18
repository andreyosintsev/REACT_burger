export const NORMA_API = 'https://norma.nomoreparties.space/api';

const checkFetchResponse = (res) => {
  return res.ok 
    ? res.json()
    : Promise.reject(`Ошибка Fetch: ${res.status}`);
};

const checkSuccess = (data) => {
  return data && data.success 
  ? data
  : Promise.reject(`Ошибка Fetch не success: ${data}`);
};

const request = (endpoint, options) => {
  return fetch(`${NORMA_API}${endpoint}`, options)
    .then(checkFetchResponse)
    .then(checkSuccess);
};

export const getIngredientsFromApi = () => {
  try {  
    return request('/ingredients');
  } catch (error) {
    console.error((`Не удалось получить от API ингредиенты: ${error.message}`));
    throw new Error(`Не удалось получить от API ингредиенты: ${error.message}`);
  }
};

export const postConstructorDataToApi = (payload) => {
  try {  
    return request('/orders',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error) {
    console.error((`Не удалось отправить в API данные конструктора: ${error.message}`));
    throw new Error(`Не удалось отправить в API данные конструктора: ${error.message}`);
  }
};

export const postUserRegisterToApi = (payload) => {
  try {  
    return request('/auth/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error) {
    console.error((`Не удалось отправить в API данные для регистрации пользователя: ${error.message}`));
    throw new Error(`Не удалось отправить в API данные для регистрации пользователя: ${error.message}`);
  }
};

export const postUserLoginToApi = ( payload) => {
  try {  
    return request('/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error) {
    console.error((`Не удалось отправить в API данные для входа пользователя: ${error.message}`));
    throw new Error(`Не удалось отправить в API данные для входа пользователя: ${error.message}`);
  }
};

export const postUserLogoutToApi = (payload) => {
  try {  
    return request('/auth/logout',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для выхода пользователя: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для выхода пользователя: ${error.message}`);
  }
};

export const postUserRequestPasswordToApi = (payload) => {
  try {  
    return request('/password-reset',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для запроса сброса пароля: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для запроса сброса пароля: ${error.message}`);
  }
};

export const postUserResetPasswordToApi = (payload) => {
  try {  
    return request('/password-reset/reset',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для выполнения сброса пароля: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для выполнения сброса пароля: ${error.message}`);
  }
};

export const postUserRefreshTokenToApi = (payload) => {
  try {  
    return request('/auth/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(payload)
      });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для обновление Access Token: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для запроса Access Token: ${error.message}`);
  }
};

export const getUserDataFromApi = (payload) => {
  try {  
    return request('/auth/user',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': payload.accessToken
        }
      });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для получения данных пользователя: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для получения данных пользователя: ${error.message}`);
  }
};

export const patchUserDataToApi = (payload, accessToken) => {
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
  } catch (error) {
    console.error((`Не удалось отправить данные в API для обновления данных пользователя: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для обновления данных пользователя: ${error.message}`);
  }
};

export const postRefreshTokenToApi = (payload) => {
  try {
    return request('/auth/token', 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для обновления токена: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для обновления токена: ${error.message}`);
  }
 };