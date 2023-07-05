import { TIngredient, TIngredients } from "../declarations/types";

function saveToLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}
function getFromLocalStorage(key: string): string {
  return localStorage.getItem(key) || "";
}

function deleteFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

function saveBurgerToLocalStorage(constructorList: TIngredients, bun: TIngredient): void {
  localStorage.setItem('constructorList', JSON.stringify(constructorList));
  localStorage.setItem('bun', JSON.stringify(bun));  
}

function clearBurgerLocalStorage(): void {
  localStorage.removeItem('constructorList');
  localStorage.removeItem('bun');
}

type TConstructorList = {
  constructorList: TIngredients,
  bun: TIngredient | null
}

function loadBurgerFromLocalStorage(): TConstructorList {
  
  let parsedConstructorList: TIngredients = [];
  let parsedBun: TIngredient | null = null;

  const constructorList: string = getFromLocalStorage('constructorList');
  if (constructorList.length > 0) {
    parsedConstructorList = JSON.parse(constructorList);
  }

  const bun = getFromLocalStorage('bun');
  if (bun.length > 0) {
    parsedBun = JSON.parse(bun);
  }

  return {
    constructorList: parsedConstructorList,
    bun: parsedBun
  }
}

export {  saveToLocalStorage, 
          getFromLocalStorage,
          deleteFromLocalStorage,
          saveBurgerToLocalStorage,
          loadBurgerFromLocalStorage,
          clearBurgerLocalStorage }