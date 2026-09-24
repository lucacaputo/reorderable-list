import List from "@components/ReorderableList/List";
import ListContextProvider from "@components/ReorderableList/ListContextProvider";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <ListContextProvider>
          <SafeAreaView style={styles.container}>
            <List>
              <List.Item>
                <View style={styles.itemContainer}>
                  <Text>I am a child</Text>
                </View>
              </List.Item>
              <List.Item>
                <View style={styles.itemContainer}>
                  <Text>I am another child</Text>
                  <Text>I am another child</Text>
                  <Text>I am another child</Text>
                </View>
              </List.Item>
              <List.Item>
                <View style={styles.itemContainer}>
                  <Text>I am another child</Text>
                  <Text>I am another child</Text>
                </View>
              </List.Item>
              <List.Item>
                <View style={styles.itemContainer}>
                  <Text>I am another child</Text>
                </View>
              </List.Item>
            </List>
          </SafeAreaView>
        </ListContextProvider>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    padding: 16,
    borderWidth: 2,
    borderColor: "teal",
    justifyContent: "center",
    alignItems: "center",
  },
});
