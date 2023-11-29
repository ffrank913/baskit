import { Asset } from "expo-asset";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";

export const ImageLib = {
  Default: isAndroid
    ? Asset.fromModule(require("../assets/images/default.png"))
    : require("../assets/images/default.png"),
} as { [key: string]: any };
