import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { Text } from "react-native-paper";
import BasketList from "../../components/basket/BasketList";
import RecipeFormIngredient from "../../components/form/RecipeFormIngredient";
import { IIngredient } from "../../types";
import { useBasketItemContext } from "../../context/basketItems/BasketItemsContextProvider";
import { AssetLib } from "../../AssetLib";
import { useState } from "react";
import AddCustomItem from "../../components/basket/AddCustomItem";

export default function Basket() {
  const { addItem, clearAllItems } = useBasketItemContext();

  const [showClearModal, setShowClearModal] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.basketContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Baskit</Text>
          <TouchableHighlight
              style={{
                width: 48,
                height: 48,
                marginLeft: 16,
                zIndex: 1,
                borderRadius: 24,
              }}
              onPress={async () => {
                setShowClearModal(true);
              }}
            >
              <Image
                style={{ left: "12%", top: "12%", width: "75%", height: "75%" }}
                source={AssetLib.Trash}
              ></Image>
            </TouchableHighlight>
        </View>
        <BasketList></BasketList>
        <View style={{height: 44, backgroundColor: '#eb6b96', flexDirection: "row", bottom: 0 }}>
          <AddCustomItem confirmData={(ingredient: IIngredient) => {
            addItem(ingredient);
          }}></AddCustomItem>
        </View>
      </View>
      {showClearModal && (
        <View style={styles.clearContainer}>

        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  basketContainer: {
    flex: 1,
  },
  clearContainer: {
    
  },
  titleContainer: {
    padding: 16,
    backgroundColor: "#eb6b96",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    color: "white",
    fontSize: 36,
  },
  addButtonStyle: {
    backgroundColor: "#8a495f",
  },
  addButtonTextStyle: {
    color: "white",
  }
});
