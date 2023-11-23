import { IIngredient } from "./IIngredient.types";

export type IBasketIngredient = IIngredient & { index: number; checked: boolean };