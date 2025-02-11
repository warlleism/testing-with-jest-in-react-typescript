import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../home";
import Login from "../login";
import ShoppingCart from "../cart/ShoppingCart";
import ListProducts from "../listProducts";
import ShoppingCartProvider from "../context/CartProvider";

const RoutesConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={
                    <ShoppingCartProvider>
                        <ShoppingCart />
                    </ShoppingCartProvider>
                } />
                <Route path="/products" element={
                    <ShoppingCartProvider>
                        <ListProducts />
                    </ShoppingCartProvider>
                } />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesConfig;