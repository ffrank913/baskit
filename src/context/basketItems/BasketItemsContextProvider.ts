import { createContext } from "react";
import { IBasketIngredient, IIngredient, IRecipe } from "../../types";
import { IBasketRecipe } from "../../types/IBasketRecipe.types";

export const BasketItemContext = createContext<{
  basketRecipes: IRecipe[];
  basketIngredients: { [key: string]: IBasketIngredient[]};
  addRecipe: (recipe: IRecipe) => void;
  addIngredient: (ingredient: IIngredient) => void;
  modifyIngredient: (overwriteIngredient: IBasketIngredient) => void,
  removeRecipe: (recipe: IBasketRecipe) => void;
  removeIngredient: (recipe: IBasketIngredient) => void;
}>({
  basketRecipes: [],
  basketIngredients: {},
  addRecipe: () => {},
  addIngredient: () => {},
  modifyIngredient: () => {},
  removeRecipe: () => {},
  removeIngredient: () => {},
});
