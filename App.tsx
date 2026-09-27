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
        <View style={{ height: 500 }}>
          <ListContextProvider>
            <SafeAreaView style={styles.container}>
              <List>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am a child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
                <List.Item>
                  <View style={styles.itemContainer}>
                    <View style={styles.innerItem}>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                      <Text>I am another child</Text>
                    </View>
                  </View>
                </List.Item>
              </List>
            </SafeAreaView>
          </ListContextProvider>
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  innerItem: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
