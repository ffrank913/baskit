import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import BasketList from "../../components/basket/BasketList";
import RecipeFormIngredient from "../../components/form/RecipeFormIngredient";
import { IIngredient } from "../../types";
import { useBasketItemContext } from "../../context/basketItems/BasketItemsContextProvider";

export default function Basket() {
  const { addCustomIngredient } = useBasketItemContext();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Baskit</Text>
      </View>
      <BasketList></BasketList>
      <View style={{height: 50, backgroundColor: '#eb6b96', flex: 0.1, flexDirection: "row" }}>
        <RecipeFormIngredient confirmData={(ingredient: IIngredient) => {
          addCustomIngredient(ingredient);
        }}></RecipeFormIngredient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    padding: 16,
    backgroundColor: "#eb6b96",
  },
  title: {
    color: "white",
    fontSize: 36,
  },
});
