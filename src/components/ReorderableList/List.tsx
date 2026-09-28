import { JSX, PropsWithChildren, useContext } from "react";
import ListItem, { ListItemWrapper } from "./ListItem";
import { StyleSheet, View } from "react-native";
import { ListContext } from "./ListContext";
import Animated, {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useDerivedValue,
} from "react-native-reanimated";
import { FlashList, FlashListProps } from "@shopify/flash-list";

interface ListType {
  (props: PropsWithChildren): JSX.Element | null;
  Item: typeof ListItem;
}

const AnimatedFlashList =
  Animated.createAnimatedComponent<typeof FlashList<string>>(FlashList);

const List: ListType = ({ children }) => {
  const {
    itemIds,
    items,
    setScrollViewHeight,
    flashListRef,
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

  const animatedProps = useAnimatedProps<
    FlashListProps<(typeof itemIds)[number]>
  >(() => ({
    contentContainerStyle: {
      height: listHeight.get(),
    },
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
      <AnimatedFlashList
        ref={flashListRef}
        onScroll={onScroll}
        data={itemIds}
        keyExtractor={(id) => id}
        renderItem={({ item }) => (
          <ListItemWrapper itemId={item}>
            {items.get(item)?.element}
          </ListItemWrapper>
        )}
        animatedProps={animatedProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});

List.Item = ListItem;
export default List;
