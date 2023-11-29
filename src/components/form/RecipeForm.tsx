import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native-virtualized-view";
import { ImageLib } from "../../ImageLib";
import { AssetLib } from "../../AssetLib";
import { useState } from "react";
import RecipeFormIngredientsList from "./RecipeFormIngredientsList";
import RecipeFormInstructions from "./RecipeFormInstructions";
import AddRecipe from "./AddRecipe";
import { IIngredient } from "../../types";
import RecipeFormTitle from "./RecipeFormTitle";
import RecipeFormDescription from "./RecipeFormDescription";
import useDBInsert from "../../context/database/hooks/useDBInsert";
import { ToDBRecipe } from "../../helper/ToDBRecipe";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";

export default function RecipeForm(props: {
  onClose: (changed: boolean) => void;
}) {
  const insertRecipe = useDBInsert("recipes");

  const [titleValue, setTitleValue] = useState<string>("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [instructions, setInstructions] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);

  const addRecipeToDB = async () => {
    const dbRecipe = ToDBRecipe({
      title: titleValue,
      image: imageUri || "Default",
      ingredients: ingredients,
      description: descriptionValue,
      instructions: instructions,
    });
    await insertRecipe(Object.keys(dbRecipe), Object.values(dbRecipe));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
    >
      <BlurView style={styles.container} intensity={10}>
        <ScrollView style={styles.content}>
          <View
            style={{
              height: 44,
              flexDirection: "row-reverse",
            }}
          >
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
                style={{
                  left: "12%",
                  top: "12%",
                  width: "75%",
                  height: "75%",
                }}
                source={AssetLib.Cross}
              ></Image>
            </TouchableOpacity>
          </View>
          <RecipeFormTitle
            title={titleValue}
            setTitle={setTitleValue}
          ></RecipeFormTitle>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={imageUri ? { uri: imageUri } : ImageLib["Default"]} />
            {imageUri ? (
              <TouchableHighlight
              style={styles.imageDeleteButton}
              underlayColor={"rgba(0, 0, 0, 0.4)"}
              onPress={() => {
                setImageUri(null);
              }}
            >
              <Image style={styles.imageDeleteIcon} source={AssetLib.Cross} />
            </TouchableHighlight>
            ) : (
              <TouchableHighlight
              style={styles.camButton}
              underlayColor={"rgba(0, 0, 0, 0.4)"}
              onPress={() => {
                pickImage();
              }}
            >
              <Image style={styles.camIcon} source={AssetLib.Camera} />
            </TouchableHighlight>
          )}
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.description}>{"Beschreibung: "}</Text>
            <RecipeFormDescription
              description={descriptionValue}
              setDescription={setDescriptionValue}
            ></RecipeFormDescription>
          </View>
          <Text style={styles.ingredientsTitle}>{"Zutaten"}</Text>
          <RecipeFormIngredientsList
            editable={true}
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <RecipeFormInstructions
            instructions={instructions}
            setInstructions={setInstructions}
          ></RecipeFormInstructions>
          <AddRecipe
            onCancel={() => {
              props.onClose(false);
            }}
            onConfirm={async () => {
              await addRecipeToDB();
              props.onClose(true);
            }}
          ></AddRecipe>
        </ScrollView>
      </BlurView>
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

  instructions: {
    margin: 6,
    color: "rgb(255,255,255)",
    fontSize: 18,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    borderRadius: 8,
  },
  camButton: {
    position: "absolute",
    margin: 32,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  camIcon: {
    width: "80%",
    height: "auto",
    aspectRatio: 1,
  },
  imageDeleteButton: {
    position: "absolute",
    padding: 12,
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  imageDeleteIcon: {
    width: 24,
    height: "auto",
    aspectRatio: 1,
  },
  button: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
});
