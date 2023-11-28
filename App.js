import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import {
  Router,
  Database,
  DBContextProvider,
  SCHEMA_INGREDIENTS,
  SCHEMA_RECIPES,
} from "./src";
import { BasketItemContextProvider } from "./src/context/basketItems/BasketItemsContextProvider";

const db = new Database("baskitDB", "1.0");

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await SplashScreen.preventAutoHideAsync();

      await db.InitDB();

      await db
        .createTables([SCHEMA_RECIPES, SCHEMA_INGREDIENTS])
        .catch((e) => console.error(e));

      setReady(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
      // db.executeQuery('drop table recipes')
    }
  }, [ready]);

  return (
    <DBContextProvider db={db}>
      <BasketItemContextProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <Router />
          </SafeAreaView>
        </SafeAreaProvider>
      </BasketItemContextProvider>
    </DBContextProvider>
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
