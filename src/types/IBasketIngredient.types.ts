import { IIngredient } from "./IIngredient.types";

export type IBasketIngredient = IIngredient & {
    id: string,
    recipeId: string | '__CUSTOM__',
    checked: boolean,
    markedAsDeleted: boolean,
};
  