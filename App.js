import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BasketItemContext } from './src/context/ContextProviders';
import Router from './src/router/Router';

export default function App() {
  const [basketItems, setBasketItems] = useState([]);

  return (
    <BasketItemContext.Provider value={{basketItems, setBasketItems}}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Router/>
        </SafeAreaView>
      </SafeAreaProvider>
    </BasketItemContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});