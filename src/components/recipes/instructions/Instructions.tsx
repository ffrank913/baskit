import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Instructions(props: { instructions: string[] }) {
  return (
    <View style={styles.container}>
      {props.instructions &&
        props.instructions.map((instruction: string, index: number) => {
          return (
            <View style={styles.instruction}>
              <Text style={styles.counter}>{index + 1 + "."}</Text>
              <Text style={styles.text}>{instruction}</Text>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 16,
    marginBottom: 16,
  },
  instruction: {
    flexDirection: "row",
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  counter: {
    width: 34,
    color: "rgb(255,255,255)",
    fontSize: 14,
  },
  text: {
    width: "90%",
    color: "rgb(255,255,255)",
    fontSize: 14,
  },
});
