import type { Middleware, MiddlewareAPI } from 'redux';

import { getCookie } from './cookie';

import type { TApplicationActions, RootState, AppDispatch } from '../declarations/types';

export const FEED_API = 'wss://norma.nomoreparties.space/orders/all';
export const PROFILE_API = 'wss://norma.nomoreparties.space/orders';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socketFeed: WebSocket | null = null;
      let socketProfile: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch } = store;

      if (action.type === 'WS_CONNECTION_START') {
        switch (action.role) {
          case 'wsFeed': {
            console.log('WS FEED START: Открытие соединения для ленты');
            socketFeed = (!socketFeed || socketFeed.readyState !== 1) ? new WebSocket(FEED_API) : socketFeed; 
            if (socketFeed) {
              console.log ('WS FEED START: Соединение для ленты открыто');
            }
            break;
          }
          case 'wsProfile': {
            console.log('WS PROFILE START: Открытие соединения для профиля');
            let accessToken = getCookie('accessToken');
            if (accessToken.indexOf('Bearer') === 0) {
              accessToken = accessToken.split('Bearer ')[1];
            }
            console.log('accessToken: ' + accessToken);
            socketProfile = (!socketProfile || socketProfile.readyState !== 1) ? new WebSocket(`${PROFILE_API}?token=${accessToken}`) : socketProfile;
            if (socketProfile) {
              console.log ('WS PROFILE START: Соединение для профиля открыто');
              console.log('readyState: '+socketProfile.readyState);
            }
          }
        }
      }

      if (action.type === 'WS_CONNECTION_CLOSE') {
        switch (action.role) {
          case 'wsFeed': {
            if (socketFeed) {
              console.log('WS FEED CLOSE: Соединение для ленты заказов закрывается клиентом');
              socketFeed.close(1000, 'Feed connection closed by client');
              dispatch({ 
                type: 'WS_CONNECTION_CLOSED',
                role: 'wsFeed'
              });
            }
            break;
          }
          case 'wsProfile': {
            if (socketProfile) {
              console.log('WS PROFILE CLOSE: Соединение для профиля закрывается клиентом');
              socketProfile.close(1000, 'Profile connection closed by client');
              dispatch({ 
                type: 'WS_CONNECTION_CLOSED',
                role: 'wsProfile'
              });
            }
            break;       
          }
        }
      }

      if (socketFeed && socketFeed.readyState !== 1) {

        socketFeed.onopen = event => {
          console.log('WS FEED OPEN: Соединение для ленты установлено');
          dispatch({
            type: 'WS_CONNECTION_SUCCESS',
            role: 'wsFeed'
          });
        };

        socketFeed.onerror = event => {
          console.error('WS FEED ERROR: Ошибка соединения для ленты');
          dispatch({
            type: 'WS_CONNECTION_ERROR',
            payload: event,
            role: 'wsFeed'
          });
        };

        socketFeed.onmessage = event => {
          console.log('WS FEED MESSAGE: Получено сообщение от сервера для ленты');
          const { data } = event;
          dispatch({
            type: 'WS_GET_MESSAGE',
            payload: JSON.parse(data),
            role: 'wsFeed'
          });
        };
        
        socketFeed.onclose = event => {
          console.log('WS FEED CLOSED: Соединение для ленты закрыто');
          console.log('WS FEED CLOSED: Код закрытия для ленты ' + event.code);
          dispatch({
            type: 'WS_CONNECTION_CLOSED',
            role: 'wsFeed'
          });
        };
      }

      if (socketProfile && socketProfile.readyState !== 1) {

        socketProfile.onopen = event => {
          console.log('WS PROFILE OPEN: Соединение для профиля установлено');
          dispatch({
            type: 'WS_CONNECTION_SUCCESS',
            role: 'wsProfile'
          });
        };

        socketProfile.onerror = event => {
          console.error('WS PROFILE ERROR: Ошибка соединения для профиля');
          dispatch({
            type: 'WS_CONNECTION_ERROR',
            payload: event,
            role: 'wsProfile'
          });
        };

        socketProfile.onmessage = event => {
          console.log('WS PROFILE MESSAGE: Получено сообщение от сервера для профиля');
          const { data } = event;
          const parsedData = JSON.parse(data);
          console.log(parsedData);
          dispatch({
            type: 'WS_GET_MESSAGE',
            payload: JSON.parse(data),
            role: 'wsProfile'
          });
        };
        
        socketProfile.onclose = event => {
          console.log('WS PROFILE CLOSED: Соединение для профиля закрыто');
          console.log('WS PROFILE CLOSED: Код закрытия для профиля ' + event.code);
          dispatch({
            type: 'WS_CONNECTION_CLOSED',
            role: 'wsProfile'
          });
        };
      }

      next(action);
    };
    }) as Middleware;
}; 