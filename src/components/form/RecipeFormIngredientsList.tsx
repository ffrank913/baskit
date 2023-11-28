import { FlatList, StyleSheet, TouchableHighlight, View, Text } from "react-native";
import { IIngredient } from "../../types";
import { useState } from "react";
import RecipeFormIngredient from "./RecipeFormIngredient";
import RecipeIngredient from "../recipes/recipeIngredients/RecipeIngredient";

export default function RecipeIngredientsList(props: {
  editable: boolean;
  ingredients: IIngredient[],
  setIngredients: (ingredients: IIngredient[]) => void,
}) {
  

  return (
    <View>
      <FlatList
        style={styles.list}
        data={props.ingredients}
        renderItem={({ item }) => <RecipeIngredient ingredient={item} />}
        keyExtractor={(item) => item.name}
      />
      {props.editable && (
        <View style={styles.list}>
          <RecipeFormIngredient confirmData={(ingredient: IIngredient) => {
            props.setIngredients([...props.ingredients, ingredient]);
          }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    margin: 8,
  },
  
});
