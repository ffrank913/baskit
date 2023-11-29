import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IBaskitIngredient, IIngredient, IRecipe } from "../../types";
import { IBaskitRecipe } from "../../types/internal/IBaskitRecipe.types";
import "react-native-get-random-values";
import { v4 } from "uuid";
import useDBInsert from "../database/hooks/useDBInsert";
import { ToDBIngredient } from "../../helper/ToDBIngredient";
import useDBQuery from "../database/hooks/useDBQuery";
import { FromDBIngredient } from "../../helper/FromDBIngredient";
import useDBUpdate from "../database/hooks/useDBUpdate";
import useDBClear from "../database/hooks/useDBClear";

type BasketItemContextType = {
  basketRecipes: IRecipe[];
  basketItems: { [key: string]: IBaskitIngredient[] };
  addRecipeToBasket: (recipe: IRecipe) => void;
  removeRecipeFromBasket: (recipe: IBaskitRecipe) => void;
  addItem: (ingredient: IIngredient) => void;
  modifyItem: (overwriteIngredient: IBaskitIngredient) => void;
  removeItem: (recipe: IBaskitIngredient) => void;
  clearAllItems: () => void;
};

const BasketItemContext = createContext<BasketItemContextType>(null);

export const useBasketItemContext = () => useContext(BasketItemContext);

export function BasketItemContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // database hooks
  const insertBasketItem = useDBInsert('items');
  const queryBasketItems = useDBQuery('items');
  const updateBasketItems = useDBUpdate('items');
  const clearBasketItems = useDBClear('items');
  
  const [basketRecipes, setBasketRecipes] = useState<IBaskitRecipe[]>([]);
  const [basketItems, setBasketItems] = useState<{ [key: string]: IBaskitIngredient[] }>({});
  
  useEffect(() => {
    queryBasketItems().then((result) => {
      const object = {}; 
      result.rows._array.forEach((data) => {
        if(object[data.recipeId] === undefined) object[data.recipeId] = [];
        object[data.recipeId].push(FromDBIngredient(data));
      });
      setBasketItems(object)
    });
  }, []);

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

  const addRecipeToBasket = useCallback((recipe: IRecipe) => {
    const recipeIndex = basketRecipes.length;
    const basketRecipe = transformRecipe(recipe, recipeIndex);
    setBasketItems((previewState) => {
      return {
        ...previewState,
        [basketRecipe.id]: basketRecipe.ingredients.map((ingr, index) => {
          return transformIngredient(ingr, basketRecipe.id, index);
        }),
      };
    });

    // add recipe to recipes in basket
    setBasketRecipes((previewState) => {
      return [...previewState, basketRecipe];
    });

    // add ingredients to DB Basket
    recipe.ingredients.forEach((ingr) => {
      const db = ToDBIngredient(ingr, basketRecipe.id);
      insertBasketItem(Object.keys(db), Object.values(db));
    });
  }, []);

  const removeRecipeFromBasket = useCallback((recipe: IBaskitRecipe) => {
    if (recipe.id === "__CUSTOM__") {
      console.warn("Cannot delete custom recipe. Aborting...");
      return;
    }

    const recipeIndex = basketRecipes.findIndex(
      (exists: IBaskitRecipe) => exists.id === recipe.id
    );
    if (recipeIndex === -1) {
      console.warn(
        "Invalid index to remove BasketRecipe " +
          recipe.id +
          " . Aborting remove..."
      );
      return;
    }

    const spliced = basketRecipes.splice(recipeIndex, 1);
    const removed = spliced[0];
    delete basketItems[removed.id];
  }, [basketRecipes, basketItems]);

  const addItem = useCallback((ingredient: IIngredient) => {
    if (basketItems["__CUSTOM__"] === undefined)
      basketItems["__CUSTOM__"] = [];

    const modified = {...basketItems};
    modified["__CUSTOM__"].push(
      transformIngredient(
        ingredient,
        "__CUSTOM__",
        basketItems["__CUSTOM__"].length
      )
    );
    setBasketItems(modified);
  }, [basketItems]);

  const modifyItem = useCallback((overwriteIngredient: IBaskitIngredient) => {
    const copy = {...basketItems};
    let ingr = copy[overwriteIngredient.recipeId].find((ingr) => ingr.id === overwriteIngredient.id);
    ingr = { ...ingr, ...overwriteIngredient };
    setBasketItems(copy);
    updateBasketItems({column: "markedAsDeleted", value: overwriteIngredient.markedAsDeleted}, {field: "id", conditional: "=", value: overwriteIngredient.id});
  }, [basketItems]);

  const removeItem = useCallback((ingredient: IBaskitIngredient) => {
    const removed = basketItems[ingredient.recipeId].splice(
      basketItems[ingredient.recipeId].findIndex(
        (ingr: IBaskitIngredient) => ingr.id === ingredient.id
      ),
      1
    )[0];
    if (removed.recipeId === "__CUSTOM__") return;

    const recipeIndex = basketRecipes.findIndex(
      (recipe: IBaskitRecipe) => recipe.id === removed.recipeId
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
      (ingr: IBaskitIngredient) => ingr.name === ingredient.name
    ).markedAsDeleted = true;
  }, [basketRecipes, basketItems]);

  const clearAllItems = useCallback(() => {
    setBasketItems({});
    setBasketRecipes([]);
    clearBasketItems().then((result) => console.log(result));
  }, [basketItems])

  const contextObject = useMemo(() => {
    return {
      basketRecipes: basketRecipes,
      basketItems: basketItems,
      addRecipeToBasket,
      removeRecipeFromBasket,
      addItem,
      modifyItem,
      removeItem,
      clearAllItems,
    }
  }, [basketRecipes, basketItems, addRecipeToBasket, addItem, modifyItem, removeRecipeFromBasket, removeItem]);

  return (
    <BasketItemContext.Provider value={contextObject}>
      {children}
    </BasketItemContext.Provider>
  );
}
