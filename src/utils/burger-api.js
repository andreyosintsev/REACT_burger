const checkFetchResponse = (res) => {
  return res.ok 
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
};

export const getIngredientsFromApi = (api) => {
  try {  
    return fetch(`${api}/ingredients`)
      .then(checkFetchResponse)
      .then((data) => {
          if (data.success) {
              return data.data;
          }
          return Promise.reject(data);
      });
  } catch (error) {
    console.error((`Не удалось получить от API ингредиенты: ${error.message}`));
    throw new Error(`Не удалось получить от API ингредиенты: ${error.message}`);
  }
};

export const postConstructorDataToApi = (api, payload) => {
  try {  
    return fetch(
      `${api}/orders/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload)
      })
      .then(checkFetchResponse)
      .then((data) => {
          if (data.success) {
              return data.order;
          }
          return Promise.reject(data);
      });
  } catch (error) {
    console.error((`Не удалось отправить в API данные конструктора: ${error.message}`));
    throw new Error(`Не удалось отправить в API данные конструктора: ${error.message}`);
  }
};

export const postUserRegisterToApi = (api, payload) => {
  try {  
    return fetch(
      `${api}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload)
      })
      .then(checkFetchResponse)
      .then((data) => {
          console.log(data);
          if (data.success) {
              return data;
          }
          return Promise.reject(data);
      });
  } catch (error) {
    console.error((`Не удалось отправить в API данные для регистрации пользователя: ${error.message}`));
    throw new Error(`Не удалось отправить в API данные для регистрации пользователя: ${error.message}`);
  }
};

export const postUserLoginToApi = (api, payload) => {
  try {  
    return fetch(
      `${api}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload)
      })
      .then(checkFetchResponse)
      .then((data) => {
          console.log(data);
          if (data.success) {
              return data;
          }
          return Promise.reject(data);
      });
  } catch (error) {
    console.error((`Не удалось отправить в API данные для входа пользователя: ${error.message}`));
    throw new Error(`Не удалось отправить в API данные для входа пользователя: ${error.message}`);
  }
};

export const postUserLogoutToApi = (api, payload) => {
  try {  
    return fetch(
      `${api}/auth/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload)
      })
      .then(checkFetchResponse)
      .then((data) => {
          if (data.success) {
              return data;
          }
          return Promise.reject(data);
      });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для выхода пользователя: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для выхода пользователя: ${error.message}`);
  }
};

export const postUserRequestPasswordToApi = (api, payload) => {
  try {  
    return fetch(
      `${api}/password-reset`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload)
      })
      .then(checkFetchResponse)
      .then((data) => {
          if (data.success) {
              return data;
          }
          return Promise.reject(data);
      });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для запроса сброса пароля: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для запроса сброса пароля: ${error.message}`);
  }
};

export const postUserResetPasswordToApi = (api, payload) => {
  try {  
    return fetch(
      `${api}/password-reset/reset`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload)
      })
      .then(checkFetchResponse)
      .then((data) => {
          if (data.success) {
              return data;
          }
          return Promise.reject(data);
      });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для запроса сброса пароля: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для запроса сброса пароля: ${error.message}`);
  }
};

export const postUserRefreshTokenToApi = (api, payload) => {
  try {  
    return fetch(
      `${api}/auth/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload)
      })
      .then(checkFetchResponse)
      .then((data) => {
          if (data.success) {
              return data;
          }
          return Promise.reject(data);
      });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для обновление Access Token: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для запроса Access Token: ${error.message}`);
  }
};

export const getUserGetDataFromApi = (api, payload) => {
  try {  
    return fetch(
      `${api}/auth/user`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': payload.accessToken
        }
      })
      .then(checkFetchResponse)
      .then((data) => {
          if (data.success) {
              return data;
          }
          return Promise.reject(data);
      });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для получения данных пользователя: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для получения данных пользователя: ${error.message}`);
  }
};

export const getUserDataFromApi = (api, payload) => {
  try {  
    return fetch(
      `${api}/auth/user`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': payload.accessToken
        }
      })
      .then(checkFetchResponse)
      .then((data) => {
          if (data.success) {
              return data;
          }
          return Promise.reject(data);
      });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для получения данных пользователя: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для получения данных пользователя: ${error.message}`);
  }
};

export const patchUserDataToApi = (api, payload, accessToken) => {
  try {  
    return fetch(
      `${api}/auth/user`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': accessToken
        },
        body: JSON.stringify(payload)
      })
      .then(checkFetchResponse)
      .then((data) => {
          console.log('data: ', data);
          if (data.success) {
              return data;
          }
          return Promise.reject(data);
      });
  } catch (error) {
    console.error((`Не удалось отправить данные в API для обновления данных пользователя: ${error.message}`));
    throw new Error(`Не удалось отправить данные в API для обновления данных пользователя: ${error.message}`);
  }
};