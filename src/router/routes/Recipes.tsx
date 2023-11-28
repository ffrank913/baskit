import { FlatList, StyleSheet, View } from "react-native";
import RecipeButton from "../../components/recipes/RecipeButton";
import { useEffect, useState } from "react";
import RecipeModal from "../../components/recipes/recipemodal/RecipeModal";
import FixedButton from "../../components/fixedbutton/FixedButton";
import RecipeForm from "../../components/form/RecipeForm";
import { IBaskitRecipe } from "../../types";
import useDBQuery from "../../context/database/hooks/useDBQuery";
import { FromDBRecipe } from "../../helper/FromDBRecipe";

export default function Recipes() {
  const queryRecipes = useDBQuery("recipes");

  const [changed, setChanged] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<IBaskitRecipe[]>([]);

  useEffect(() => {
    if (!changed) return;
    queryRecipes().then((result) => {
      const recipes = result.rows._array.map((data, index) =>
        FromDBRecipe(data)
      );
      setRecipes(recipes);
      setChanged(false);
    });
  }, [changed]);

  const [activeRecipe, setActiveRecipe] = useState<IBaskitRecipe | null>(null);
  const [isAddingRecipe, setIsAddingRecipe] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <RecipeButton
            title={item.title}
            image={item.image}
            onPress={() => {
              setActiveRecipe(item);
            }}
            description={item.description}
          ></RecipeButton>
        )}
        keyExtractor={(item) => item.title}
      />
      <FixedButton
        onPress={() => {
          setIsAddingRecipe(true);
        }}
      ></FixedButton>
      {activeRecipe && (
        <RecipeModal
          data={activeRecipe}
          onClose={(changed: boolean) => {
            setActiveRecipe(null);
            setChanged(changed);
          }}
        ></RecipeModal>
      )}
      {isAddingRecipe && (
        <RecipeForm
          onClose={(changed: boolean) => {
            setIsAddingRecipe(false);
            setChanged(changed);
          }}
        ></RecipeForm>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
