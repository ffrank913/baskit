import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import Checkbox from "../../checkbox/Checkbox";
import { AssembleIngredient } from "../../../helper/AssembleIngredient";
import { IBaskitIngredient } from "../../../types";

export default function BasketIngredient(props: {
  ingredient: IBaskitIngredient;
  disabled: boolean,
  onCheckChanged: (checked: boolean) => void;
  onLongPress: () => void;
}) {
  return (
    <View style={styles.container}>
      <Checkbox
        defaultValue={false}
        disabled={props.disabled}
        tintColor={props.ingredient.checked ? "rgb(150, 150, 150)" : "black"}
        onValueChanged={(checked: boolean) => {
          props.onCheckChanged(checked);
        }}
        onLongPress={() => {
          props.onLongPress();
        }}
      >
        <Text
          style={{
            ...styles.text,
            color: props.ingredient.markedAsDeleted
            ? "rgba(200, 200, 200, 0.8)"
            : props.ingredient.checked 
              ? "rgb(150, 150, 150)" 
              : "black",

            textDecorationColor: "rgba(200, 200, 200, 0.8)",
            textDecorationStyle: "solid",
            textDecorationLine: props.ingredient.markedAsDeleted ? "line-through" : "none"
          }}
        >
          {AssembleIngredient(props.ingredient)}
        </Text>
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
