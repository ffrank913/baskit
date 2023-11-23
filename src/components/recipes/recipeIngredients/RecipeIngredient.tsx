import { useMemo, useState } from "react";
import { Text } from "react-native-paper";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { IIngredient } from "../../../RecipesLib";
import Checkbox from "../../checkbox/Checkbox";

export const AssembleIngredient = (ingredient: IIngredient): string => {
  let text: string = ingredient.name;
  if(ingredient.count) {
    if(!ingredient.unit) {
      text = ingredient.count + " " + ingredient.name;
    } else {
      text = ingredient.count + " " + ingredient.unit + " " + ingredient.name;
    }
  }
  return text;
}

export default function RecipeIngredient(props: { ingredient: IIngredient }) {
  

  return (
    <View style={styles.container}>
      <Checkbox defaultValue={true}>
        <Text style={styles.text}>{AssembleIngredient(props.ingredient)}</Text>
      </Checkbox>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 22,
    marginLeft: 8,
  },
});
