import { IRecipe } from "../types";
import "react-native-get-random-values";
import { v4 } from "uuid";

export const ToDBRecipe = (data: IRecipe): any => {
  return {
    id: v4(),
    title: data.title,
    image: data.image,
    description: data.description,
    ingredients: JSON.stringify(data.ingredients),
    instructions: JSON.stringify(data.instructions),
  };
};
