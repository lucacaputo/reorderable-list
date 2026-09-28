import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useId,
} from "react";
import { LayoutChangeEvent } from "react-native";
import { ListContext } from "./ListContext";
import Animated, {
  cancelAnimation,
  Easing,
  measure,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, usePanGesture } from "react-native-gesture-handler";
import { scheduleOnUI } from "react-native-worklets";

const ListItem = ({ children }: PropsWithChildren) => {
  const id = useId();
  const ctx = useContext(ListContext);
  const ref = useAnimatedRef<Animated.View>();

  useEffect(() => {
    const { registerItem, unregisterItem } = ctx;
    registerItem(id, <>{children}</>, ref);
    return () => unregisterItem(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

type ListItemWrapperProps = {
  itemId: string;
};

const ListItemWrapper = ({
  children,
  itemId,
}: PropsWithChildren<ListItemWrapperProps>) => {
  const {
    items,
    itemOrder,
    itemHeights,
    draggingId,
    scrollViewHeight,
    flashListRef,
    scrollState,
  } = useContext(ListContext);
  const currentTranslation = useSharedValue(0);
  const translation = useDerivedValue(() => {
    const heights = itemHeights.get();
    const order = itemOrder.get();
    const offset = order
      .slice(0, order.indexOf(itemId))
      .reduce((acc, id) => acc + (heights[id] ?? 0), 0);

    return draggingId.get() === itemId ? offset : withSpring(offset);
  });

  const itemRef = items.get(itemId)?.ref;
  const scaling = useSharedValue(1);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      scheduleOnUI(
        (id, h) => itemHeights.set((heights) => ({ ...heights, [id]: h })),
        itemId,
        height,
      );
    },
    [itemId, itemHeights],
  );
  const listPosition = useSharedValue(0);
  const initialScrollState = useSharedValue(0);
  const itemRelativePosition = useSharedValue(0);

  const panGesture = usePanGesture({
    activateAfterLongPress: 150,
    onBegin: () => {
      scaling.set(withTiming(0.92, { duration: 150, easing: Easing.bounce }));
    },
    onActivate: () => {
      if (!flashListRef) {
        return;
      }
      draggingId.set(itemId);
      const pos = measure(flashListRef)?.pageY ?? 0;
      listPosition.set(pos);
      initialScrollState.set(scrollState.get());
    },
    onUpdate: ({ changeY, absoluteY }) => {
      currentTranslation.set((prev) => prev + changeY);
      itemRelativePosition.set(absoluteY - listPosition.get());
    },
    onFinalize: () => {
      draggingId.set(null);
      cancelAnimation(scaling);
      scaling.set(withSpring(1));
      currentTranslation.set(withSpring(0));
    },
  });

  useAnimatedReaction(
    () => currentTranslation.get(),
    (curr) => {
      const heights = itemHeights.get();
      const order = itemOrder.get();
      const thisIndex = order.indexOf(itemId);
      const prevId = order[thisIndex - 1];
      const nextId = order[thisIndex + 1];
      const prevOffset =
        (prevId !== undefined ? (heights[prevId] ?? 0) : 0) / 2;
      const nextOffset =
        (nextId !== undefined ? (heights[nextId] ?? 0) : 0) / 2;

      if (nextId !== undefined && curr > nextOffset) {
        const swapped = order.slice();
        swapped[thisIndex] = order[thisIndex + 1];
        swapped[thisIndex + 1] = order[thisIndex];
        itemOrder.set(swapped);
        currentTranslation.set((prev) => prev - (heights[nextId] ?? 0));
      }
      if (prevId !== undefined && curr < -prevOffset) {
        const swapped = order.slice();
        swapped[thisIndex] = order[thisIndex - 1];
        swapped[thisIndex - 1] = order[thisIndex];
        itemOrder.set(swapped);
        currentTranslation.set((prev) => prev + (heights[prevId] ?? 0));
      }

      if (itemRelativePosition.get() >= scrollViewHeight - 50) {
        if (!flashListRef) {
          return;
        }
        scrollTo(flashListRef, 0, scrollState.get() + 100, true);
      }
    },
  );

  useAnimatedReaction(
    () => scrollState.get(),
    (curr) => {
      const delta = curr - initialScrollState.get();
      if (draggingId.get() === itemId) {
        currentTranslation.set((prev) => prev + delta);
        initialScrollState.set(curr);
      }
    },
  );

  const rContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translation.get() + currentTranslation.get(),
      },
      { scale: scaling.get() },
    ],
    position: "absolute",
    width: "100%",
    zIndex: draggingId.get() === itemId ? 10 : 1,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View ref={itemRef} onLayout={onLayout} style={rContainerStyle}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export { ListItemWrapper };
export default ListItem;
