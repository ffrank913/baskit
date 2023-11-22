import { FlatList, StyleSheet } from "react-native";
import { IIngedrient } from "../../../RecipesLib";
import Ingredient from "./Ingredient";

export default function IngredientsList(props: { ingredients: IIngedrient[] }) {
  return (
    <FlatList
      style={styles.list}
      data={props.ingredients}
      renderItem={({ item }) => (
        <Ingredient ingredient={item}/>
      )}
      keyExtractor={(item) => item.name}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    margin: 8,
    marginBottom: 32, 
  },
});
