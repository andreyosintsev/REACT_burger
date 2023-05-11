import React from 'react';

const checkFetchResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res
      .json()
      .then((err) => Promise.reject(err));
  }
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
      throw new Error(`Ingredient data fetch error: ${error}`);
  }
};

export const postBurgerIngredientsToApi = (api, payload) => {
  try {
    return fetch(`${api}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload)
    })
      .then(checkFetchResponse)
      .then((data) => {
          if (data.success) {
              return data.data;
          }
          return Promise.reject(data);
      });
  } catch (error) {
      throw new Error(`Ingredient data fetch error: ${error}`);
  }
};

export const BurgerConstructorContext = React.createContext();
export const BurgerIngredientsContext = React.createContext();
export const BurgerTotalContext = React.createContext(); 

export const testData = (data, count) => {
    let randomData = [];
    for (let i = 0; i < count; i++) {
        randomData.push(data[Math.trunc(Math.random()*data.length)]);
    }

    randomData.push(data.filter(item => item.type === 'bun')[0]);

    return randomData;
};