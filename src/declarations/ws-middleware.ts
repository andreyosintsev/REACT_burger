import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
 } from '../services/constants/ws-middleware';

export type TWSStoreActions = {
  wsInit:     typeof WS_CONNECTION_START,
  onOpen:     typeof WS_CONNECTION_SUCCESS,
  wsClose:    typeof WS_CONNECTION_CLOSE,
  onClosed:   typeof WS_CONNECTION_CLOSED,
  onError:    typeof WS_CONNECTION_ERROR,
  onMessage:  typeof WS_GET_MESSAGE
};

export type TWSOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  "number": number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type TWSMessage = {
  success: boolean;
  orders: TWSOrder[];
  total: number;
  totalToday: number;
}

export type TWSState = {
  wsConnected: boolean;
  wsMessage?: TWSMessage;
  wsError?: Event;
}

export type TWSStates = {
  wsFeed: TWSState;
  wsProfile: TWSState;
}

export enum TWSRole {'wsFeed', 'wsProfile'};
export const WS_ROLE_FEED = TWSRole.wsFeed;
export const WS_ROLE_PROFILE = TWSRole.wsProfile;