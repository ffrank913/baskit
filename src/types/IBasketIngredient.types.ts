import { IIngredient } from "./IIngredient.types";

export type IBasketIngredient = IIngredient & {
    recipeId: string | '__CUSTOM__',
    checked: boolean,
    markedAsDeleted: boolean,
};
  