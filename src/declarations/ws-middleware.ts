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