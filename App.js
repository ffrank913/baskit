import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BasketItemContext } from './src/context';
import Router from './src/router/Router';

export default function App() {
  const [basketItems, setBasketItems] = useState([]);

  const addBasketItem = (recipe) => {
    setBasketItems(basketItems.concat(recipe));
  };

  return (
    <BasketItemContext.Provider value={{basketItems, addBasketItem}}>
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