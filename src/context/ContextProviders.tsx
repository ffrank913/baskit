import { createContext } from "react";
import { IIngredient } from "../RecipesLib";

export const BasketItemContext = createContext<{basketItems: IIngredient[], setBasketItems: (basketItems: IIngredient[]) => void}>(null);