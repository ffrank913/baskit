import { IIngredient } from "../general/IIngredient.types";

export type IBaskitIngredient = IIngredient & {
    id: string,
    recipeId: string | '__CUSTOM__',
    checked: boolean,
    markedAsDeleted: boolean,
};
  