import { IBaskitIngredient } from "../types";

export const FromDBIngredient = (data: any): IBaskitIngredient => {
  return {
    id: data.id,
    name: data.name,
    unit: data.unit,
    count: data.count,
    recipeId: data.recipeId,
    checked: data.checked === 0 ? false : true,
    markedAsDeleted: data.markedAsDeleted === 0 ? false : true,
  };
};