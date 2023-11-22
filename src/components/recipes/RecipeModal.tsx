import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { List, Text } from "react-native-paper";
import { ScrollView } from "react-native-virtualized-view";
import { ImageLib } from "../../ImageLib";
import { IRecipe } from "../../RecipesLib";
import { AssetLib } from "../../AssetLib";
import IngredientsList from "./ingredients/IngredientsList";
import Instructions from "./instructions/Instructions";

export default function RecipeModal(props: {
  data: IRecipe;
  onClose: () => void;
}) {
  return (
    <View style={{flex: 1, position: "absolute", width: "100%", height: "100%"}}>
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={{
              height: 44,
              right: 0,
            }}>
          <TouchableOpacity
            style={{
              position: "absolute",
              width: 44,
              height: 44,
              right: 0,
              zIndex: 1,
            }}
            onPress={() => {
              props.onClose();
            }}
          >
            <Image
              style={{ left: "12%", top: "12%", width: "75%", height: "75%" }}
              source={AssetLib.Cross}
            ></Image>
          </TouchableOpacity>
          </View>
          <Text style={styles.title}>{props.data.title}</Text>
          <Image style={styles.image} source={ImageLib[props.data.image]} />
          <Text style={styles.description}>{"Beschreibung: " + props.data.description}</Text>
          <Text style={styles.ingredientsTitle}>{"Zutaten"}</Text>
          <IngredientsList ingredients={props.data.ingredients}></IngredientsList>
          <Text style={styles.ingredientsTitle}>{"Anleitung"}</Text>
          <Instructions instructions={props.data.instructions}/>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "98%",
    height: "98%",
    top: "1%",
    left: "1%",
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
  instructionsTitle: {
    marginTop: 16,
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
