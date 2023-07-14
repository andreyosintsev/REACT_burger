import type { Middleware, MiddlewareAPI } from 'redux';

import { getCookie } from './cookie';
import { refreshToken } from '../services/actions/user';

import type { TApplicationActions, RootState, AppDispatch, AppThunkAction } from '../declarations/types';

export const socketMiddleware = (wsUrlFeed: string, wsUrlProfile: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socketFeed: WebSocket | null = null;
      let socketProfile: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
 
      if (type === 'WS_FEED_CONNECTION_START') {
        socketFeed = new WebSocket(wsUrlFeed);
      }

      if (type === 'WS_PROFILE_CONNECTION_START') {
        let accessToken = getCookie('accessToken')
        if (accessToken.indexOf('Bearer') === 0) {
          accessToken = accessToken.split('Bearer ')[1];
        }

        console.log('accessToken: ' + accessToken);
        socketProfile = new WebSocket(`${wsUrlProfile}?token=${accessToken}`);
      }

      if (type === 'WS_FEED_CONNECTION_CLOSE' && socketFeed) {
        console.log('WS FEED CLOSE: Соединение для ленты заказов закрыто клиентом');
        socketFeed.close(1000, 'Feed connection closed by client');
        dispatch({ 
          type: 'WS_FEED_CONNECTION_CLOSED'
        });
      }

      if (type === 'WS_PROFILE_CONNECTION_CLOSE' && socketFeed) {
        console.log('WS PROFILE CLOSE: Соединение для истории заказов закрыто клиентом');
        socketFeed.close(1000, 'Profile connection closed by client');
        dispatch({ 
          type: 'WS_PROFILE_CONNECTION_CLOSED'
        });
      }

      if (socketFeed && socketFeed.readyState !== 1) {

        socketFeed.onopen = event => {
          console.log('WS FEED OPEN: Соединение установлено');
          dispatch({
            type: 'WS_FEED_CONNECTION_SUCCESS'
          });
        };

        socketFeed.onerror = event => {
          console.error('WS FEED ERROR: Ошибка соединения');
          dispatch({
            type: 'WS_FEED_CONNECTION_ERROR',
            payload: event
          });
        };

        socketFeed.onmessage = event => {
          console.log('WS FEED MESSAGE: Получено сообщение от сервера');
          const { data } = event;
          dispatch({
            type: 'WS_FEED_GET_MESSAGE',
            payload: JSON.parse(data)
          });
        };
        
        socketFeed.onclose = event => {
          console.log('WS FEED CLOSED: Соединение закрыто');
          console.log('WS FEED CLOSED: Код закрытия ' + event.code);
          dispatch({
            type: 'WS_FEED_CONNECTION_CLOSED'
          });
        };
      }

      if (socketProfile && socketProfile.readyState !== 1) {

        socketProfile.onopen = event => {
          console.log('WS PROFILE OPEN: Соединение установлено');
          dispatch({
            type: 'WS_PROFILE_CONNECTION_SUCCESS'
          });
        };

        socketProfile.onerror = event => {
          console.error('WS PROFILE ERROR: Ошибка соединения');
          dispatch({
            type: 'WS_PROFILE_CONNECTION_ERROR',
            payload: event
          });
        };

        socketProfile.onmessage = event => {
          console.log('WS PROFILE MESSAGE: Получено сообщение от сервера');
          const { data } = event;
          const parsedData = JSON.parse(data);
          console.log(parsedData);
          if (parsedData.message && parsedData.message === 'Invalid or missing token') {
            dispatch(
              refreshToken(
                dispatch({
                type: 'WS_PROFILE_CONNECTION_START'
              }))
            )
          }
          dispatch({
            type: 'WS_PROFILE_GET_MESSAGE',
            payload: JSON.parse(data)
          });
        };
        
        socketProfile.onclose = event => {
          console.log('WS PROFILE CLOSED: Соединение закрыто');
          console.log('WS PROFILE CLOSED: Код закрытия ' + event.code);
          dispatch({
            type: 'WS_PROFILE_CONNECTION_CLOSED'
          });
        };
      }

      next(action);
    };
    }) as Middleware;
}; 