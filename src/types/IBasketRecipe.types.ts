import { IBasketIngredient } from "./IBasketIngredient.types";
import { IRecipe } from "./IRecipe.types";

export type IBasketRecipe = {
    title: string,
    image: string,
    ingredients: IBasketIngredient[],
    description: string,
    instructions: string[],
    id: string,
    index: number,
}