export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredients = Array<TIngredient>;

export type TConstructorIngredient = {
  ingredient: TIngredient;
  uuid: string;
};

export type TConstructorIngredients = Array<TConstructorIngredient>;

export type TBurgerItemType = {
  type: 'top' | 'bottom' | undefined;
}

export type TBurgerItem = {
  uuid: string;
  image: string;
  price: number;
  title: string;
  isLocked: boolean;
  type?: "top" | "bottom" | undefined;
  removeHandler: (type: 'top' | 'bottom' | undefined, uuid: string) => void;
}
