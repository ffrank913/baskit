import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { ImageLib } from "../../ImageLib";

export default function RecipeButton(props: {
  title: string;
  image: string;
  onPress: () => void;
  description?: string;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => props.onPress()}>
        <Image style={styles.image} source={ImageLib[props.image]} />
        <View style={styles.textBackground}>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 200,
    overflow: "hidden",
  },
  textBackground: {
    width: "100%",
    height: 32,

    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  text: {
    top: 6,
    left: 16,
    fontSize: 16,

    color: "rgba(255, 255, 255, 0.8)"
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    transform: [{ translateY: -100 }],
  },
  button: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
});
