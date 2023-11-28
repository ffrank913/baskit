import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Text } from "react-native-paper";

export default function RecipeFormInstructions(props: {
  instructions: string[];
  setInstructions: (instructions: string[]) => void;
}) {
  const [activeInstruction, setActiveInstruction] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Anleitung"}</Text>

      <View style={styles.intructionsContainer}>
        {props.instructions.map((instruction: string, index: number) => {
          return (
            <View style={styles.instruction} key={index + 1}>
              <Text style={styles.counter}>{index + 1 + "."}</Text>
              <Text style={styles.text}>{instruction}</Text>
            </View>
          );
        })}
        <View style={styles.instruction}>
          <Text style={styles.counter}>
            {props.instructions.length + 1 + "."}
          </Text>
          <TextInput
            style={styles.text}
            value={activeInstruction}
            placeholder="Anweisung"
            placeholderTextColor={"rgba(100, 100, 100, 0.5)"}
            onChangeText={(text: string) => setActiveInstruction(text)}
            onSubmitEditing={() => {
              props.setInstructions([...props.instructions, activeInstruction]);
              setActiveInstruction("");
            }}
            onKeyPress={({ nativeEvent }) => {
              if (
                nativeEvent.key === "Backspace" &&
                activeInstruction.length === 0
              ) {
                setActiveInstruction(
                  props.instructions[props.instructions.length - 1]
                );
                props.setInstructions(props.instructions.slice(0, -1));
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 16,
  },
  titleButton: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    color: "rgb(255,255,255)",
  },
  arrow: {
    width: 26,
    height: 26,
    margin: 4,
  },
  intructionsContainer: {
    marginTop: 16,
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
    flexWrap: "wrap",
    width: "90%",
    color: "rgb(255,255,255)",
    fontSize: 14,
  },
});
