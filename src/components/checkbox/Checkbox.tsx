import { useState } from "react";
import { TouchableHighlight, Image, StyleSheet, View, ColorValue } from "react-native";
import { AssetLib } from "../../AssetLib";

export default function Checkbox(props: {
  children,
  defaultValue: boolean;
  disabled: boolean,
  hidden?: boolean
  tintColor?: ColorValue;
  onValueChanged?: (checked: boolean) => void;
  onLongPress?: () => void;
}) {
  const [checked, setChecked] = useState<boolean>(props.defaultValue);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={"transparent"}
        style={ styles.checkbox }
        onPress={() => {
          if(props.disabled) return;
          setChecked(!checked);
          if(props.onValueChanged) props.onValueChanged(!checked);
        }}
        onLongPress={() => {
          if(props.onLongPress) props.onLongPress();
        }}
      >
        <>
          <Image
            style={{ width: 28, height: 28, display: props.hidden ? "none" : "flex", tintColor: props.disabled ? 'rgba(100, 100, 100, 0.8)' : props.tintColor }}
            source={AssetLib.Unchecked}
          ></Image>
          {checked && (
            <Image
              style={{ position: "absolute", width: 20, height: 20, top: 3, left: 7, display: props.hidden ? "none" : "flex", tintColor: props.disabled ? 'rgba(100, 100, 100, 0.8)' : props.tintColor}}
              source={AssetLib.Check}
            ></Image>
          )}
          {props.hidden && (
            <View
              style={{ width: 28, height: 28 }}
            ></View>
          )}
          {props.children}
        </>
      </TouchableHighlight>
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
