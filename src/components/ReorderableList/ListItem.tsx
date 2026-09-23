import {
  PropsWithChildren,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { ListContext } from "./ListContext";
import { View } from "react-native";

const ListItem = ({ children }: PropsWithChildren) => {
  const id = useId();
  const ctx = useContext(ListContext);

  useEffect(() => {
    const { registerItem, unregisterItem } = ctx;
    registerItem(id, <>{children}</>);
    return () => unregisterItem(id);
  }, []);

  return null;
};

const ListItemWrapper = ({ children }: PropsWithChildren) => {
  const [itemHeight, setItemHeight] = useState(0);
  return (
    <View
      onLayout={(event) => {
        event.target.measure((_x, _y, _w, height) => setItemHeight(height));
      }}
    >
      {children}
    </View>
  );
};

export { ListItemWrapper };
export default ListItem;
