import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function RecipeFormDescription(props: {
  description: string;
  setDescription: (description: string) => void;
}) {
  const [internalDescription, setInternalDescription] = useState<string>(
    props.description
  );

  const submit = () => {
    props.setDescription(internalDescription);
  };

  return (
    <TextInput
      style={styles.description}
      value={internalDescription}
      placeholder="Beschreibung"
      placeholderTextColor={"rgba(100, 100, 100, 0.5)"}
      onChangeText={setInternalDescription}
      onBlur={submit}
      onSubmitEditing={submit}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 16,
  },
  description: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 12,
    color: "rgb(180,180,180)",
  },
});
