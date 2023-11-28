import { IBaskitIngredient } from "./IBaskitIngredient.types";

export type IBaskitRecipe = {
    title: string,
    image: string,
    ingredients: IBaskitIngredient[],
    description: string,
    instructions: string[],
    id: string,
    index: number,
}