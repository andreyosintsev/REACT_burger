import React from 'react';

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
    console.error((`Не удалось получить ингредиенты от API: ${error.message}`));
    throw new Error(`Не удалось получить ингредиенты от API: ${error.message}`);
  }
};

export const postConstructorDataToApi = (api, payload) => {
  try {  
    return fetch(
      `${api}/orders`,
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
    console.error((`Не удалось отправить данные конструктора в API: ${error.message}`));
    throw new Error(`Не удалось отправить данные конструктора в API: ${error.message}`);
  }
};

export const testData = (data, count) => {
  let randomData = [];
  for (let i = 0; i < count; i++) {
      randomData.push(data[Math.trunc(Math.random()*data.length)]);
  }

  randomData.push(data[data.findIndex(el => el.name === 'Соус Spicy-X')]);
  randomData.push(data.filter(item => item.type === 'bun')[0]);

  return randomData;
};

export const BurgerConstructorContext = React.createContext();
export const BurgerIngredientsContext = React.createContext();
export const BurgerTotalContext = React.createContext();