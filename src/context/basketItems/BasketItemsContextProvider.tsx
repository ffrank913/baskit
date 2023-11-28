import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { IBasketIngredient, IIngredient, IRecipe } from "../../types";
import { IBasketRecipe } from "../../types/IBasketRecipe.types";
import "react-native-get-random-values";
import { v4 } from "uuid";

type BasketItemContextType = {
  basketRecipes: IRecipe[];
  basketIngredients: { [key: string]: IBasketIngredient[] };
  addRecipe: (recipe: IRecipe) => void;
  removeRecipe: (recipe: IBasketRecipe) => void;
  addCustomIngredient: (ingredient: IIngredient) => void;
  modifyCustomIngredient: (overwriteIngredient: IBasketIngredient) => void;
  removeCustomIngredient: (recipe: IBasketIngredient) => void;
};

const BasketItemContext = createContext<BasketItemContextType>(null);

export const useBasketItemContext = () => useContext(BasketItemContext);

export function BasketItemContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [basketRecipes, setBasketRecipe] = useState<IBasketRecipe[]>([]);
  const [basketIngredients, setBasketIngredients] = useState<{ [key: string]: IBasketIngredient[] }>({});

  const transformRecipe = (recipe: IRecipe, recipeIndex: number) => {
    const recipeID = v4();
    return {
      ...recipe,
      id: recipeID,
      index: recipeIndex,
      ingredients: recipe.ingredients.map((ingr, index) =>
        transformIngredient(ingr, recipeID, index)
      ),
    };
  };

  const transformIngredient = (ingredient: IIngredient, recipeId: string, index: number) => {
    return {
      ...ingredient,
      itemIndex: index,
      checked: false,
      recipeId: recipeId,
      id: v4(),
      markedAsDeleted: false,
    };
  };

  const addRecipe = useCallback((recipe: IRecipe) => {
    const recipeIndex = basketRecipes.length;
    const basketRecipe = transformRecipe(recipe, recipeIndex);
    setBasketIngredients((previewState) => {
      return {
        ...previewState,
        [basketRecipe.id]: basketRecipe.ingredients.map((ingr, index) => {
          return transformIngredient(ingr, basketRecipe.id, index);
        }),
      };
    });

    setBasketRecipe((previewState) => {
      return [...previewState, basketRecipe];
    });
  }, []);

  const addCustomIngredient = useCallback((ingredient: IIngredient) => {
    if (basketIngredients["__CUSTOM__"] === undefined)
      basketIngredients["__CUSTOM__"] = [];
    basketIngredients["__CUSTOM__"].push(
      transformIngredient(
        ingredient,
        "__CUSTOM__",
        basketIngredients["__CUSTOM__"].length
      )
    );
  }, [basketIngredients]);

  const modifyCustomIngredient = useCallback((overwriteIngredient: IBasketIngredient) => {
    const copy = {...basketIngredients};
    let ingr = copy[overwriteIngredient.recipeId].find((ingr) => ingr.id === overwriteIngredient.id);
    ingr = { ...ingr, ...overwriteIngredient };
    setBasketIngredients(copy)
  }, [basketIngredients]);

  const removeRecipe = useCallback((recipe: IBasketRecipe) => {
    if (recipe.id === "__CUSTOM__") {
      console.warn("Cannot delete custom recipe. Aborting...");
      return;
    }

    const recipeIndex = basketRecipes.findIndex(
      (exists: IBasketRecipe) => exists.id === recipe.id
    );
    if (recipeIndex === -1) {
      console.warn(
        "Invalid index to remove BasketRecipe " +
          recipe.id +
          " . Aborting remove..."
      );
      return;
    }

    const removed = basketRecipes.splice(recipeIndex, 1)[0];
    delete basketIngredients[removed.id];
  }, [basketRecipes, basketIngredients]);

  const removeCustomIngredient = useCallback((ingredient: IBasketIngredient) => {
    const removed = basketIngredients[ingredient.recipeId].splice(
      basketIngredients[ingredient.recipeId].findIndex(
        (ingr: IBasketIngredient) => ingr.id === ingredient.id
      ),
      1
    )[0];
    if (removed.recipeId === "__CUSTOM__") return;

    const recipeIndex = basketRecipes.findIndex(
      (recipe: IBasketRecipe) => recipe.id === removed.recipeId
    );
    if (recipeIndex === -1) {
      console.warn(
        "Invalid BasketRecipeID " +
          removed.recipeId +
          " . Cannot mark as deleted. Aborting..."
      );
      return;
    }

    basketRecipes[recipeIndex].ingredients.find(
      (ingr: IBasketIngredient) => ingr.name === ingredient.name
    ).markedAsDeleted = true;
  }, [basketRecipes, basketIngredients]);

  const contextObject = useMemo(() => {
    return {
      basketRecipes,
      basketIngredients,
      addRecipe,
      addCustomIngredient,
      modifyCustomIngredient,
      removeRecipe,
      removeCustomIngredient,
    }
  }, [basketRecipes, basketIngredients, addRecipe, addCustomIngredient, modifyCustomIngredient, removeRecipe, removeCustomIngredient]);

  return (
    <BasketItemContext.Provider value={contextObject}>
      {children}
    </BasketItemContext.Provider>
  );
}
