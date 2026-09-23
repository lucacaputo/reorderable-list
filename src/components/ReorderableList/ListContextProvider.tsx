import { JSX, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { ListContext } from "./ListContext";

const ListContextProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState(new Map<string, JSX.Element>());
  const registerItem = useCallback((id: string, element: JSX.Element) => {
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
    setItems((prev) => {
      const map = new Map(prev);
      map.delete(id);
      return map;
    });
  }, []);

  const value = useMemo(
    () => ({
      items,
      registerItem,
      unregisterItem,
    }),
    [items, registerItem, unregisterItem],
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListContextProvider;
