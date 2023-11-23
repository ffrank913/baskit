import { useMemo, useState } from "react";
import { Text } from "react-native-paper";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import Checkbox from "../../checkbox/Checkbox";
import { AssembleIngredient } from "../../../helper/AssembleIngredient";
import { IIngredient } from "../../../types";

export default function RecipeIngredient(props: { ingredient: IIngredient }) {
  return (
    <View style={styles.container}>
      <Checkbox defaultValue={true}>
        <Text style={styles.text}>{AssembleIngredient(props.ingredient)}</Text>
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
