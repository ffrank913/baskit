import { useState } from "react";
import { TouchableOpacity, Image, StyleSheet, View, ColorValue } from "react-native";
import { AssetLib } from "../../AssetLib";

export default function Checkbox(props: {
  children,
  defaultValue: boolean;
  tintColor?: ColorValue;
  onValueChanged?: (checked: boolean) => void;
}) {
  const [checked, setChecked] = useState<boolean>(props.defaultValue);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => {
          setChecked(!checked);
          if(props.onValueChanged) props.onValueChanged(checked);
        }}
      >
        <Image
          style={{ width: 28, height: 28, tintColor: props.tintColor }}
          source={AssetLib.Unchecked}
        ></Image>
        {checked && (
          <Image
            style={{ position: "absolute", width: 20, height: 20, top: 3, left: 7, tintColor: props.tintColor}}
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
    
    color: 'black',
    borderRadius: 2,
  },
});
