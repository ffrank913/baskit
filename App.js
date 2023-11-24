import { useState, useMemo, useCallback } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BasketItemContext } from "./src/context";
import Router from "./src/router/Router";
import 'react-native-get-random-values';
import { v4 } from 'uuid';

export default function App() {
  const [basketRecipes, setBasketRecipe] = useState([]);
  const [basketIngredients, setBasketIngredients] = useState({});
  // const basketIngredients = useSignal({});

  const transformRecipe = (recipe, recipeIndex) => {
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

  const transformIngredient = (ingredient, recipeId, index) => {
    return {
      ...ingredient,
      itemIndex: index,
      checked: false,
      recipeId: recipeId,
      markedAsDeleted: false,
    };
  };

  const addRecipe = useCallback((recipe) => {
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

  const addIngredient = useCallback((ingredient) => {
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

  const removeRecipe = useCallback((recipe) => {
    if (recipe.id === "__CUSTOM__") {
      console.warn("Cannot delete custom recipe. Aborting...");
      return;
    }

    const recipeIndex = basketRecipes.findIndex(
      (exists) => exists.id === recipe.id
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

  const removeIngredient = useCallback((ingredient) => {
    const removed = basketIngredients[ingredient.recipeId].splice(
      basketIngredients[ingredient.recipeId].findIndex(
        (ingr) => ingr.itemIndex === ingredient.itemIndex
      ),
      1
    )[0];
    if (removed.recipeId === "__CUSTOM__") return;

    const recipeIndex = basketRecipes.findIndex(
      (recipe) => recipe.id === removed.recipeId
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
      (ingr) => ingr.name === ingredient.name
    ).markedAsDeleted = true;
  }, [basketRecipes, basketIngredients]);

  const contextObject = useMemo(() => {
    return {
      basketRecipes: basketRecipes,
      basketIngredients: basketIngredients,
      addRecipe: addRecipe,
      addCustomIngredient: addIngredient,
      removeRecipe: removeRecipe,
      removeCustomIngredient: removeIngredient,
    }
  }, [basketRecipes, basketIngredients, addRecipe, addIngredient, removeRecipe, removeIngredient])

  return (
    <BasketItemContext.Provider
      value={contextObject}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Router />
        </SafeAreaView>
      </SafeAreaProvider>
    </BasketItemContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
  },
});
