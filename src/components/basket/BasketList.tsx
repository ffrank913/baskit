import { useContext, useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";
import { IBasketIngredient, IIngredient } from "../../types";
import BasketIngredient from "./basketIngredients/BasketIngedient";
import { BasketItemContext } from "../../context/basketItems/BasketItemsContextProvider";
import BasketListItemModal from "./BasketListItemModal";

type ListItemsObject = {
  unchecked: IBasketIngredient[];
  divider: React.JSX.Element;
  checked: IBasketIngredient[];
  deleted: IBasketIngredient[];
};

export default function BasketList() {
  const { basketIngredients } = useContext(BasketItemContext);

  const [modalItem, setModalItem] = useState<IBasketIngredient | null>(null);
  const [itemChanged, setItemChanged] = useState<boolean>(false);

  const reduceItems = (items: IBasketIngredient[]): IBasketIngredient[] => {
    let reduced: IBasketIngredient[] = [];

    items.forEach((item: IBasketIngredient) => {
      const existing = reduced.findIndex(
        (existingIngredient: IIngredient) =>
          existingIngredient.name === item.name
      );
      if (existing !== -1) {
        if (reduced[existing].unit === item.unit) {
          reduced[existing].count += item.count;
        } else {
          reduced.splice(existing, 0, { ...item });
        }
      } else {
        reduced.push({ ...item });
      }
    });

    return reduced;
  };

  const assembleItems = (basketIngredients: {
    [key: string]: IBasketIngredient[];
  }): ListItemsObject => {
    const checkedItems = Object.keys(basketIngredients)
      .map((key: string) =>
        basketIngredients[key].filter(
          (ingr: IBasketIngredient) => ingr.checked && !ingr.markedAsDeleted
        )
      )
      .flat();
    const uncheckedItems = Object.keys(basketIngredients)
      .map((key: string) =>
        basketIngredients[key].filter(
          (ingr: IBasketIngredient) => !ingr.checked && !ingr.markedAsDeleted
        )
      )
      .flat();

    const deletedItems = Object.keys(basketIngredients)
      .map((key: string) =>
        basketIngredients[key].filter(
          (ingr: IBasketIngredient) => ingr.markedAsDeleted
        )
      )
      .flat();
    return {
      unchecked: reduceItems(uncheckedItems),
      divider: items?.divider || (
        <Divider style={{ marginTop: 8, marginBottom: 8 }}></Divider>
      ),
      checked: reduceItems(checkedItems),
      deleted: reduceItems(deletedItems),
    };
  };

  const [items, setItems] = useState<ListItemsObject>(
    assembleItems(basketIngredients)
  );

  useEffect(() => {
    setItems(assembleItems(basketIngredients));
  }, [basketIngredients]);

  useEffect(() => {
    if (!itemChanged) return;
    const assembled = assembleItems(basketIngredients);

    setItems({
      unchecked: assembled.unchecked,
      checked: assembled.checked,
      deleted: assembled.deleted,
      divider: items.divider,
    });
    setItemChanged(false);
  }, [itemChanged]);

  const setItemChecked = (item: IBasketIngredient, checked: boolean) => {
    const list = Object.keys(basketIngredients)
      .map((key: string) => basketIngredients[key])
      .flat()
      .filter((ingr: IBasketIngredient) => ingr.name === item.name);
    if (list.length === 0) return;
    list.forEach((ingr: IBasketIngredient) => {
      ingr.checked = checked;
    });
    setItemChanged(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.title}>Diese Dinge musst du kaufen</Text>
      </View>

      {/* unchecked items are rendered at the top, checked items are rendered at the bottom */}
      {[...items.unchecked, ...items.checked].length > 0 && (
        <View style={styles.listContainer}>
          <FlatList
            data={[
              ...items.unchecked,
              { name: "divider", id: "divider0" } as IBasketIngredient,
              ...items.checked,
              { name: "divider", id: "divider1" } as IBasketIngredient,
              ...items.deleted,
            ]}
            renderItem={({ item }) => (
              <>
                {items.checked.length > 0 || items.deleted.length > 0 &&
                  item.name === "divider" &&
                  items.divider}
                {item.name !== "divider" && (
                  <BasketIngredient
                    disabled={item.markedAsDeleted}
                    onCheckChanged={(checked: boolean) => {
                      setItemChecked(item, checked);
                    }}
                    onLongPress={() => {
                      setModalItem(item);
                    }}
                    ingredient={item}
                  />
                )}
              </>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}

      {/* if list is empty show empty container */}
      {items.unchecked.length === 0 && items.checked.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}> Keine Einträge </Text>
        </View>
      )}

      {modalItem && (
        <BasketListItemModal
          item={modalItem}
          onClose={() => {
            setModalItem(null);
          }}
        ></BasketListItemModal>
      )}
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
