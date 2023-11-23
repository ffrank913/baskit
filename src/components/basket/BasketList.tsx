import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";
import { BasketItemContext } from "../../context";
import { AssembleIngredient } from "../../helper/AssembleIngredient";
import { IBasketIngredient, IIngredient, IRecipe } from "../../types";
import BasketIngredient from "./basketIngredients/BasketIngedient";



export default function BasketList() {
  const { basketItems } = useContext(BasketItemContext);

  const [uncheckedItems, setUncheckedItems] = useState<IBasketIngredient[]>([]);
  const [checkedItems, setCheckedItems] = useState<IBasketIngredient[]>([]);

  useMemo(() => {
    basketItems.forEach((basketItemrecipe: IRecipe) => {
      basketItemrecipe.ingredients.forEach((newIngredient: IIngredient) => {
        const existing = uncheckedItems.findIndex(
          (existingIngredient: IBasketIngredient) =>
            existingIngredient.name === newIngredient.name
        );
        if (existing !== -1) {
          if (uncheckedItems[existing].unit === newIngredient.unit) {
            uncheckedItems[existing].count += newIngredient.count;
          } else {
            uncheckedItems.splice(existing, 0, {
              ...newIngredient,
              index: existing + 1,
              checked: false,
            });
          }
        } else {
          uncheckedItems.push({
            ...newIngredient,
            checked: false,
            index: uncheckedItems.length,
          });
        }
      });
    });
  }, [basketItems]);

  const checkItem = (name: string) => {
    const index = uncheckedItems.findIndex(
      (unchecked: IBasketIngredient) => unchecked.name === name
    );
    if (index === -1) {
      console.warn("Invalid item index, aborting check...");
      return;
    } else {
      let spliced = uncheckedItems.splice(index, 1);
      spliced[0].checked = true;
      setCheckedItems([...checkedItems, ...spliced]);
    }
  }

  const uncheckItem = (name: string) => {
    const index = checkedItems.findIndex(
      (checked: IBasketIngredient) => checked.name === name
    );
    if (index === -1) {
      console.warn("Invalid item index, aborting uncheck...");
      return;
    } else {
      let spliced = checkedItems.splice(index, 1);
      spliced[0].checked = false;
      setUncheckedItems([
        ...uncheckedItems,
        ...spliced,
      ]);
    }
  }

  const itemCheckChanged = (name: string, checked: boolean) => {
    if (checked) {
      uncheckItem(name);
    } else {
      checkItem(name);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.title}>Diese Dinge musst du kaufen</Text>
      </View>

      {/* unchecked items are rendered at the top, checked items are rendered at the bottom */}
      {[...uncheckedItems, ...checkedItems].length > 0 && (
        <View style={styles.listContainer}>
          <FlatList
            data={[
              ...uncheckedItems.sort((a, b) => (a.index < b.index ? 1 : -1)),
              { index: -1, name: 'divider' } as IBasketIngredient,
              ...checkedItems.sort((a, b) => (a.index < b.index ? 1 : -1)),
            ]}
            renderItem={({ item }) => (
              <>
                { ( checkedItems.length > 0 && item.index === -1 && <Divider style={{ marginTop: 8, marginBottom: 8 }}></Divider>) }
                { (item.index > -1 && <BasketIngredient
                  onCheckChanged={(checked: boolean) => {
                    itemCheckChanged(item.name, checked);
                  }}
                  ingredient={item}
                />) }
              </>
            )}
            keyExtractor={(item) => item.name}
          />
        </View>
      )}

      {/* if list is empty show empty container */}
      {uncheckedItems.length === 0 && checkedItems.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}> Keine Einträge </Text>
        </View>
      )}

      {/* {activeRecipe && (
          // <RecipeModal
          //   data={RecipesLib[activeRecipe]}
          //   onClose={() => {
          //     setActiveRecipe(null);
          //   }}
          // ></RecipeModal>
          <></>
        )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    // backgroundColor: "red",
  },
  listHeader: {
    // backgroundColor: "green",
  },
  title: {
    color: "black",
    fontSize: 18,
  },
  listContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor: 'magenta',
  },
  emptyContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "rgb(150, 150, 150)",
  },
});
