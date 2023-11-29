import { IBaskitIngredient, IIngredient } from "../types";
import "react-native-get-random-values";
import { v4 } from "uuid";

export const ToDBIngredient = (data: IIngredient, recipeID: string): any => {
  return {
    id: v4(),
    name: data.name,
    unit: data.unit,
    count: data.count,
    recipeId: recipeID,
    checked: false,
    markedAsDeleted: false,
  };
};