import { RootState } from '../../declarations/types';

export const wsOrders = (store: RootState) => store.ws.wsMessage?.orders;
export const wsMessage = (store: RootState) => store.ws.wsMessage;
export const wsConnected = (store: RootState) => store.ws.wsConnected;