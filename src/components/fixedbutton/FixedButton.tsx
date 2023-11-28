import { StyleSheet, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function FixedButton(props: { onPress: () => void }) {
    return (
        <View style={styles.container}>
          <TouchableHighlight style={styles.button} underlayColor={"#8a495f"} onPress={() => {
            props.onPress();
          }}>
            <Text style={styles.text}>+</Text>
          </TouchableHighlight>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "absolute",
      width: 60,
      height: 60,
      right: 16,
      bottom: 16,
    },
    button: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
      backgroundColor: "#eb6b96"
    },
    text: {
      height: 56,
      fontSize: 42,
      color: "white",
    },
  });