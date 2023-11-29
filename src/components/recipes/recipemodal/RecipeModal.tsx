import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native-virtualized-view";
import { ImageLib } from "../../../ImageLib";
import { AssetLib } from "../../../AssetLib";
import RecipeIngredientsList from "../recipeIngredients/RecipeIngredientsList";
import Instructions from "../instructions/Instructions";
import AddToBasket from "../addtobasket/AddToBasket";
import { IBaskitRecipe } from "../../../types";
import { useBasketItemContext } from "../../../context/basketItems/BasketItemsContextProvider";
import useDBRemove from "../../../context/database/hooks/useDBRemove";
import { BlurView } from "expo-blur";

export default function RecipeModal(props: {
  data: IBaskitRecipe;
  onClose: (changed: boolean) => void;
}) {
  const { addRecipeToBasket } = useBasketItemContext();
  
  const removeRecipe = useDBRemove('recipes');
  const removeRecipeFromDB = async () => {
    await removeRecipe({ field: "id", conditional: "=", value: props.data.id });
  }
  
  return (
    <View style={{flex: 1, position: "absolute", width: "100%", height: "100%"}}>
      <BlurView style={styles.container} intensity={10}>
        <ScrollView style={styles.content}>
          <View style={{
              height: 44,
              flexDirection: "row-reverse"
            }}>
            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                marginLeft: 16,
                zIndex: 1,
              }}
              onPress={() => {
                props.onClose(false);
              }}
            >
              <Image
                style={{ left: "12%", top: "12%", width: "75%", height: "75%" }}
                source={AssetLib.Cross}
              ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 48,
              height: 48,
              marginLeft: 16,
              zIndex: 1,
            }}
            onPress={() => {
              console.log("Edit here!");
            }}
          >
            <Image
              style={{ left: "12%", top: "12%", width: "75%", height: "75%" }}
              source={AssetLib.Edit}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 48,
              height: 48,
              marginLeft: 16,
              zIndex: 1,
            }}
            onPress={async () => {
              await removeRecipeFromDB();
              props.onClose(true);
            }}
          >
            <Image
              style={{ left: "12%", top: "12%", width: "75%", height: "75%" }}
              source={AssetLib.Trash}
            ></Image>
          </TouchableOpacity>
          </View>
          <Text style={styles.title}>{props.data.title}</Text>
          <Image style={styles.image} source={ImageLib[props.data.image]} />
          <Text style={styles.description}>{"Beschreibung: " + props.data.description}</Text>
          <Text style={styles.ingredientsTitle}>{"Zutaten"}</Text>
          <RecipeIngredientsList ingredients={props.data.ingredients}/>
          <AddToBasket onAdd={() => {
            addRecipeToBasket(props.data);
          }}/>
          <Instructions instructions={props.data.instructions}/>
        </ScrollView>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "96%",
    height: "96%",
    top: "2%",
    left: "2%",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderRadius: 8,
    overflow: "hidden",
  },
  content: {
    flex: 1,
  },
  title: {
    paddingBottom: 16,

    color: "rgb(255,255,255)",

    fontSize: 48,
  },
  description: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 12,
    color: "rgb(180,180,180)",
  },
  ingredientsTitle: {
    fontSize: 28,
    color: "rgb(255,255,255)",
  },
  
  instructions: {
    margin: 6,
    color: "rgb(255,255,255)",
    fontSize: 18,
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    borderRadius: 8,
  },
  button: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
});
