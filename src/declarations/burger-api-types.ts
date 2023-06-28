import { TIngredients } from './types';

export type TApiResult = {
  success: boolean;
}

export type TApiIngredients = {
  data: TIngredients
} & TApiResult;

export type TApiMessage = {
  message: string;  
} & TApiResult;

export type TApiUserData = {
  user: {
    email: string;
    name: string;
  };
} & TApiResult;

export type TApiTokens = {
  accessToken: string;
  refreshToken: string;   
} & TApiResult;

export type TApiUserRegister = TApiResult & TApiUserData & TApiTokens;

export type TOrderData = {
  name: string;
  order: {
    number: number;
  };
} & TApiResult

export type TRequestOptions = {
  method: "GET" | "POST" | "PATCH";
  headers: {};
  body?: string;
};

export type TRequestStringPayload = {
  [key: string]: string;
};

export type TRequestArrayPayload = {
  ingredients: string[];
};