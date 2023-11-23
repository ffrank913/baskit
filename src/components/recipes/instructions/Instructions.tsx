import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Image,
} from "react-native";
import { Text } from "react-native-paper";
import { AssetLib } from "../../../AssetLib";

const anim = ({ rotation }) =>
  Animated.parallel([
    Animated.timing(rotation, {
      useNativeDriver: false,
      toValue: 180,
      easing: Easing.ease,
      duration: 200,
    }),
  ]);

export default function Instructions(props: { instructions: string[] }) {
  const rotationAnim = useRef(new Animated.Value(0)).current;

  const [instructionsVisible, setInstructionsVisible] =
    useState<boolean>(false);

  useEffect(() => {
    let to = instructionsVisible ? 180 : 0;
    Animated.timing(rotationAnim, {
      toValue: to,
      easing: Easing.linear,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [instructionsVisible]);

  const rotation = rotationAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.titleButton}
        onPress={() => setInstructionsVisible(!instructionsVisible)}
      >
        <Text style={styles.title}>{"Anleitung"}</Text>
        <Animated.Image
          style={[styles.arrow, { transform: [{rotateX: rotation}] }]}
          source={AssetLib.ArrowUp}
        ></Animated.Image>
      </TouchableOpacity>
      {instructionsVisible && (
        <View style={styles.intructionsContainer}>
          {props.instructions.map((instruction: string, index: number) => {
            return (
              <View style={styles.instruction} key={index + 1}>
                <Text style={styles.counter}>{index + 1 + "."}</Text>
                <Text style={styles.text}>{instruction}</Text>
              </View>
            );
          })}
        </View>
      )}
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
    width: "90%",
    color: "rgb(255,255,255)",
    fontSize: 14,
  },
});
