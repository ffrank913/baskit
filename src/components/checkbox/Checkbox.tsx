import { useState } from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { AssetLib } from "../../AssetLib";

export default function Checkbox(props: {
  children,
  defaultValue: boolean;
  onValueChanged?: (checked: boolean) => void;
}) {
  const [checked, setChecked] = useState<boolean>(props.defaultValue || false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => {
          setChecked(!checked);
        }}
      >
        <Image
          style={{ width: 28, height: 28 }}
          source={AssetLib.Unchecked}
        ></Image>
        {checked && (
          <Image
            style={{ position: "absolute", width: 20, height: 20, top: 3, left: 7}}
            source={AssetLib.Check}
          ></Image>
        )}
        {props.children}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    flexDirection: "row",
    width: "100%",
    
    borderColor: "white",
    borderRadius: 2,
  },
});
