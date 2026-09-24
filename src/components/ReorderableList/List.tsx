import { JSX, PropsWithChildren, useContext } from "react";
import ListItem, { ListItemWrapper } from "./ListItem";
import { StyleSheet, View } from "react-native";
import { ListContext } from "./ListContext";
import Animated from "react-native-reanimated";

interface ListType {
  (props: PropsWithChildren): JSX.Element | null;
  Item: typeof ListItem;
}

const List: ListType = ({ children }) => {
  const { itemIds, items } = useContext(ListContext);

  return (
    <View style={styles.listContainer}>
      {children}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        {itemIds.map((id) => (
          <ListItemWrapper key={id} itemId={id}>
            {items.get(id)?.element}
          </ListItemWrapper>
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
