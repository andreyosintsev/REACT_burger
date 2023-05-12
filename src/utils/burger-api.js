import React from 'react';

const checkFetchResponse = (res) => {
  return res.ok 
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
};

export const getDataFromApi = (api, method, payload) => {
  let request = { info: '', init: '' };
  
  switch (method) {
    case 'get':   request.info = `${api}/ingredients`;
                  request.init = {
                    method: 'GET',
                  };
                  break;
    case 'post':  request.info = `${api}/orders`;
                  request.init = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(payload)
                  };
                  break;
    default:  throw new Error('Не указана операция get/post');
  }  
  
  try {  
    return fetch(request.info, request.init)
      .then(checkFetchResponse)
      .then((data) => {
          if (data.success) {
              return method === 'get' ? data.data : data.order;
          }
          return Promise.reject(data);
      });
  } catch (error) {
    console.error((`Не удалось получить данные от API: ${error.message}`));
    throw new Error(`Не удалось получить данные от API: ${error.message}`);
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