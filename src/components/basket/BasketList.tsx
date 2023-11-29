import { useContext, useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";
import { IBaskitIngredient, IIngredient } from "../../types";
import BasketItem from "./basketItem/BasketItem";
import BasketListItemModal from "./BasketListItemModal";
import { useBasketItemContext } from "../../context/basketItems/BasketItemsContextProvider";
import useDBQuery from "../../context/database/hooks/useDBQuery";
import { FromDBIngredient } from "../../helper/FromDBIngredient";
import {BlurView} from 'expo-blur';

type ListItemsObject = {
  unchecked: IBaskitIngredient[];
  checked: IBaskitIngredient[];
  deleted: IBaskitIngredient[];
  uncheckedDivider: React.JSX.Element;
  checkedDivider: React.JSX.Element;
  deletedDivider: React.JSX.Element;
};

export default function BasketList() {
  const { basketItems } = useBasketItemContext();

  const [modalItem, setModalItem] = useState<IBaskitIngredient | null>(null);
  const [itemChanged, setItemChanged] = useState<boolean>(false);

  const reduceItems = (items: IBaskitIngredient[]): IBaskitIngredient[] => {
    let reduced: IBaskitIngredient[] = [];

    items.forEach((item: IBaskitIngredient) => {
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

  const assembleItems = (basketItems: {
    [key: string]: IBaskitIngredient[];
  }): ListItemsObject => {
    const checkedItems = Object.keys(basketItems)
      .map((key: string) =>
        basketItems[key].flat().filter(
          (ingr: IBaskitIngredient) => ingr.checked && !ingr.markedAsDeleted
        )
      )
      .flat();
    const uncheckedItems = Object.keys(basketItems)
      .map((key: string) =>
        basketItems[key].filter(
          (ingr: IBaskitIngredient) => !ingr.checked && !ingr.markedAsDeleted
        )
      )
      .flat();

    const deletedItems = Object.keys(basketItems)
      .map((key: string) =>
        basketItems[key].filter(
          (ingr: IBaskitIngredient) => ingr.markedAsDeleted
        )
      )
      .flat();
    return {
      unchecked: reduceItems(uncheckedItems),
      checked: reduceItems(checkedItems),
      deleted: reduceItems(deletedItems),
      uncheckedDivider: items?.uncheckedDivider || (
        <View>
          <Divider style={{ marginTop: 8, marginBottom: 8 }}></Divider>
          <Text style={{ color: "grey" }}>Offen</Text>
        </View>
      ),
      checkedDivider: items?.checkedDivider || (
        <View>
          <Divider style={{ marginTop: 8, marginBottom: 8 }}></Divider>
          <Text style={{ color: "grey" }}>Erledigt</Text>
        </View>
      ),
      deletedDivider: items?.deletedDivider || (
        <View>
          <Divider style={{ marginTop: 8, marginBottom: 8 }}></Divider>
          <Text style={{ color: "grey" }}>Gelöscht</Text>
        </View>
      ),
    };
  };

  const [items, setItems] = useState<ListItemsObject>({
    unchecked: [],
    checked: [],
    deleted: [],
    uncheckedDivider: (
      <View>
        <Divider style={{ marginTop: 8, marginBottom: 8 }}></Divider>
        <Text style={{ color: "grey" }}>Offen</Text>
      </View>
    ),
    checkedDivider: (
      <View>
        <Divider style={{ marginTop: 8, marginBottom: 8 }}></Divider>
        <Text style={{ color: "grey" }}>Erledigt</Text>
      </View>
    ),
    deletedDivider: (
      <View>
        <Divider style={{ marginTop: 8, marginBottom: 8 }}></Divider>
        <Text style={{ color: "grey" }}>Gelöscht</Text>
      </View>
    ),
  });

  useEffect(() => {
    if(!basketItems) return;
    setItems(assembleItems(basketItems));
  }, [basketItems]);

  useEffect(() => {
    if (!itemChanged) return;
    const assembled = assembleItems(basketItems);

    setItems({
      unchecked: assembled.unchecked,
      checked: assembled.checked,
      deleted: assembled.deleted,
      uncheckedDivider: items.uncheckedDivider,
      checkedDivider: items.checkedDivider,
      deletedDivider: items.deletedDivider,
    });
    setItemChanged(false);
  }, [itemChanged]);

  const setItemChecked = (item: IBaskitIngredient, checked: boolean) => {
    const list = Object.keys(basketItems)
    .map((key: string) => basketItems[key])
    .flat()
    .filter((ingr: IBaskitIngredient) => ingr.name === item.name);
    if (list.length === 0) return;
    list.forEach((ingr: IBaskitIngredient) => {
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
              { name: "divider", id: "divider_unchecked" } as IBaskitIngredient,
              ...items.unchecked,
              { name: "divider", id: "divider_checked" } as IBaskitIngredient,
              ...items.checked,
              { name: "divider", id: "divider_deleted" } as IBaskitIngredient,
              ...items.deleted,
            ]}
            renderItem={({ item }) => (
              <>
                {items.unchecked.length > 0 &&
                  item.id === "divider_unchecked" &&
                  items.uncheckedDivider}
                {items.checked.length > 0 &&
                  item.id === "divider_checked" &&
                  items.checkedDivider}
                {items.deleted.length > 0 &&
                  item.id === "divider_deleted" &&
                  items.deletedDivider}
                
                {item.name !== "divider" && (
                  <BasketItem
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
  },
  listHeader: {
  },
  title: {
    color: "black",
    fontSize: 18,
  },
  listContainer: {
    
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
