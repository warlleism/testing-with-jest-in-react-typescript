import { createContext, useState } from "react";

type ShoppingCartContextType = {
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  addItem: (item: any) => void;
  removeItem: (item: any) => void;
};

export const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

export default function ShoppingCartProvider({ children }: { children: React.ReactNode }) {

  const [items, setItems] = useState<any[]>([]);

  const addItem = (item: any) => {
    setItems([...items, item]);
  };

  const removeItem = (item: any) => {
    setItems(items.filter((i) => i !== item));
  };

  return (
    <ShoppingCartContext.Provider value={{ items, setItems, addItem, removeItem }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}