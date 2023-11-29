import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { Text } from "react-native-paper";
import BasketList from "../../components/basket/BasketList";
import RecipeFormIngredient from "../../components/form/RecipeFormIngredient";
import { IIngredient } from "../../types";
import { useBasketItemContext } from "../../context/basketItems/BasketItemsContextProvider";
import { AssetLib } from "../../AssetLib";
import { useState } from "react";
import AddCustomItem from "../../components/basket/AddCustomItem";
import { BlurView } from "expo-blur";

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
              borderRadius: 8,
            }}
            underlayColor={"rgba(138, 73, 95, 1.0)"}
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
        <View
          style={{
            height: 44,
            backgroundColor: "#eb6b96",
            flexDirection: "row",
            bottom: 0,
          }}
        >
          <AddCustomItem
            confirmData={(ingredient: IIngredient) => {
              addItem(ingredient);
            }}
          ></AddCustomItem>
        </View>
      </View>
      {showClearModal && (
        <View style={styles.clearContainer}>
          <BlurView style={styles.clearModal} intensity={10}>
            <Text style={styles.clearModalTitle}>Alle Elemente löschen?</Text>
            <Text style={styles.clearModalText}>
              Bist du Dir sicher, dass du alle Elemente in deinem Baskit löschen
              möchtest?
            </Text>
            <View style={styles.clearModalButtonRow}>
              <TouchableHighlight
                style={styles.clearModalButtonKeep}
                underlayColor={"rgb(54, 201, 54)"}
                onPress={async () => {
                  setShowClearModal(false);
                }}
                >
                <Text style={styles.clearModalButtonText}>Behalten</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.clearModalButtonDelete}
                underlayColor={"rgb(201, 54, 54)"}
                onPress={async () => {
                  clearAllItems();
                  setShowClearModal(false);
                }}
              >
                <Text style={styles.clearModalButtonText}>Löschen</Text>
              </TouchableHighlight>
            </View>
          </BlurView>
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
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  clearModal: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "rgba(138, 73, 95, 0.7)",
  },
  clearModalTitle: {
    fontSize: 24,
    color: "rgb(0,0,0)",
  },
  clearModalText: {
    padding: 8,
    color: "rgb(0,0,0)",
    fontSize: 16,
  },
  clearModalButtonRow: {
    flexDirection: "row",
  },
  clearModalButtonKeep: {
    flex: 0.5,
    padding: 8,
    margin: 4,
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "rgb(60, 220, 60)",
  },
  clearModalButtonDelete: {
    flex: 0.5,
    padding: 8,
    margin: 4,
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "rgb(250, 60, 60)",
  },
  clearModalButtonText: {
    fontSize: 18,
  },
  titleContainer: {
    padding: 16,
    backgroundColor: "#eb6b96",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    color: "white",
    fontSize: 40,
    fontFamily: "SFCompactRoundedSemibold",
  },
  addButtonStyle: {
    backgroundColor: "#8a495f",
  },
  addButtonTextStyle: {
    color: "white",
  },
});
