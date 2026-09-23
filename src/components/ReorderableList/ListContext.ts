import { createContext, JSX } from "react";

type ListContextType = {
  items: Map<string, JSX.Element>;
  itemIds: string[];
  registerItem: (id: string, item: JSX.Element) => void;
  unregisterItem: (id: string) => void;
};

const ListContext = createContext<ListContextType>({
  itemIds: [],
  items: new Map<string, JSX.Element>(),
  registerItem: () => {},
  unregisterItem: () => {},
});

export { type ListContextType, ListContext };
