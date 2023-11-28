import { FlatList, StyleSheet } from "react-native";
import RecipeIngredient from "./RecipeIngredient";
import { IIngredient } from "../../../types";

export default function RecipeIngredientsList(props: {
  ingredients: IIngredient[];
}) {
  return (
    <FlatList
      style={styles.list}
      data={props.ingredients}
      renderItem={({ item }) => <RecipeIngredient ingredient={item} />}
      keyExtractor={(item) => item.name}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    margin: 8,
  },
});
