import { useContext, useState } from "react";
import { RecipesLib } from "../../RecipesLib";
import { FlatList, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { BasketItemContext } from "../../context/ContextProviders";
import { AssembleIngredient } from "../recipes/ingredients/Ingredient";

export default function BasketList() {
  const { basketItems } = useContext(BasketItemContext);

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.title}>Here are the things you have to buy:</Text>
      </View>
      <Text style={styles.title}>{basketItems.length}</Text>
      <FlatList
          data={basketItems}
          renderItem={({ item }) => (
            <Text> { AssembleIngredient(item) } </Text>
          )}
          keyExtractor={(item) => item.name}
        />
      {/* {activeRecipe && (
          // <RecipeModal
          //   data={RecipesLib[activeRecipe]}
          //   onClose={() => {
          //     setActiveRecipe(null);
          //   }}
          // ></RecipeModal>
          <></>
        )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "red",
  },
  listHeader: {
    backgroundColor: "green",
  },
  title: {
    color: "black",
    fontSize: 18,
  },
});
