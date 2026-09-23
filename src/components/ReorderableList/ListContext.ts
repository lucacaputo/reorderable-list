import { createContext, JSX } from "react";

type ListContextType = {
  items: Map<string, JSX.Element>;
  registerItem: (id: string, item: JSX.Element) => void;
  unregisterItem: (id: string) => void;
};

const ListContext = createContext<ListContextType | null>(null);

export { type ListContextType, ListContext };
