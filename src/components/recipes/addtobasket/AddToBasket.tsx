import { StyleSheet, View } from "react-native";
import { IRecipe } from "../../../RecipesLib";
import { Button } from "react-native-paper";

export default function AddToBasket() {
  return (
    <View style={styles.container}>
      <Button style={styles.button} labelStyle={{ color: "white" }}> Add To Basket </Button>
      <Button style={styles.button} labelStyle={{ color: "white" }}> Edit </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: "rgba(60, 60, 60, 0.6)"
  },
});
