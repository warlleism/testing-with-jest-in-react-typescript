import { useContext } from "react";
import { ShoppingCartContext } from "../context/CartProvider";

const ShoppingCart = () => {

  const shoppingCartContext = useContext(ShoppingCartContext);

  if (!shoppingCartContext) {
    return null;
  }

  const { items } = shoppingCartContext;

  return (
    <div>
      {
        items.map((item: any) => (
          <div key={item.id}>
            {item.name} - {item.price}
          </div>
        ))
      }
    </div>
  );
};

export default ShoppingCart;
