import { Modal, Text } from "react-native-paper";

import { FlatList, StyleSheet, View } from "react-native";
import RecipeButton from "../../components/recipes/RecipeButton";
import { RecipesLib } from "../../RecipesLib";
import { useState } from "react";
import RecipeModal from "../../components/recipes/RecipeModal";

export default function Recipes() {
  const recipeIDs = Object.keys(RecipesLib);
  const recipesArray = recipeIDs.map((key: string) => RecipesLib[key]);

  const [activeRecipe, setActiveRecipe] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipesArray}
        renderItem={({ item }) => (
          <RecipeButton
            title={item.title}
            image={item.image}
            onPress={() => {
              setActiveRecipe(item.id);
            }}
            description={item.description}
          ></RecipeButton>
        )}
        keyExtractor={(item) => item.id}
      />
      {activeRecipe && (
        <RecipeModal
          data={RecipesLib[activeRecipe]}
          onClose={() => {
            setActiveRecipe(null);
          }}
        ></RecipeModal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
