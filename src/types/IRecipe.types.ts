import { IIngredient } from "./IIngredient.types";

export type IRecipe = {
    id: string,
    title: string,
    image: string,
    ingredients: IIngredient[],
    description: string,
    instructions: string[],
  }