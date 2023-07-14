import { RootState } from '../../declarations/types';

export const wsFeedOrders = (store: RootState) => store.ws.wsFeed.wsMessage?.orders;
export const wsFeedMessage = (store: RootState) => store.ws.wsFeed.wsMessage;
export const wsFeedConnected = (store: RootState) => store.ws.wsFeed.wsConnected;

export const wsProfileOrders = (store: RootState) => store.ws.wsProfile.wsMessage?.orders;
export const wsProfileMessage = (store: RootState) => store.ws.wsProfile.wsMessage;
export const wsProfileConnected = (store: RootState) => store.ws.wsProfile.wsConnected;