import { ComponentProps, JSX, PropsWithChildren, useContext } from "react";
import ListItem, { ListItemWrapper } from "./ListItem";
import { StyleSheet, View } from "react-native";
import { ListContext } from "./ListContext";
import Animated, {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import ListContextProvider from "./ListContextProvider";

interface ListType {
  (props: PropsWithChildren): JSX.Element | null;
  Item: typeof ListItem;
}

const AnimatedFlashList =
  Animated.createAnimatedComponent<typeof FlashList<string>>(FlashList);

const Cell = ({
  index,
  style,
  ...props
}: ComponentProps<typeof Animated.View> & { index: number }) => {
  const { itemIds, draggingId } = useContext(ListContext);
  const itemId = itemIds[index];
  const rStyle = useAnimatedStyle(() => {
    const isDragging = draggingId.get() === itemId;
    return {
      zIndex: isDragging ? 1 : 0,
      elevation: isDragging ? 1 : 0,
    };
  });

  return <Animated.View {...props} style={[style, rStyle]} />;
};

const ListComponent = ({ children }: PropsWithChildren): JSX.Element => {
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
        CellRendererComponent={Cell}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});

const List: ListType = ({ children }) => {
  return (
    <ListContextProvider>
      <ListComponent>{children}</ListComponent>
    </ListContextProvider>
  );
};

List.Item = ListItem;
export default List;
