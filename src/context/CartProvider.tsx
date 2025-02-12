import { createContext, useState } from "react";

type ShoppingCartContextType = {
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  addItem: (item: any) => void;
  removeItem: (item: any) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
};

export const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

export default function ShoppingCartProvider({ children }: { children: React.ReactNode }) {

  const [items, setItems] = useState<any[]>([]);

  const addItem = (item: any) => {
    setItems([...items, item]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const incrementQuantity = (id: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
    setItems(newItems);
  }

  const decrementQuantity = (id: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
    setItems(newItems);
  }


  return (
    <ShoppingCartContext.Provider value={{ items, setItems, addItem, removeItem, incrementQuantity, decrementQuantity }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}