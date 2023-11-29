import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from 'expo-font';
import {
  Router,
  Database,
  DBContextProvider,
  SCHEMA_ITEMS,
  SCHEMA_RECIPES,
} from "./src";
import { BasketItemContextProvider } from "./src/context/basketItems/BasketItemsContextProvider";

const db = new Database("baskitDB", "1.0");

export default function App() {
  let [fontsLoaded] = useFonts({
    // "SF-Compact-Rounded-Medium": require("./assets/fonts/SF-Compact-Rounded-Medium.otf"),
    "SF-Compact-Rounded-Semibold": require("./assets/fonts/SF-Compact-Rounded-Semibold.otf"),
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await SplashScreen.preventAutoHideAsync();

      await db.InitDB();

      await db
        .createTables([SCHEMA_RECIPES, SCHEMA_ITEMS])
        .catch((e) => console.error(e));

      db.OnReady();

      setReady(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (ready && fontsLoaded) {
      SplashScreen.hideAsync();
      // db.executeQuery('drop table recipes')
      // db.executeQuery('drop table items')
    }
  }, [ready, fontsLoaded]);

  if (!ready || !fontsLoaded) {
    return <></>;
  }

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
});
