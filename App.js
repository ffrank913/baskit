import { SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BasketItemContextProvider } from "./src/context";
import Router from "./src/router/Router";

export default function App() {
  // // TEST CODE HERE
  // useEffect(() => {
  //   addRecipe(RecipesLib['shakshuka']);
  // }, [])

  return (
    <BasketItemContextProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Router />
        </SafeAreaView>
      </SafeAreaProvider>
    </BasketItemContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
  },
});
