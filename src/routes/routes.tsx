import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import ShoppingCartProvider from "../context/CartProvider";
import ShoppingCart from "../pages/cart/ShoppingCart";
import ListProducts from "../pages/listProducts";

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