import { JSX, PropsWithChildren, useContext, Children } from "react";
import ListItem, { ListItemWrapper } from "./ListItem";
import { StyleSheet, View } from "react-native";
import { ListContext } from "./ListContext";
import Animated from "react-native-reanimated";

interface ListType {
  (props: PropsWithChildren): JSX.Element | null;
  Item: typeof ListItem;
}

const List: ListType = ({ children }) => {
  const ctx = useContext(ListContext);

  if (!ctx) {
    return null;
  }
  return (
    <View style={styles.listContainer}>
      {children}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        {[...ctx.items].map(([id, item]) => (
          <ListItemWrapper key={id}>{item}</ListItemWrapper>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  listContainer: {
    flex: 1,
  },
});

List.Item = ListItem;
export default List;
