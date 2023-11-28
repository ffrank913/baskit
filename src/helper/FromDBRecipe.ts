import { IBaskitRecipe } from "../types";

export const FromDBRecipe = (data: any): IBaskitRecipe => {
  return {
    id: data.id,
    title: data.title,
    image: data.image,
    description: data.description,
    ingredients: JSON.parse(data.ingredients),
    instructions: JSON.parse(data.instructions),
  };
};
