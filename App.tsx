import List from "@components/ReorderableList/List";
import ListContextProvider from "@components/ReorderableList/ListContextProvider";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <ListContextProvider>
        <SafeAreaView style={styles.container}>
          <List>
            <List.Item>
              <Text>I am a child</Text>
            </List.Item>
            <List.Item>
              <Text>I am another child</Text>
            </List.Item>
          </List>
        </SafeAreaView>
      </ListContextProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
