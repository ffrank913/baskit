import { Modal, Text } from "react-native-paper";

import { FlatList, StyleSheet, View } from "react-native";
import RecipeButton from "../../components/recipes/RecipeButton";
import { RecipesLib } from "../../RecipesLib";
import { useState } from "react";
import RecipeModal from "../../components/recipes/recipemodal/RecipeModal";
import FixedButton from "../../components/fixedbutton/FixedButton";
import RecipeForm from "../../components/form/RecipeForm";
import { IRecipe } from "../../types";

export default function Recipes() {
  const recipesArray = Object.keys(RecipesLib).map((key: string) => RecipesLib[key]);

  const [activeRecipe, setActiveRecipe] = useState<IRecipe | null>(null);
  const [isAddingRecipe, setIsAddingRecipe] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipesArray}
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
      <FixedButton onPress={() => {
        setIsAddingRecipe(true);
      }}></FixedButton>
      {activeRecipe && (
        <RecipeModal
        data={activeRecipe}
        onClose={() => {
          setActiveRecipe(null);
        }}
        ></RecipeModal>
        )}
      {isAddingRecipe && (
        <RecipeForm
        onClose={() => {
          setIsAddingRecipe(false);
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
