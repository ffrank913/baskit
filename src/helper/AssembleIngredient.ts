import { IBasketIngredient, IIngredient } from "../types";

export const AssembleIngredient = (ingredient: IIngredient | IBasketIngredient): string => {
  let text: string = ingredient.name;
  if (ingredient.count) {
    if (!ingredient.unit) {
      text = ingredient.count + " " + ingredient.name;
    } else {
      text = ingredient.count + " " + ingredient.unit + " " + ingredient.name;
    }
  }
  return text;
};
