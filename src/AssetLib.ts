import { Asset } from "expo-asset";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";

export const AssetLib = {
  Cross: isAndroid
    ? Asset.fromModule(require("../assets/icons/cross.png"))
    : require("../assets/icons/cross.png"),
  Check: isAndroid
    ? Asset.fromModule(require("../assets/icons/check.png"))
    : require("../assets/icons/check.png"),
  Unchecked: isAndroid
    ? Asset.fromModule(require("../assets/icons/unchecked.png"))
    : require("../assets/icons/unchecked.png"),
  Edit: isAndroid
    ? Asset.fromModule(require("../assets/icons/edit.png"))
    : require("../assets/icons/edit.png"),
  ArrowUp: isAndroid
    ? Asset.fromModule(require("../assets/icons/up-arrow.png"))
    : require("../assets/icons/up-arrow.png"),
  Trash: isAndroid
    ? Asset.fromModule(require("../assets/icons/trash.png"))
    : require("../assets/icons/trash.png"),
  Camera: isAndroid
    ? Asset.fromModule(require("../assets/icons/camera.png"))
    : require("../assets/icons/camera.png"),
};
