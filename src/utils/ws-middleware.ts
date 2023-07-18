import type { Middleware, MiddlewareAPI } from 'redux';

import type { TApplicationActions, RootState, AppDispatch } from '../declarations/types';

import { TWSStoreActions } from '../declarations/ws-middleware';

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, wsClose, onClosed, onError, onMessage } = wsActions;


      if (type === wsInit) {
        console.log('WS START: Открытие соединения');
        console.log(`WS START: ${action.url}`);
        socket = (!socket || socket.readyState !== 1) 
          ? new WebSocket(action.url) : socket; 
        if (socket) {
          console.log ('WS START: Соединение открыто');
        } else {
          console.error (`WS START: Не удалось открыть соединение, URL: ${action.url}`);
        }
      }

      if (type === wsClose) {
        if (socket) {
          console.log('WS CLOSE: Соединение закрывается клиентом');
          socket.close(1000, 'Feed connection closed');
          dispatch({ 
            type: onClosed
          });
        }
      }

      if (socket && socket.readyState !== 1) {

        socket.onopen = event => {
          console.log('WS OPEN: Соединение  установлено');
          dispatch({
            type: onOpen
          });
        };

        socket.onerror = event => {
          console.error('WS ERROR: Ошибка соединения');
          dispatch({
            type: onError,
            payload: event
          });
        };

        socket.onmessage = event => {
          console.log('WS MESSAGE: Получено сообщение от сервера');
          const { data } = event;
          console.log(JSON.parse(data));
          dispatch({
            type: onMessage,
            payload: JSON.parse(data),
          });
        };
        
        socket.onclose = event => {
          console.log('WS CLOSED: Соединение закрыто');
          console.log('WS CLOSED: Код закрытия ' + event.code);
          dispatch({
            type: onClosed
          });
        };
      }

      next(action);
    };
    }) as Middleware;
}; 