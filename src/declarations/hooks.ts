import { 
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook
 } from "react-redux";  

 import type {
  RootState, AppDispatch
 } from '../declarations/types';

 export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
 export const useDispatch = () => dispatchHook<AppDispatch>();
