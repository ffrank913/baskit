import { useMemo, useState } from "react";
import { Text } from "react-native-paper";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { IIngedrient } from "../../../RecipesLib";
import Checkbox from "../../checkbox/Checkbox";

export default function Ingredient(props: { ingredient: IIngedrient }) {
  let text: string = props.ingredient.name;
  if(props.ingredient.count) {
    if(!props.ingredient.unit) {
      text = props.ingredient.count + " " + props.ingredient.name;
    } else {
      text = props.ingredient.count + " " + props.ingredient.unit + " " + props.ingredient.name;
    }
  }

  return (
    <View style={styles.container}>
      <Checkbox defaultValue={true}>
        <Text style={styles.text}>{text}</Text>
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
    color: "white",
    fontSize: 22,
    marginLeft: 8,
  },
});
