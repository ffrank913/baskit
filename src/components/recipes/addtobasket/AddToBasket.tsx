import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IRecipe } from "../../../RecipesLib";
import { Text } from "react-native-paper";

export default function AddToBasket() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Add To Basket </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Edit </Text>
      </TouchableOpacity>
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

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 4,
    backgroundColor: "rgba(40, 40, 40, 0.8)",
  },
  text: {
    height: 42,
    top: 11,

    fontSize: 16,

    color: "white",
  },
});
