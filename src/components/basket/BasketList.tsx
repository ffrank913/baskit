import { useContext, useEffect, useMemo, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { BasketItemContext } from "../../context";
import { AssembleIngredient } from "../../helper/AssembleIngredient";
import { IIngredient, IRecipe } from "../../types";

export default function BasketList() {
  const { basketItems } = useContext(BasketItemContext);
  // const [ ingredientList, setIngredientList ] = useState<IIngredient[]>([]);

  const assembledList = useMemo(() => {
    let ingredientList: IIngredient[] = [];
    basketItems.forEach((basketItemrecipe: IRecipe) => {
      
      basketItemrecipe.ingredients.forEach((newIngredient: IIngredient) => {
        const existing = ingredientList.findIndex((existingIngredient: IIngredient) => existingIngredient.name === newIngredient.name);
        if(existing !== -1) {
          if(ingredientList[existing].unit === newIngredient.unit) {
            ingredientList[existing].count += newIngredient.count;
          } else {
            ingredientList.splice(existing, 0, newIngredient);
          }
        } else {
          ingredientList.push({...newIngredient});
        }
      })
    });
    return ingredientList;
  }, [basketItems]);

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.title}>Here are the things you have to buy:</Text>
      </View>
      <FlatList
          data={assembledList}
          renderItem={({ item }) => (
            <Text> { AssembleIngredient(item) } </Text>
          )}
          keyExtractor={(item) => item.name}
        />
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
    backgroundColor: "red",
  },
  listHeader: {
    backgroundColor: "green",
  },
  title: {
    color: "black",
    fontSize: 18,
  },
});
