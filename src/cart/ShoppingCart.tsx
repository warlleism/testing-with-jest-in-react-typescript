import { useContext } from "react";
import { ShoppingCartContext } from "../context/CartProvider";

export default function ShoppingCart() {

  const shoppingCartContext = useContext(ShoppingCartContext);

  if (!shoppingCartContext) {
    return null;
  }

  const { items, incrementQuantity, decrementQuantity } = shoppingCartContext;

  return (
    <div>
      {
        items.map((item: any) => (
          <div key={item.id}>
            <div>
              {item.name} - {item.price}
            </div>
            <div onClick={() => incrementQuantity(item.id)}>increment</div>
            <div onClick={() => decrementQuantity(item.id)}>decrement</div>
          </div>
        ))
      }
    </div>
  );
};
