import type { Middleware, MiddlewareAPI } from 'redux';

import type { TApplicationActions, RootState, AppDispatch, AppThunkAction } from '../declarations/types';

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
 
      if (type === 'WS_CONNECTION_START') {
        socket = new WebSocket(wsUrl);
      }

      if (type === 'WS_CONNECTION_CLOSE' && socket) {
        console.log('WS CLOSE: Соединение закрыто клиентом');
        socket.close(1000, 'Client closed connection');
        dispatch({ 
          type: 'WS_CONNECTION_CLOSED'
        });
      }

      //TODO: Переписать так, чтобы если соединение уже установлено (см. redux)
      //не создавать снова эти слушатели
      if (socket) {

        socket.onopen = event => {
          console.log('WS OPEN: Соединение установлено');
          dispatch({
            type: 'WS_CONNECTION_SUCCESS'
          });
        };

        socket.onerror = event => {
          console.error('WS ERROR: Ошибка соединения');
          dispatch({
            type: 'WS_CONNECTION_ERROR',
            payload: event
          });
        };

        socket.onmessage = event => {
          console.log('WS MESSAGE: Получено сообщение от сервера');
          const { data } = event;
          dispatch({
            type: 'WS_GET_MESSAGE',
            payload: JSON.parse(data)
          });
        };
        
        socket.onclose = event => {
          console.log('WS CLOSED: Соединение закрыто');
          console.log('WS CLOSED: Код закрытия ' + event.code);
          dispatch({
            type: 'WS_CONNECTION_CLOSED'
          });
        };
      }

      next(action);
    };
    }) as Middleware;
}; 