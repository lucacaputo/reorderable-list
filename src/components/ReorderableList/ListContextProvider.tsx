import { JSX, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { ListContext } from "./ListContext";

const ListContextProvider = ({ children }: PropsWithChildren) => {
  const [itemIds, setItemIds] = useState<string[]>([]);
  const [items, setItems] = useState(new Map<string, JSX.Element>());
  const registerItem = useCallback((id: string, element: JSX.Element) => {
    setItemIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setItems((prev) => {
      if (prev.has(id)) {
        return prev;
      }
      const map = new Map(prev);
      map.set(id, element);
      return map;
    });
  }, []);

  const unregisterItem = useCallback((id: string) => {
    setItemIds((prev) => prev.filter((itemId) => itemId !== id));
    setItems((prev) => {
      const map = new Map(prev);
      map.delete(id);
      return map;
    });
  }, []);

  const value = useMemo(
    () => ({
      itemIds,
      items,
      registerItem,
      unregisterItem,
    }),
    [itemIds, items, registerItem, unregisterItem],
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListContextProvider;
