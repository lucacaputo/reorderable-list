import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ListContext, ListContextType } from "./ListContext";
import { useAnimatedRef, useSharedValue } from "react-native-reanimated";
import { FlashListRef } from "@shopify/flash-list";

const ListContextProvider = ({ children }: PropsWithChildren) => {
  const [itemIds, setItemIds] = useState<string[]>([]);
  const [items, setItems] = useState<ListContextType["items"]>(new Map());
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const registerItem = useCallback<ListContextType["registerItem"]>(
    (id, element, ref) => {
      setItemIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setItems((prev) => {
        if (prev.has(id)) {
          return prev;
        }
        const map = new Map(prev);
        map.set(id, { element, ref });
        return map;
      });
    },
    [],
  );

  const unregisterItem = useCallback((id: string) => {
    setItemIds((prev) => prev.filter((itemId) => itemId !== id));
    setItems((prev) => {
      const map = new Map(prev);
      map.delete(id);
      return map;
    });
  }, []);

  const itemOrder = useSharedValue<string[]>([]);
  const flashListRef = useAnimatedRef<FlashListRef<string>>();
  const itemHeights = useSharedValue<Record<string, number>>({});
  const scrollState = useSharedValue(0);
  const draggingId = useSharedValue<string | null>(null);

  useEffect(() => {
    itemOrder.set(itemIds);
  }, [itemIds, itemOrder]);

  const value = useMemo(
    () => ({
      itemIds,
      items,
      registerItem,
      unregisterItem,
      itemOrder,
      itemHeights,
      draggingId,
      flashListRef,
      scrollViewHeight,
      setScrollViewHeight,
      scrollState,
    }),
    [
      itemIds,
      items,
      registerItem,
      unregisterItem,
      itemOrder,
      itemHeights,
      draggingId,
      flashListRef,
      scrollViewHeight,
      scrollState,
    ],
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListContextProvider;
