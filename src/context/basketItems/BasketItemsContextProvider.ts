import { createContext } from "react";
import { IRecipe } from "../../types";

export const BasketItemContext = createContext<{
  basketItems: (IRecipe)[];
  addBasketItem: (basketItem: IRecipe) => void;
}>(null);
