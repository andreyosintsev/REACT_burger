import { RootState } from '../../declarations/types';

export const wsFeedOrders = (store: RootState) => store.wsFeed.wsMessage?.orders;
export const wsFeedMessage = (store: RootState) => store.wsFeed.wsMessage;
export const wsFeedConnected = (store: RootState) => store.wsFeed.wsConnected;