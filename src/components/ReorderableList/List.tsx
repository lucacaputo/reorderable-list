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
  return (
    <View style={styles.listContainer}>
      {children}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        {ctx.itemIds.map((id) => (
          <ListItemWrapper key={id}>{ctx.items.get(id)}</ListItemWrapper>
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
