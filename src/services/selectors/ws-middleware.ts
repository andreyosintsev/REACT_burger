import { RootState } from '../../declarations/types';

export const wsOrders = (store: RootState) => store.ws.wsMessage?.orders;