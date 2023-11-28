import { Asset } from "expo-asset";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";

export const ImageLib = {
  Default: isAndroid
    ? Asset.fromModule(require("../assets/images/default.png"))
    : require("../assets/images/default.png"),
  Shakshuka: isAndroid
    ? Asset.fromModule(
        require("../assets/images/778577_shakshukalikeonafoodblog_xl-1024-v1-0.png")
      )
    : require("../assets/images/778577_shakshukalikeonafoodblog_xl-1024-v1-0.png"),
  ButterChicken: isAndroid
    ? Asset.fromModule(
        require("../assets/images/773103_butterchickenlikeonafoodblog_xl-1024-v1-0.png")
      )
    : require("../assets/images/773103_butterchickenlikeonafoodblog_xl-1024-v1-0.png"),
  PizzaSoup: isAndroid
    ? Asset.fromModule(
        require("../assets/images/456578_pizzasouplikeonafoodblog_xl-1024-v1-0.png")
      )
    : require("../assets/images/456578_pizzasouplikeonafoodblog_xl-1024-v1-0.png"),
  FetaPasta: isAndroid
    ? Asset.fromModule(
        require("../assets/images/672126_FetaPastaintheovenwithgarlicandcherrytoma_xl-1024-v1-0.png")
      )
    : require("../assets/images/672126_FetaPastaintheovenwithgarlicandcherrytoma_xl-1024-v1-0.png"),
  FischBurger: isAndroid
    ? Asset.fromModule(
        require("../assets/images/581956_fishstickburgerlikeonafoodblog_xl-1024-v1-0.png")
      )
    : require("../assets/images/581956_fishstickburgerlikeonafoodblog_xl-1024-v1-0.png"),
  AcaiBowl: isAndroid
    ? Asset.fromModule(
        require("../assets/images/918821_AcaiBowllikeonafoodblog_xl-1024-v1-0.png")
      )
    : require("../assets/images/918821_AcaiBowllikeonafoodblog_xl-1024-v1-0.png"),
  Burritos: isAndroid
    ? Asset.fromModule(
        require("../assets/images/189237_burritoslikeonafoodblog_xl-1024-v1-0.png")
      )
    : require("../assets/images/189237_burritoslikeonafoodblog_xl-1024-v1-0.png"),
  Nudelsalat: isAndroid
    ? Asset.fromModule(
        require("../assets/images/828038_germanpastasaladwithfleischwurstpicklesand_xl-1024-v1-0.png")
      )
    : require("../assets/images/828038_germanpastasaladwithfleischwurstpicklesand_xl-1024-v1-0.png"),
  PizzaAuflauf: isAndroid
    ? Asset.fromModule(
        require("../assets/images/200723_pastacasserolewithpaprikazucchiniandeggplan_xl-1024-v1-0.png")
      )
    : require("../assets/images/200723_pastacasserolewithpaprikazucchiniandeggplan_xl-1024-v1-0.png"),
  ThaiCurry: isAndroid
    ? Asset.fromModule(
        require("../assets/images/397431_ThaiCurrylikeonafoodblog_xl-1024-v1-0.png")
      )
    : require("../assets/images/397431_ThaiCurrylikeonafoodblog_xl-1024-v1-0.png"),
  MangoChicken: isAndroid
    ? Asset.fromModule(
        require("../assets/images/756099_brazilianmangochickenlikeonafoodblog_xl-1024-v1-0.png")
      )
    : require("../assets/images/756099_brazilianmangochickenlikeonafoodblog_xl-1024-v1-0.png"),
  PadThai: isAndroid
    ? Asset.fromModule(
        require("../assets/images/98580_padthailikeonafoodblog_xl-1024-v1-0.png")
      )
    : require("../assets/images/98580_padthailikeonafoodblog_xl-1024-v1-0.png"),
  PumpkinSoup: isAndroid
    ? Asset.fromModule(
        require("../assets/images/350399_pumpkinsouplikeonafoodblog_xl-1024-v1-0.png")
      )
    : require("../assets/images/350399_pumpkinsouplikeonafoodblog_xl-1024-v1-0.png"),
  Quiche: isAndroid
    ? Asset.fromModule(
        require("../assets/images/155958_vegetablequichelikeonafoodblog_xl-1024-v1-0.png")
      )
    : require("../assets/images/155958_vegetablequichelikeonafoodblog_xl-1024-v1-0.png"),
} as { [key: string]: any };
