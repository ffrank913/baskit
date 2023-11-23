import { useMemo, useState } from "react";
import { Text } from "react-native-paper";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import Checkbox from "../../checkbox/Checkbox";
import { AssembleIngredient } from "../../../helper/AssembleIngredient";
import { IBasketIngredient, IIngredient } from "../../../types";

export default function BasketIngredient(props: { ingredient: IBasketIngredient, onCheckChanged: (checked: boolean) => void}) {  
  
  console.log(props.ingredient.name, props.ingredient.checked)

  return (
    <View style={styles.container}>
      <Checkbox defaultValue={false} tintColor={ props.ingredient.checked ? 'rgb(150, 150, 150)' : 'black' } onValueChanged={(checked: boolean) => {
          props.onCheckChanged(checked);
        }}>
        <Text style={{...styles.text, color: props.ingredient.checked ? 'rgb(150, 150, 150)' : 'black' } }>{AssembleIngredient(props.ingredient)}</Text>
      </Checkbox>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    marginLeft: 8,
  },
});
