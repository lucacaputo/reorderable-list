import { JSX, PropsWithChildren, useContext } from "react";
import ListItem, { ListItemWrapper } from "./ListItem";
import { StyleSheet, View } from "react-native";
import { ListContext } from "./ListContext";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

interface ListType {
  (props: PropsWithChildren): JSX.Element | null;
  Item: typeof ListItem;
}

const List: ListType = ({ children }) => {
  const {
    itemIds,
    items,
    setScrollViewHeight,
    scrollViewRef,
    scrollState,
    itemHeights,
  } = useContext(ListContext);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollState.set(y);
    },
  });

  const listHeight = useDerivedValue(() =>
    Object.values(itemHeights.get()).reduce((acc, curr) => acc + curr, 0),
  );

  const rScrollStyle = useAnimatedStyle(() => ({
    height: listHeight.get(),
  }));

  return (
    <View
      style={styles.listContainer}
      onLayout={(event) =>
        event.target.measure((_x, _y, _w, height) => {
          setScrollViewHeight(height);
        })
      }
    >
      {children}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
        ref={scrollViewRef}
        onScroll={onScroll}
      >
        <Animated.View style={rScrollStyle}>
          {itemIds.map((id) => (
            <ListItemWrapper key={id} itemId={id}>
              {items.get(id)?.element}
            </ListItemWrapper>
          ))}
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContentContainer: { flexGrow: 1 },
  listContainer: {
    flex: 1,
  },
});

List.Item = ListItem;
export default List;
