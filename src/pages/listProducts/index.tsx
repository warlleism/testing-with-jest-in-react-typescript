import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context/CartProvider";


export default function ListProducts() {

    const navigate = useNavigate();
    const shoppingCartContext = useContext(ShoppingCartContext);

    if (!shoppingCartContext) {
        return null;
    }

    const { addItem } = shoppingCartContext;

    const [products] = useState([
        { id: 1, name: "Product 1", price: 10.99 },
        { id: 2, name: "Product 2", price: 9.99 },
        { id: 3, name: "Product 3", price: 7.99 },
    ]);

    const handleClick = (product: any) => {
        const newItem = { ...product, quantity: 1 };
        addItem(newItem);
        setTimeout(() => {
            navigate("/cart");
        }, 1000)
    };

    return (
        <div>
            <div>teste</div>
            <ul data-testid="teste-list">
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.price}
                        <button data-testid={`add-to-cart-${product.id}`} onClick={() => handleClick(product)}>Add to cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
