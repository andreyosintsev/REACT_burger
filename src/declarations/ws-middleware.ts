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