import { IIngredient } from "../RecipesLib";

export const AssembleIngredient = (ingredient: IIngredient): string => {
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
