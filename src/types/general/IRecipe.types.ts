import { IIngredient } from "./IIngredient.types";

export type IRecipe = {
  title: string,
  image: string,
  ingredients: IIngredient[],
  description: string,
  instructions: string[],
}