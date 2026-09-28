import { FlashListRef } from "@shopify/flash-list";
import { createContext, JSX } from "react";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/v3/types";
import Animated, { AnimatedRef, makeMutable } from "react-native-reanimated";

type ListContextType = {
  items: Map<string, { element: JSX.Element; ref: AnimatedRef<Animated.View> }>;
  itemIds: string[];
  registerItem: (
    id: string,
    item: JSX.Element,
    ref: AnimatedRef<Animated.View>,
  ) => void;
  unregisterItem: (id: string) => void;
  itemOrder: SharedValue<string[]>;
  itemHeights: SharedValue<Record<string, number>>;
  draggingId: SharedValue<string | null>;
  flashListRef: AnimatedRef<FlashListRef<string>> | null;
  scrollViewHeight: number;
  setScrollViewHeight: (h: number) => void;
  scrollState: SharedValue<number>;
};

const ListContext = createContext<ListContextType>({
  itemIds: [],
  items: new Map(),
  registerItem: () => {},
  unregisterItem: () => {},
  itemOrder: makeMutable([] as string[]),
  itemHeights: makeMutable({} as Record<string, number>),
  draggingId: makeMutable(null as string | null),
  scrollViewHeight: 0,
  flashListRef: null,
  setScrollViewHeight: () => {},
  scrollState: makeMutable(0),
});

export { type ListContextType, ListContext };
