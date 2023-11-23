import { IRecipe } from "./types";

import acaibowl from "../assets/content/recipes/acaibowl.json";
import burritos from "../assets/content/recipes/burritos.json";
import butterchicken from "../assets/content/recipes/butterchicken.json";
import fetapasta from "../assets/content/recipes/fetapasta.json";
import fishburger from "../assets/content/recipes/fishburger.json";
import mangochicken from "../assets/content/recipes/mangochicken.json";
import nudelsalat from "../assets/content/recipes/nudelsalat.json";
import padthai from "../assets/content/recipes/padthai.json";
import pizzaauflauf from "../assets/content/recipes/pizzaauflauf.json";
import pizzasoup from "../assets/content/recipes/pizzasoup.json";
import pumpkinsoup from "../assets/content/recipes/pumpkinsoup.json";
import quiche from "../assets/content/recipes/quiche.json";
import shakshuka from "../assets/content/recipes/shakshuka.json";
import thaicurry from "../assets/content/recipes/thaicurry.json";

export const RecipesLib = {
  acaibowl: acaibowl,
  burritos: burritos,
  butterchicken: butterchicken,
  fetapasta: fetapasta,
  fishburger: fishburger,
  mangochicken: mangochicken,
  nudelsalat: nudelsalat,
  padthai: padthai,
  pizzaauflauf: pizzaauflauf,
  pizzasoup: pizzasoup,
  pumpkinsoup: pumpkinsoup,
  quiche: quiche,
  shakshuka: shakshuka,
  thaicurry: thaicurry,
} as { [key: string]: IRecipe };
