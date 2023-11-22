import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import BasketList from "../../components/basket/BasketList";

export default function Basket() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Basket</Text>
      </View>
        <BasketList></BasketList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    padding: 16,
    backgroundColor: "rgba(80, 80, 80, 1.0)",
  },
  title: {
    color: "white",
    fontSize: 36,
  },
});
