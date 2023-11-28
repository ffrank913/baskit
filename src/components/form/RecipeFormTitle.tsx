import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function RecipeFormTitle(props: {
  title: string;
  setTitle: (title: string) => void;
}) {
  const [internalTitle, setInternalTitle] = useState<string>(props.title);

  const submit = () => {
    props.setTitle(internalTitle);
  };

  return (
    <TextInput
      style={styles.title}
      value={internalTitle}
      placeholder="Titel"
      placeholderTextColor={"rgba(100, 100, 100, 0.5)"}
      onChangeText={setInternalTitle}
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
  title: {
    paddingBottom: 16,

    color: "rgb(255,255,255)",

    fontSize: 48,
  },
});
