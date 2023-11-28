import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function AddRecipe(props: { onConfirm: () => void, onCancel: () => void}) {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{...styles.button, backgroundColor: "rgba(150, 40, 40, 0.8)" }} onPress={() => {
        props.onCancel();
      }}>
        <Text style={styles.text}>CANCEL</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.button, backgroundColor: "rgba(40, 150, 40, 0.8)" }} onPress={() => {
        props.onConfirm();
      }}>
        <Text style={styles.text}>Add Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    marginBottom: 8, 
  },
  button: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 4,
    backgroundColor: "rgba(40, 40, 40, 0.8)",
  },
  text: {
    height: 42,
    top: 11,

    fontSize: 16,

    color: "white",
  },
});
