import { RootState } from '../../declarations/types';

export const wsProfileOrders = (store: RootState) => store.wsProfile.wsMessage?.orders;
export const wsProfileMessage = (store: RootState) => store.wsProfile.wsMessage;
export const wsProfileConnected = (store: RootState) => store.wsProfile.wsConnected;