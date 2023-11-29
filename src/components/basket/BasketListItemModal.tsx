import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Text } from "react-native-paper";
import { AssetLib } from "../../AssetLib";
import { useState } from "react";
import { IBaskitIngredient } from "../../types";
import { AssembleIngredient } from "../../helper/AssembleIngredient";
import { IBaskitRecipe } from "../../types/internal/IBaskitRecipe.types";
import { useBasketItemContext } from "../../context/basketItems/BasketItemsContextProvider";

export default function BasketListItemModal(props: {
  item: IBaskitIngredient;
  onClose: () => void;
}) {
  const { basketItems, basketRecipes, modifyItem: modifyCustomIngredient } =
    useBasketItemContext();

  const [objectToDelete, setObjectToDelete] =
    useState<IBaskitIngredient | null>(null);

  const data = Object.keys(basketItems)
    .map((key: string) =>
      basketItems[key].filter(
        (ingr: IBaskitIngredient) => ingr.name === props.item.name
      )
    )
    .flat()
    .map((ingr: IBaskitIngredient) => {
      return {
        ingredient: ingr,
        from: basketRecipes.find(
          (recipe: IBaskitRecipe) => recipe.id === ingr.recipeId
        )?.title || "Eigen",
      };
    });

  const changeDeleteStatus = (
    objectToDelete: IBaskitIngredient,
    markAsDeleted: boolean
  ) => {
    objectToDelete.markedAsDeleted = markAsDeleted;
    modifyCustomIngredient(objectToDelete);
    // throw new Error("Function not implemented.");
  };

  return (
    <>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              height: 44,
              flexDirection: "row-reverse",
            }}
          >
            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                marginLeft: 16,
                zIndex: 1,
              }}
              onPress={() => {
                props.onClose();
              }}
            >
              <Image
                style={{ left: "12%", top: "12%", width: "75%", height: "75%" }}
                source={AssetLib.Cross}
              ></Image>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.content}
            data={data}
            renderItem={({ item }) => (
              <>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 24,
                      height: 24,
                      marginLeft: 8,
                      zIndex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      setObjectToDelete(item.ingredient);
                    }}
                  >
                    <Image
                      style={{
                        left: "12%",
                        top: "12%",
                        width: "75%",
                        height: "75%",
                        transform: item.ingredient.markedAsDeleted
                          ? [{ rotate: "45deg" }, { scale: 0.95 }]
                          : [{ rotate: "0deg" }, { scale: 1.0 }],
                      }}
                      source={AssetLib.Cross}
                    ></Image>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 16,
                      width: "100%",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.entryIngr,
                        textDecorationLine: item.ingredient.markedAsDeleted
                          ? "line-through"
                          : "none",
                        textDecorationStyle: "solid",
                      }}
                    >
                      {AssembleIngredient(item.ingredient)}
                    </Text>
                    <Text style={styles.entryFrom}>{"von " + item.from}</Text>
                  </View>
                </View>
              </>
            )}
            keyExtractor={(item) => item.ingredient.id}
          />
        </View>
      </View>
      {objectToDelete && (
        <View style={styles.container}>
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 8,
              left: 8,
              padding: 24,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: 8,
                padding: 8,
              }}
            >
              <View>
                <Text style={styles.deleteTitle}>Änderungen</Text>
                <Text style={styles.deleteText}>
                  {objectToDelete.markedAsDeleted
                    ? "Möchtest du " +
                      AssembleIngredient(objectToDelete) +
                      " wieder hinzufügen?"
                    : "Möchtest du " +
                      AssembleIngredient(objectToDelete) +
                      " wirklich löschen?"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 16,
                  paddingBottom: 8,
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setObjectToDelete(null);
                  }}
                >
                  <Text style={styles.buttonText}>Abbrechen </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.button, backgroundColor: objectToDelete.markedAsDeleted ? "rgba(40, 150, 40, 0.8)" : "rgba(150, 40, 40, 0.8)",}}
                  onPress={() => {
                    changeDeleteStatus(
                      objectToDelete,
                      !objectToDelete.markedAsDeleted
                    );
                    setObjectToDelete(null);
                  }}
                >
                  <Text style={styles.buttonText}>Bestätigen </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    margin: 8,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  entryIngr: {
    padding: 8,
    paddingBottom: 0,

    color: "rgb(255,255,255)",

    fontSize: 16,
  },
  entryFrom: {
    paddingLeft: 24,
    paddingBottom: 0,

    color: "rgb(180,180,180)",

    fontSize: 12,
  },
  deleteTitle: {
    padding: 8,
    fontSize: 28,
    color: "rgb(80,80,80)",
  },
  deleteText: {
    padding: 8,
    paddingBottom: 0,

    color: "rgb(20,20,20)",

    fontSize: 16,
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    borderRadius: 8,
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
  buttonText: {
    height: 42,
    top: 11,

    fontSize: 16,

    color: "white",
  },
});
